-- SYLearn Digital Skills Academy: initial Supabase PostgreSQL migration.
-- Prepared from the 11 curated YouTube courses and their chapter data in youtube.js.
-- IMPORTANT: This migration is COMMITTED TO GITHUB ONLY. It has NOT been
-- executed against any Supabase project. Connect and select the correct project
-- before running it. Never put the service_role/secret key in app frontend.
-- Applies Supabase Auth user ownership, explicit grants and Row Level Security.
-- Learner localStorage remains untouched until opt-in account-based synchronization.
-- The public course catalog credits original third-party video educators.
-- Supabase migration runner owns the transaction (no manual BEGIN/COMMIT).
-- Privileged helper routines live in a non-exposed private schema.

create schema if not exists sylearn_private;
revoke all on schema sylearn_private from public, anon, authenticated;
grant usage on schema sylearn_private to authenticated;

create table public.staff_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin','instructor')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- No client can grant itself a staff role: only trusted SQL/service-side actions.
create function sylearn_private.sylearn_is_staff()
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists(
    select 1 from public.staff_users
    where user_id = (select auth.uid()) and active
  );
$$;
revoke all on function sylearn_private.sylearn_is_staff() from public, anon, authenticated;
grant execute on function sylearn_private.sylearn_is_staff() to authenticated;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Learner' check (char_length(display_name) between 1 and 80),
  preferred_language text not null default 'English'
    check (preferred_language in ('English','Hausa')),
  avatar_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.courses (
  id text primary key check (id ~ '^[A-Za-z0-9_-]{3,64}$'),
  title text not null check (char_length(title) between 1 and 250),
  creator text not null check (char_length(creator) between 1 and 160),
  category text not null,
  level text not null default 'All levels',
  description text not null default '',
  hours_label text not null default 'Self-paced',
  thumbnail_url text,
  source_type text not null default 'youtube' check (source_type in ('youtube','original')),
  access_type text not null default 'free' check (access_type in ('free','paid')),
  price_ngn numeric(12,2) not null default 0 check (price_ngn >= 0),
  is_featured boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index sylearn_courses_category_idx on public.courses(category) where is_published;
create table public.course_chapters (
  course_id text not null references public.courses(id) on delete cascade,
  chapter_index integer not null check (chapter_index >= 0 and chapter_index < 10000),
  title text not null,
  start_seconds integer not null default 0 check (start_seconds >= 0),
  video_id text,
  primary key(course_id, chapter_index)
);

create table public.saved_courses (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null references public.courses(id) on delete cascade,
  saved_at timestamptz not null default now(),
  primary key(user_id, course_id)
);
create index sylearn_saved_courses_by_course_idx on public.saved_courses(course_id);

create table public.chapter_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  chapter_index integer not null,
  completed_at timestamptz not null default now(),
  source text not null default 'learner_marked' check (source in ('learner_marked','client_playback','legacy_local')),
  primary key(user_id,course_id,chapter_index),
  foreign key(course_id,chapter_index) references public.course_chapters(course_id,chapter_index) on delete cascade
);
create index sylearn_chapter_progress_course_idx on public.chapter_progress(course_id);

create table public.study_notes (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  chapter_index integer not null,
  body text not null default '' check (char_length(body)<=6000),
  updated_at timestamptz not null default now(),
  primary key(user_id,course_id,chapter_index),
  foreign key(course_id,chapter_index) references public.course_chapters(course_id,chapter_index) on delete cascade
);

-- These are SELF-REPORTED quiz results, NOT verified examinations.
-- No client may insert verified results; an official assessment needs a server.
create table public.assessment_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null references public.courses(id) on delete cascade,
  score integer not null check (score>=0),
  max_score integer not null check (max_score>0),
  origin text not null default 'legacy_unverified' check (origin in ('legacy_unverified','self_reported','server_verified')),
  verified boolean not null default false,
  attempted_at timestamptz not null default now(),
  check (score<=max_score)
);
create index sylearn_assessment_attempts_user_idx on public.assessment_attempts(user_id, attempted_at desc);

create table public.live_sessions (
  id text primary key,
  title text not null,
  category text,
  instructor text,
  description text not null default '',
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  access_type text not null default 'free' check (access_type in ('free','paid')),
  price_ngn numeric(12,2) not null default 0 check (price_ngn>=0),
  status text not null default 'scheduled' check (status in ('scheduled','cancelled','completed')),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  check (ends_at>starts_at)
);
-- Do NOT store a private meeting URL in the publicly readable live_sessions.
-- Keep invite URLs in a server-only store and return only to authorized attendees.

