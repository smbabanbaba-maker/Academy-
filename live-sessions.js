/* SYLearn Live Academy — public session schedule.
   Add only REAL classes confirmed by SYLUTION's team. All times must have an
   explicit timezone (recommended +01:00 for West Africa Time).

   Example shape (not a published session):
   {
     id: "unique-slug",
     title: "Class title",
     category: "Programming",
     instructor: "Instructor name",
     description: "What learners will do",
     startAt: "2026-11-07T16:00:00+01:00",
     endAt: "2026-11-07T17:00:00+01:00",
     access: "free", // or "paid"
     priceNGN: 0, // only for an actual paid offering
     meetingUrl: "https://meet.google.com/your-real-link",
     outcomes: ["Outcome 1", "Outcome 2"],
     requirements: ["Laptop recommended"]
   }
   Put actual entries inside the array. DO NOT add example sessions as real classes.
   Saved sessions in the client are personal reminders only, not server registrations.
*/
(function(){
  'use strict';
  window.SYLEARN_LIVE_SESSIONS = [];
})();
