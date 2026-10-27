/* SYLearn Promo Carousel V1
 * Marketing-only banners for the SYLearn Home page.
 * Edit this published array to change promotions. This is not a booking or
 * payment system; use only destinations and offers that actually exist.
 *
 * Routes allowed by the home page: courses, live.
 * Optional category is used only with route: "courses".
 */
(function(){
 'use strict';
 window.SYLEARN_PROMOTIONS=[
  {
   id:'discover',
   eyebrow:'DISCOVER YOUR POTENTIAL',
   title:'Your next skill starts here.',
   description:'Explore practical courses in programming, AI, design and more.',
   cta:'Explore courses',
   route:'courses',
   category:'',
   theme:'crimson',
   icon:'spark'
  },
  {
   id:'live-academy',
   eyebrow:'SYLearn LIVE ACADEMY',
   title:'Learn live. Build real skills.',
   description:'See workshops and instructor-led class schedules in one place.',
   cta:'View live classes',
   route:'live',
   category:'',
   theme:'cyan',
   icon:'radio'
  },
  {
   id:'engineering',
   eyebrow:'BUILD SOMETHING REAL',
   title:'Explore Arduino & IoT.',
   description:'Start learning circuits, sensors, automation and electronics.',
   cta:'Explore engineering',
   route:'courses',
   category:'Engineering & IoT',
   theme:'violet',
   icon:'settings'
  }
 ];
})();