create table public.saved_live_sessions (
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id text not null references public.live_sessions(id) on delete cascade,
  saved_at timestamptz not null default now(),
  primary key(user_id,session_id)
);

create table public.live_registrations (
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id text not null references public.live_sessions(id) on delete cascade,
  status text not null default 'pending' check(status in ('pending','confirmed','cancelled')),
  registered_at timestamptz not null default now(),
  primary key(user_id,session_id)
);

-- Payments and certificates: clients can READ their own, but NEVER write.
-- Verified payment status must come from a verified server webhook.
create table public.payment_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text references public.courses(id) on delete set null,
  amount_ngn numeric(12,2) not null check (amount_ngn>=0),
  provider text not null,
  provider_reference text unique,
  status text not null default 'pending' check (status in ('pending','paid','failed','refunded')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index sylearn_payment_records_user_idx on public.payment_records(user_id,created_at desc);

create table public.learning_completion_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null references public.courses(id) on delete cascade,
  record_status text not null default 'unverified'
    check (record_status in ('unverified','verified','revoked')),
  issued_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  unique (user_id,course_id)
);
-- SYLearn local learning records are not official/accredited certificates.

create function sylearn_private.sylearn_touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
create trigger sylearn_touch_profile before update on public.profiles
  for each row execute function sylearn_private.sylearn_touch_updated_at();
create trigger sylearn_touch_course before update on public.courses
  for each row execute function sylearn_private.sylearn_touch_updated_at();
create trigger sylearn_touch_note before update on public.study_notes
  for each row execute function sylearn_private.sylearn_touch_updated_at();
create trigger sylearn_touch_payment before update on public.payment_records
  for each row execute function sylearn_private.sylearn_touch_updated_at();

-- Automatically create a profile for newly authenticated learners.
create function sylearn_private.sylearn_handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles(id,display_name,preferred_language)
  values(
    new.id,
    left(coalesce(nullif(new.raw_user_meta_data->>'display_name',''),'Learner'),80),
    case when new.raw_user_meta_data->>'preferred_language'='Hausa' then 'Hausa' else 'English' end
  ) on conflict (id) do nothing;
  return new;
end;
$$;
revoke all on function sylearn_private.sylearn_handle_new_user() from public, anon, authenticated;
create trigger sylearn_auth_new_user after insert on auth.users
  for each row execute function sylearn_private.sylearn_handle_new_user();

-- Secure ALL public tables: privileges + row-level security.
alter table public.staff_users enable row level security;
revoke all on table public.staff_users from anon, authenticated;
alter table public.profiles enable row level security;
revoke all on table public.profiles from anon, authenticated;
alter table public.courses enable row level security;
revoke all on table public.courses from anon, authenticated;
alter table public.course_chapters enable row level security;
revoke all on table public.course_chapters from anon, authenticated;
alter table public.saved_courses enable row level security;
revoke all on table public.saved_courses from anon, authenticated;
alter table public.chapter_progress enable row level security;
revoke all on table public.chapter_progress from anon, authenticated;
alter table public.study_notes enable row level security;
revoke all on table public.study_notes from anon, authenticated;
alter table public.assessment_attempts enable row level security;
revoke all on table public.assessment_attempts from anon, authenticated;
alter table public.live_sessions enable row level security;
revoke all on table public.live_sessions from anon, authenticated;
alter table public.saved_live_sessions enable row level security;
revoke all on table public.saved_live_sessions from anon, authenticated;
alter table public.live_registrations enable row level security;
revoke all on table public.live_registrations from anon, authenticated;
alter table public.payment_records enable row level security;
revoke all on table public.payment_records from anon, authenticated;
alter table public.learning_completion_records enable row level security;
revoke all on table public.learning_completion_records from anon, authenticated;

-- Backend-only Supabase role keeps full access even on projects with
-- restricted/default-deny table privileges. Never ship this role's key to clients.
grant all on table
 public.staff_users,public.profiles,public.courses,public.course_chapters,
 public.saved_courses,public.chapter_progress,public.study_notes,
 public.assessment_attempts,public.live_sessions,public.saved_live_sessions,
 public.live_registrations,public.payment_records,public.learning_completion_records
 to service_role;

-- Public discovery is read-only.
grant select on public.courses, public.course_chapters, public.live_sessions to anon, authenticated;
grant select on public.staff_users to authenticated;
grant select,insert,update on public.profiles to authenticated;
grant select,insert,delete on public.saved_courses,public.chapter_progress,public.saved_live_sessions to authenticated;
grant select,insert,update,delete on public.study_notes to authenticated;
grant select,insert on public.assessment_attempts,public.live_registrations to authenticated;
grant select on public.payment_records,public.learning_completion_records to authenticated;
-- Staff may manage catalog and sessions, but RLS still checks staff membership.
grant insert,update,delete on public.courses,public.course_chapters,public.live_sessions to authenticated;

create policy sylearn_staff_self_read on public.staff_users
 for select to authenticated using(user_id=(select auth.uid()));

create policy sylearn_profile_read on public.profiles
 for select to authenticated using(id=(select auth.uid()));
create policy sylearn_profile_insert on public.profiles
 for insert to authenticated with check(id=(select auth.uid()));
create policy sylearn_profile_update on public.profiles
 for update to authenticated using(id=(select auth.uid()))
 with check(id=(select auth.uid()));

create policy sylearn_course_public_read on public.courses
 for select to anon,authenticated using(is_published);
create policy sylearn_course_staff_read on public.courses
 for select to authenticated using((select sylearn_private.sylearn_is_staff()));
create policy sylearn_course_create_staff on public.courses
 for insert to authenticated with check((select sylearn_private.sylearn_is_staff()));
create policy sylearn_course_edit_staff on public.courses
 for update to authenticated using((select sylearn_private.sylearn_is_staff()))
 with check((select sylearn_private.sylearn_is_staff()));
create policy sylearn_course_delete_staff on public.courses
 for delete to authenticated using((select sylearn_private.sylearn_is_staff()));

create policy sylearn_chapters_public_read on public.course_chapters
 for select to anon,authenticated using(exists(
   select 1 from public.courses c where c.id=course_id and c.is_published
 ));
create policy sylearn_chapters_staff_read on public.course_chapters
 for select to authenticated using((select sylearn_private.sylearn_is_staff()));
create policy sylearn_chapters_add_staff on public.course_chapters
 for insert to authenticated with check((select sylearn_private.sylearn_is_staff()));
create policy sylearn_chapters_edit_staff on public.course_chapters
 for update to authenticated using((select sylearn_private.sylearn_is_staff()))
 with check((select sylearn_private.sylearn_is_staff()));
create policy sylearn_chapters_delete_staff on public.course_chapters
 for delete to authenticated using((select sylearn_private.sylearn_is_staff()));

create policy sylearn_saved_course_read on public.saved_courses
 for select to authenticated using(user_id=(select auth.uid()));
create policy sylearn_saved_course_add on public.saved_courses
 for insert to authenticated with check(user_id=(select auth.uid()));
create policy sylearn_saved_course_remove on public.saved_courses
 for delete to authenticated using(user_id=(select auth.uid()));

create policy sylearn_progress_read on public.chapter_progress
 for select to authenticated using(user_id=(select auth.uid()));
create policy sylearn_progress_add on public.chapter_progress
 for insert to authenticated with check(user_id=(select auth.uid()));
create policy sylearn_progress_remove on public.chapter_progress
 for delete to authenticated using(user_id=(select auth.uid()));

create policy sylearn_notes_read on public.study_notes
 for select to authenticated using(user_id=(select auth.uid()));
create policy sylearn_notes_add on public.study_notes
 for insert to authenticated with check(user_id=(select auth.uid()));
create policy sylearn_notes_edit on public.study_notes
 for update to authenticated using(user_id=(select auth.uid()))
 with check(user_id=(select auth.uid()));
create policy sylearn_notes_remove on public.study_notes
 for delete to authenticated using(user_id=(select auth.uid()));

create policy sylearn_assessments_read on public.assessment_attempts
 for select to authenticated using(user_id=(select auth.uid()));
create policy sylearn_assessments_selfreport on public.assessment_attempts
 for insert to authenticated with check(
   user_id=(select auth.uid()) and verified=false and origin in ('legacy_unverified','self_reported')
 );

create policy sylearn_live_public_read on public.live_sessions
 for select to anon,authenticated using(is_published);
create policy sylearn_live_staff_read on public.live_sessions
 for select to authenticated using((select sylearn_private.sylearn_is_staff()));
create policy sylearn_live_add_staff on public.live_sessions
 for insert to authenticated with check((select sylearn_private.sylearn_is_staff()));
create policy sylearn_live_edit_staff on public.live_sessions
 for update to authenticated using((select sylearn_private.sylearn_is_staff()))
 with check((select sylearn_private.sylearn_is_staff()));
create policy sylearn_live_delete_staff on public.live_sessions
 for delete to authenticated using((select sylearn_private.sylearn_is_staff()));

create policy sylearn_saved_live_read on public.saved_live_sessions
 for select to authenticated using(user_id=(select auth.uid()));
create policy sylearn_saved_live_add on public.saved_live_sessions
 for insert to authenticated with check(user_id=(select auth.uid()));
create policy sylearn_saved_live_remove on public.saved_live_sessions
 for delete to authenticated using(user_id=(select auth.uid()));

create policy sylearn_registration_read on public.live_registrations
 for select to authenticated using(user_id=(select auth.uid()));
create policy sylearn_registration_free_add on public.live_registrations
 for insert to authenticated with check(
  user_id=(select auth.uid()) and status='pending' and exists (
   select 1 from public.live_sessions s where s.id=session_id and s.is_published
   and s.status='scheduled' and s.access_type='free' and s.starts_at>now()
  )
 );

create policy sylearn_payments_read on public.payment_records
 for select to authenticated using(user_id=(select auth.uid()));
create policy sylearn_completion_read on public.learning_completion_records
 for select to authenticated using(user_id=(select auth.uid()));

-- Populate initial curated CATALOG and chapters only (NO fabricated users,
-- enrollments, live events, payments, certificates, or learning progress).
insert into public.courses
  (id,title,creator,category,level,description,hours_label,thumbnail_url,is_featured)
values
  ('rfscVS0vtbw', 'Learn Python — Full Course for Beginners', 'freeCodeCamp.org', 'Programming', 'Beginner', 'Start programming with Python: setup, variables, functions, loops, files and projects.', '4h 26m', 'https://i.ytimg.com/vi/rfscVS0vtbw/hqdefault.jpg', false),
  ('PkZNo7MFNFg', 'JavaScript — Full Course for Beginners', 'freeCodeCamp.org', 'Programming', 'Beginner', 'Complete fundamentals from variables and arrays to objects, loops and ES6.', '3h 20m+', 'https://i.ytimg.com/vi/PkZNo7MFNFg/hqdefault.jpg', false),
  ('HXV3zeQKqGY', 'SQL Tutorial — Full Database Course', 'freeCodeCamp.org', 'Data & Analytics', 'Beginner', 'Learn SQL and database basics, tables, queries, joins and database design.', '4h+', 'https://i.ytimg.com/vi/HXV3zeQKqGY/hqdefault.jpg', false),
  ('KJgsSFOSQv0', 'C Programming Tutorial for Beginners', 'freeCodeCamp.org', 'Programming', 'Beginner', 'Programming fundamentals with C, variables, arrays, functions, loops and pointers.', '3h 45m+', 'https://i.ytimg.com/vi/KJgsSFOSQv0/hqdefault.jpg', false),
  ('DPqiIzK97K0', 'Arduino & Electronics — Project-Based Course', 'freeCodeCamp.org', 'Engineering & IoT', 'Beginner', 'Build Arduino circuits, LED projects, voltmeters, buzzers, sensors and an LED matrix display.', '10h 28m', 'https://i.ytimg.com/vi/DPqiIzK97K0/hqdefault.jpg', true),
  ('Vl0H-qTclOg', 'Microsoft Excel — Six Real-World Projects', 'freeCodeCamp.org', 'Business & Office', 'Beginner', 'Practice payroll, gradebooks, charts, inventory, pivot tables and lookups with Excel.', '2h 30m', 'https://i.ytimg.com/vi/Vl0H-qTclOg/hqdefault.jpg', false),
  ('CMEWVn1uZpQ', 'Python for Data Science — Practical Projects', 'freeCodeCamp.org', 'Data & Analytics', 'Beginner', 'Learn Python, NumPy, Pandas, visualizations, data cleaning and introductory machine learning.', '17h+', 'https://i.ytimg.com/vi/CMEWVn1uZpQ/hqdefault.jpg', true),
  ('hDKCxebp88A', 'Machine Learning with Python & Scikit-Learn', 'freeCodeCamp.org', 'Artificial Intelligence', 'Intermediate', 'Build supervised and unsupervised learning models and deploy a real machine-learning project.', '18h+', 'https://i.ytimg.com/vi/hDKCxebp88A/hqdefault.jpg', true),
  ('PSNXoAs2FtQ', 'Data Analyst Bootcamp — SQL, Excel & Power BI', 'freeCodeCamp.org', 'Data & Analytics', 'Beginner', 'Career-oriented analytics bootcamp with SQL, Tableau, Power BI, Python, Excel and portfolio projects.', '19h+', 'https://i.ytimg.com/vi/PSNXoAs2FtQ/hqdefault.jpg', false),
  ('wUSDVGivd-8', 'Python for Data Analytics — Full Tutorial', 'Luke Barousse', 'Data & Analytics', 'Beginner', 'Learn Python, Pandas, Matplotlib and practical data analyst portfolio projects.', '11h 9m', 'https://i.ytimg.com/vi/wUSDVGivd-8/hqdefault.jpg', false),
  ('c9Wg6Cb_YlU', 'UI/UX Design — Wireframes to Prototypes', 'freeCodeCamp.org', 'Design & Creative', 'Beginner', 'Follow a real website design process from wireframes through UI layout to polished Figma mockups.', '1h+', 'https://i.ytimg.com/vi/c9Wg6Cb_YlU/hqdefault.jpg', false)
on conflict (id) do nothing;

insert into public.course_chapters
  (course_id,chapter_index,title,start_seconds)
values
  ('rfscVS0vtbw', 0, 'Introduction', 0),
  ('rfscVS0vtbw', 1, 'Install Python & Set Up', 105),
  ('rfscVS0vtbw', 2, 'Variables and Data Types', 906),
  ('rfscVS0vtbw', 3, 'Strings, Numbers and Input', 1623),
  ('rfscVS0vtbw', 4, 'Lists and Functions', 3800),
  ('rfscVS0vtbw', 5, 'Conditions and Loops', 6006),
  ('rfscVS0vtbw', 6, 'Files and Modules', 11561),
  ('rfscVS0vtbw', 7, 'Classes and Final Quiz', 13436),
  ('PkZNo7MFNFg', 0, 'Introduction & JavaScript Setup', 0),
  ('PkZNo7MFNFg', 1, 'Variables and Operators', 356),
  ('PkZNo7MFNFg', 2, 'Strings', 1279),
  ('PkZNo7MFNFg', 3, 'Arrays', 2444),
  ('PkZNo7MFNFg', 4, 'Functions and Scope', 3101),
  ('PkZNo7MFNFg', 5, 'Conditions and Objects', 4104),
  ('PkZNo7MFNFg', 6, 'Loops', 7815),
  ('PkZNo7MFNFg', 7, 'Modern JavaScript and ES6', 9456),
  ('HXV3zeQKqGY', 0, 'What Is a Database?', 156),
  ('HXV3zeQKqGY', 1, 'Tables and Keys', 1390),
  ('HXV3zeQKqGY', 2, 'SQL Basics and Setup', 2611),
  ('HXV3zeQKqGY', 3, 'Creating Tables and Data', 4549),
  ('HXV3zeQKqGY', 4, 'Queries and Functions', 6971),
  ('HXV3zeQKqGY', 5, 'Joins and Nested Queries', 10896),
  ('HXV3zeQKqGY', 6, 'ER Diagrams and Database Design', 13332),
  ('KJgsSFOSQv0', 0, 'Introduction', 0),
  ('KJgsSFOSQv0', 1, 'Setup and Hello World', 82),
  ('KJgsSFOSQv0', 2, 'Variables and Data Types', 1256),
  ('KJgsSFOSQv0', 3, 'Input and Arrays', 3600),
  ('KJgsSFOSQv0', 4, 'Functions and Decisions', 5804),
  ('KJgsSFOSQv0', 5, 'Loops and Structs', 8487),
  ('KJgsSFOSQv0', 6, 'Pointers and Memory', 11350),
  ('KJgsSFOSQv0', 7, 'Writing and Reading Files', 12757),
  ('DPqiIzK97K0', 0, 'Getting started with Arduino', 0),
  ('DPqiIzK97K0', 1, 'Breadboards and LEDs', 292),
  ('DPqiIzK97K0', 2, 'Traffic light project', 3412),
  ('DPqiIzK97K0', 3, 'Analog pins', 4370),
  ('DPqiIzK97K0', 4, 'Voltmeter project', 5681),
  ('DPqiIzK97K0', 5, 'Sound and buzzer projects', 7998),
  ('DPqiIzK97K0', 6, 'Temperature sensors', 11867),
  ('DPqiIzK97K0', 7, 'Pushbuttons and RGB LED', 14877),
  ('DPqiIzK97K0', 8, '7-segment displays', 22324),
  ('DPqiIzK97K0', 9, '8x8 LED matrix', 33357),
  ('Vl0H-qTclOg', 0, 'Complete Excel workshop', 0),
  ('CMEWVn1uZpQ', 0, 'Installation and Python basics', 0),
  ('CMEWVn1uZpQ', 1, 'Pandas and NumPy', 6101),
  ('CMEWVn1uZpQ', 2, 'Web scraping project', 12375),
  ('CMEWVn1uZpQ', 3, 'Filtering and extraction', 14736),
  ('CMEWVn1uZpQ', 4, 'Data reshaping', 27117),
  ('CMEWVn1uZpQ', 5, 'Visualization project', 28259),
  ('CMEWVn1uZpQ', 6, 'GroupBy and merging', 32199),
  ('CMEWVn1uZpQ', 7, 'Data cleaning project', 45945),
  ('CMEWVn1uZpQ', 8, 'Machine learning introduction', 51465),
  ('hDKCxebp88A', 0, 'Introduction', 0),
  ('hDKCxebp88A', 1, 'Linear regression', 25),
  ('hDKCxebp88A', 2, 'Logistic regression', 8250),
  ('hDKCxebp88A', 3, 'Decision trees and forests', 17606),
  ('hDKCxebp88A', 4, 'ML project workflow', 26729),
  ('hDKCxebp88A', 5, 'XGBoost', 36373),
  ('hDKCxebp88A', 6, 'Unsupervised learning', 44457),
  ('hDKCxebp88A', 7, 'End-to-end ML project', 49998),
  ('hDKCxebp88A', 8, 'Deploy with Flask', 60347),
  ('PSNXoAs2FtQ', 0, 'Bootcamp introduction', 0),
  ('PSNXoAs2FtQ', 1, 'Becoming a data analyst', 70),
  ('PSNXoAs2FtQ', 2, 'SQL setup', 908),
  ('PSNXoAs2FtQ', 3, 'SQL SELECT queries', 1484),
  ('PSNXoAs2FtQ', 4, 'SQL WHERE clauses', 1857),
  ('wUSDVGivd-8', 0, 'Welcome and setup', 0),
  ('wUSDVGivd-8', 1, 'Python basics', 522),
  ('wUSDVGivd-8', 2, 'Lists and dictionaries', 5640),
  ('wUSDVGivd-8', 3, 'Functions', 10332),
  ('wUSDVGivd-8', 4, 'Pandas intro', 15776),
  ('wUSDVGivd-8', 5, 'Charts with Matplotlib', 19039),
  ('wUSDVGivd-8', 6, 'Data analysis techniques', 21056),
  ('wUSDVGivd-8', 7, 'Final portfolio project', 35140),
  ('c9Wg6Cb_YlU', 0, 'Introduction', 0),
  ('c9Wg6Cb_YlU', 1, 'Wireframing', 87),
  ('c9Wg6Cb_YlU', 2, 'User Interface Layout', 1858),
  ('c9Wg6Cb_YlU', 3, 'Polished Mockup', 3998)
on conflict (course_id,chapter_index) do nothing;

-- DEPLOYMENT CHECKLIST:
-- 1. Connect the official Supabase plugin and choose the SYLearn project.
-- 2. Run this migration ONCE on an empty dedicated Supabase project.
-- 3. Check staff RLS / anonymous catalog / cross-user isolation.
-- 4. Integrate Supabase Auth before enabling localStorage -> cloud migration.
-- 5. Migrate records only after the SAME learner authenticates and confirms.
-- 6. Do not expose a service/secret key in public Vercel assets.
-- 7. Do not represent self-reported quiz results as verified certificates.
