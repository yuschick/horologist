(()=>{"use strict";var e={amdO:{}};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var n=e.g.document;if(!t&&n&&(n.currentScript&&(t=n.currentScript.src),!t)){var r=n.getElementsByTagName("script");r.length&&(t=r[r.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})();const t=e.p+"0eb0a1b03f31bbd0e1e34c0c4c776db9.mp4",n=e.p+"10e2d3a24b3e94e138f76749d2d2174f.mp4";var r=Object.create,i=Object.defineProperty,s=Object.getOwnPropertyDescriptor,o=Object.getOwnPropertyNames,a=Object.getPrototypeOf,u=Object.prototype.hasOwnProperty,h=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),l=(e,t,n)=>(n=null!=e?r(a(e)):{},((e,t,n,r)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let n of o(t))!u.call(e,n)&&undefined!==n&&i(e,n,{get:()=>t[n],enumerable:!(r=s(t,n))||r.enumerable});return e})(!t&&e&&e.__esModule?n:i(n,"default",{value:e,enumerable:!0}),e)),c=h(((t,n)=>{var r,i;r=t,i=function(e){var t,n,r,i,s,o=function(e){return e*(Math.PI/180)},a=function(e){return e*(180/Math.PI)},u=(Object.freeze({degreesToRadians:o,radiansToDegrees:a}),function(e,t){if(null==e)throw new Error("degrees to radians");if(null==t)throw new Error("radians to degrees");return Object.freeze({sine:function(t){return Math.sin(e(t))},cosine:function(t){return Math.cos(e(t))},arcsine:function(e){return t(Math.asin(e))},arccosine:function(e){return t(Math.acos(e))}})}(o,a)),h=u.cosine,l=u.sine,c=u.arcsine,m=u.arccosine,d=(t=l,n=h,r=c,i=function(e){if(!e)throw new Error("Please provide a valid date");var t=new Date(e.getFullYear(),0,0),n=e-t+60*(t.getTimezoneOffset()-e.getTimezoneOffset())*1e3;return Math.floor(n/864e5)},s=function(e,t,n){throw new Error("Unsatisfied Dependency Error:\n      Please provide a function for ".concat(e,".\n      This dependency takes in ").concat(t,"\n      and returns ").concat(n))},t||s("sine","x: Number","Number"),n||s("cosine","x: Number","Number"),r||s("arcsine","x: Number","Number"),i||s("getDayOfTheYear","date: Date","Number"),Object.freeze({getDeclinationOfTheSun:function(e){return function(e){if(!e)throw new Error("Please provide a valid date");var s=function(e){var r=t(.98565*(e-2));return n(.98565*(e+10)+1.914*r)}(i(e)-1);return r(-.39779*s)}(e)}})).getDeclinationOfTheSun,f=function(e){if(!e)throw new Error("Please provide a valid date");var t=e.getFullYear(),n=e.getMonth()+1,r=e.getDate(),i=e.getHours(),s=e.getMinutes(),o=e.getTimezoneOffset()/60,a=367*t-730531.5+g(7*v(t+(n+9)/12)/4)+(v(275*n/9)+r)+(i+s/60-o)/24,u=v(a/365.25),h=.0172024*(a-365.25*u),l=9.92465-14e-5*u,c=3.07892-19e-5*u,m=13e-5*u-1.38995;return.00526+(7.36303-9e-5*u)*Math.sin(1*(h+c))+l*Math.sin(2*(h+m))+.3173*Math.sin(3*(h-.94686))+.21922*Math.sin(4*(h-.60716))},g=function(e){return v(-1*e)},v=function(e){return Number.parseInt(e)},p=function(e){if(null==e)throw new Error("Unsatisfied Dependency Error:\n      Please provide a function for equationOfTime.\n      This dependency takes in a Date\n      and returns a Number");return Object.freeze({getNoonHourAngle:function(t,n){return function(t,n){if(null==t)throw new Error("Please provide a date: Date to get the hour angle");if(null==n||isNaN(n))throw new Error("Please provide the longitude: Number to get the noon hour angle");return 12-(function(e){return e/15}(n)+function(e,t){return e(t)/60}(e,t))}(t,n)}})},E=function(e,t,n,r){var i=function(e,t,n){throw new Error("Unsatisfied Dependency Error:\n      Please provide a function for ".concat(e,".\n      This dependency takes in ").concat(t,"\n      and returns ").concat(n))};return null==e&&i("sine","x: Number","Number"),null==t&&i("cosine","x: Number","Number"),null==n&&i("arccosine","x: Number","Number"),null==r&&i("getDeclinationOfTheSun","date: Date","Number"),Object.freeze({getHourAngleSinceNoon:function(i,s,o){return function(i,s,o){var a=r(i),u=(e(o)-e(s)*e(a))/(t(s)*t(a));return u<-1?function(){throw new RangeError("The sun altitude never drops below the angle specified")}():u>1?function(){throw new RangeError("The sun altitude never elevates above the angle specified")}():.0666666666666667*n(u)}(i,s,o)}})},w=E(l,h,m,d).getHourAngleSinceNoon,N=p(f).getNoonHourAngle,y=function(e,t){return e%1*t},T=function(e){if(!e)throw new Error("Unsatisfied Dependency Error:\n      Please provide a function for toTime.\n      This dependency takes in a scientific decimal time\n      and returns an object with the following properties: hours: Number, minutes: Number, seconds: Number and milliseconds: Number");return Object.freeze({toUtcDateTime:function(t,n){if(null==t)throw new Error("Please provide the desired date \n      to convert to a Utc Date Time value");if(null==n||isNaN(n))throw new Error("Please provide the hourAngle for the desired date \n        to convert to a Utc Date Time value");var r=function(e){return e<0?-1:e>=24?1:0}(n),i=function(e,t){return t<0?e+24:e>=24?e-24:e}(n,r),s=t.getDate(),o=t.getMonth(),a=t.getFullYear(),u=e(i),h=u.hours,l=u.minutes,c=u.seconds,m=u.milliseconds,d=Date.UTC(a,o,s,h,l,c,m);return 0!==r?function(e,t){var n=new Date(e.valueOf());return n.setDate(n.getDate()+t),n}(d,r):new Date(d)}})}((function(e){if(!e||isNaN(e))throw new Error("Value is either null, undefined or not a number.");var t=y(e,60),n=y(t,60),r=y(n,1e3);return{hours:parseInt(e),minutes:parseInt(t),seconds:parseInt(n),milliseconds:parseInt(r)}})).toUtcDateTime,D=function(e,t,n){try{return e()}catch(e){switch(e.message){case"The sun altitude never drops below the angle specified":return t;case"The sun altitude never elevates above the angle specified":return n;default:throw e}}},_=function(e,t,n,r){return"The sun's altitude does not drop to ".concat(r,"° on ").concat(e.toDateString()," at latitude ").concat(t," and longitude ").concat(n)},b=function(e,t,n,r){return"The sun's altitude does not rise to ".concat(r,"° on ").concat(e.toDateString()," at latitude ").concat(t," and longitude ").concat(n)},I=function(e,t,n){return"The sun is up all day on ".concat(e.toDateString()," at latitude ").concat(t," and longitude ").concat(n)},R=function(e,t,n){return"The sun is down all day on ".concat(e.toDateString()," at latitude ").concat(t," and longitude ").concat(n)},S=p(f).getNoonHourAngle,A=function(e,t){return T(e,S(e,t)).toISOString()},O=function(e,t){var n=function(e,t,n){throw new Error("Unsatisfied Dependency Error:\n      Please provide a function for ".concat(e,".\n      This dependency takes in params ").concat(t,"\n      and returns ").concat(n))};null==e&&n("getNoonDateTimeUtc","date: Date, longitude: Number, angle: Number","Date"),null==t&&n("getHourAngleSinceNoon","date: Date, latitude: Number, longitude: Number, hourAngle: Number","Number");var r=function(e){throw new Error(e)},i=function(t,n,r){var i=new Date(e(t,n));return s(i,r)},s=function(e,t){var n=new Date;return n.setTime(e.getTime()+60*t*60*1e3),n};return Object.freeze({getDateTimeUtcOfAngleBeforeNoon:function(e,n,s,o){return isNaN(e)?r("Please provide a numeric value for angle param"):isNaN(Date.parse(n))?r("Please provide a valid date"):isNaN(s)?r("Please provide a numeric value for latitude param"):isNaN(o)?r("Please provide a numeric value for longitude param"):i(n,o,-1*t(n,s,e)).toISOString()},getDateTimeUtcOfAngleAfterNoon:function(e,n,s,o){return isNaN(e)?r("Please provide a numeric value for angle param"):isNaN(Date.parse(n))?r("Please provide a valid date"):isNaN(s)?r("Please provide a numeric value for latitude param"):isNaN(o)?r("Please provide a numeric value for longitude param"):i(n,o,t(n,s,e)).toISOString()}})}(A,E(l,h,m,d).getHourAngleSinceNoon),C=O.getDateTimeUtcOfAngleBeforeNoon,U=O.getDateTimeUtcOfAngleAfterNoon;e.equationOfTime=f,e.getAstronomicalDawnEndDateTimeUtc=function(e,t,n){return D((function(){return C(-12-2e-15,e,t,n)}),_(e,t,n,-12),b(e,t,n,-12))},e.getAstronomicalDawnStartDateTimeUtc=function(e,t,n){return D((function(){return C(-18,e,t,n)}),_(e,t,n,-18),b(e,t,n,-18))},e.getAstronomicalDuskEndDateTimeUtc=function(e,t,n){return D((function(){return U(-18,e,t,n)}),_(e,t,n,-18),b(e,t,n,-18))},e.getAstronomicalDuskStartDateTimeUtc=function(e,t,n){return D((function(){return U(-12-2e-15,e,t,n)}),_(e,t,n,-12),b(e,t,n,-12))},e.getCivilDawnEndDateTimeUtc=function(e,t,n){return D((function(){return C(-.833333333,e,t,n)}),I(e,t,n),R(e,t,n))},e.getCivilDawnStartDateTimeUtc=function(e,t,n){return D((function(){return C(-6,e,t,n)}),_(e,t,n,-6),b(e,t,n,-6))},e.getCivilDuskEndDateTimeUtc=function(e,t,n){return D((function(){return U(-6,e,t,n)}),_(e,t,n,-6),b(e,t,n,-6))},e.getCivilDuskStartDateTimeUtc=function(e,t,n){return D((function(){return U(-.833333333,e,t,n)}),I(e,t,n),R(e,t,n))},e.getDateTimeUtcOfAngleAfterNoon=function(e,t,n,r){return D((function(){return U(e,t,n,r)}),_(t,n,r,e),b(t,n,r,e))},e.getDateTimeUtcOfAngleBeforeNoon=function(e,t,n,r){return D((function(){return C(e,t,n,r)}),_(t,n,r,e),b(t,n,r,e))},e.getDeclinationOfTheSun=d,e.getHourAngleSinceNoon=w,e.getNauticalDawnEndDateTimeUtc=function(e,t,n){return D((function(){return C(-6-2e-15,e,t,n)}),_(e,t,n,-6),b(e,t,n,-6))},e.getNauticalDawnStartDateTimeUtc=function(e,t,n){return D((function(){return C(-12,e,t,n)}),_(e,t,n,-12),b(e,t,n,-12))},e.getNauticalDuskEndDateTimeUtc=function(e,t,n){return D((function(){return U(-12,e,t,n)}),_(e,t,n,-12),b(e,t,n,-12))},e.getNauticalDuskStartDateTimeUtc=function(e,t,n){return D((function(){return U(-6-2e-15,e,t,n)}),_(e,t,n,-6),b(e,t,n,-6))},e.getNoonDateTimeUtc=A,e.getNoonHourAngle=N,e.getSunriseDateTimeUtc=function(e,t,n){return D((function(){return C(-.833333333,e,t,n)}),I(e,t,n),R(e,t,n))},e.getSunsetDateTimeUtc=function(e,t,n){return D((function(){return U(-.833333333,e,t,n)}),I(e,t,n),R(e,t,n))},Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof t&&typeof n<"u"?i(t):"function"==typeof define&&e.amdO?define(["exports"],i):i((r=r||self).suntimes={})})),m=h(((t,n)=>{var r,i;r=t,i=function(e){let t={NORTHERN:"Northern",SOUTHERN:"Southern"},n={NorthernHemisphere:{NEW:"🌑",WAXING_CRESCENT:"🌒",FIRST_QUARTER:"🌓",WAXING_GIBBOUS:"🌔",FULL:"🌕",WANING_GIBBOUS:"🌖",LAST_QUARTER:"🌗",WANING_CRESCENT:"🌘"},SouthernHemisphere:{NEW:"🌑",WAXING_CRESCENT:"🌘",FIRST_QUARTER:"🌗",WAXING_GIBBOUS:"🌖",FULL:"🌕",WANING_GIBBOUS:"🌔",LAST_QUARTER:"🌓",WANING_CRESCENT:"🌒"}},r={NEW:"New",WAXING_CRESCENT:"Waxing Crescent",FIRST_QUARTER:"First Quarter",WAXING_GIBBOUS:"Waxing Gibbous",FULL:"Full",WANING_GIBBOUS:"Waning Gibbous",LAST_QUARTER:"Last Quarter",WANING_CRESCENT:"Waning Crescent"},i=2440587.5,s=2423436.6115277777,o=27.55454988,a=29.53058770576;var u=Object.freeze({__proto__:null,EPOCH:i,LUNATION_BASE_JULIAN_DAY:s,PHASE_LENGTH:3.69132346322,ANOMALISTIC_MONTH:o,SYNODIC_MONTH:a});let h=e=>((e-=Math.floor(e))<0&&(e+=1),e),l=(e=new Date)=>e.getTime()/864e5-e.getTimezoneOffset()/1440+i;var c=Object.freeze({__proto__:null,fromDate:l,toDate:e=>{let t=new Date;return t.setTime(864e5*(e-i+t.getTimezoneOffset()/1440)),t}});let m=(e=new Date)=>d(e)*a,d=(e=new Date)=>h((l(e)-2451550.1)/a),f=(e=new Date)=>{let t=m(e);return t<1.84566173161?r.NEW:t<5.53698519483?r.WAXING_CRESCENT:t<9.22830865805?r.FIRST_QUARTER:t<12.91963212127?r.WAXING_GIBBOUS:t<16.61095558449?r.FULL:t<20.30227904771?r.WANING_GIBBOUS:t<23.99360251093?r.LAST_QUARTER:t<27.68492597415?r.WANING_CRESCENT:r.NEW},g=(e,i=t.NORTHERN)=>{let s;switch(s=i===t.SOUTHERN?n.SouthernHemisphere:n.NorthernHemisphere,e){case r.WANING_CRESCENT:return s.WANING_CRESCENT;case r.LAST_QUARTER:return s.LAST_QUARTER;case r.WANING_GIBBOUS:return s.WANING_GIBBOUS;case r.FULL:return s.FULL;case r.WAXING_GIBBOUS:return s.WAXING_GIBBOUS;case r.FIRST_QUARTER:return s.FIRST_QUARTER;case r.WAXING_CRESCENT:return s.WAXING_CRESCENT;default:return s.NEW}};var v=Object.freeze({__proto__:null,lunarAge:m,lunarAgePercent:d,lunationNumber:(e=new Date)=>Math.round((l(e)-s)/a)+1,lunarDistance:(e=new Date)=>{let t=l(e),n=2*d(e)*Math.PI,r=2*Math.PI*h((t-2451562.2)/o);return 60.4-3.3*Math.cos(r)-.6*Math.cos(2*n-r)-.5*Math.cos(2*n)},lunarPhase:f,lunarPhaseEmoji:(e=new Date,n=t.NORTHERN)=>{let r=f(e);return g(r,n)},emojiForLunarPhase:g,isWaxing:(e=new Date)=>m(e)<=14.765,isWaning:(e=new Date)=>m(e)>14.765});e.Hemisphere=t,e.JulianDay=c,e.LunarEmoji=n,e.LunarMonth={ANOMALISTIC:"Anomalistic",DRACONIC:"Draconic",SIDEREAL:"Sidereal",SYNODIC:"Synodic",TROPICAL:"Tropical"},e.LunarPhase=r,e.Moon=v,e.Time=u,e.Unit={EARTH_RADII:"Earth Radii",KILOMETERS:"km",MILES:"m"},Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof t&&typeof n<"u"?i(t):"function"==typeof define&&e.amdO?define(["exports"],i):i((r=typeof globalThis<"u"?globalThis:r||self).LunarPhase={})}));function d(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function f(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function g(e){f(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):(("string"==typeof e||"[object String]"===t)&&typeof console<"u"&&(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function v(e,t){f(2,arguments);var n=g(e).getTime(),r=d(t);return new Date(n+r)}function p(e,t){f(1,arguments);var n=t||{},r=n.locale,i=r&&r.options&&r.options.weekStartsOn,s=null==i?0:d(i),o=null==n.weekStartsOn?s:d(n.weekStartsOn);if(!(o>=0&&o<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var a=g(e),u=a.getDay(),h=(u<o?7:0)+u-o;return a.setDate(a.getDate()-h),a.setHours(0,0,0,0),a}function E(e){return f(1,arguments),p(e,{weekStartsOn:1})}function w(e){f(1,arguments);var t=g(e),n=t.getFullYear(),r=new Date(0);r.setFullYear(n+1,0,4),r.setHours(0,0,0,0);var i=E(r),s=new Date(0);s.setFullYear(n,0,4),s.setHours(0,0,0,0);var o=E(s);return t.getTime()>=i.getTime()?n+1:t.getTime()>=o.getTime()?n:n-1}function N(e){f(1,arguments);var t=w(e),n=new Date(0);n.setFullYear(t,0,4),n.setHours(0,0,0,0);var r=E(n);return r}function y(e){f(1,arguments);var t=g(e);return t.setHours(0,0,0,0),t}function T(e){f(1,arguments);var t=g(e);return t.setSeconds(0,0),t}function D(e){f(1,arguments);var t=g(e),n=t.getDate();return n}function _(e){f(1,arguments);var t=g(e),n=t.getDay();return n}function b(e){f(1,arguments);var t=g(e),n=t.getHours();return n}var I=6048e5;function R(e){f(1,arguments);var t=g(e),n=t.getMonth();return n}function S(e,t){var n,r;f(1,arguments);var i=g(e),s=i.getFullYear(),o=null==t||null===(n=t.locale)||void 0===n||null===(r=n.options)||void 0===r?void 0:r.firstWeekContainsDate,a=null==o?1:d(o),u=null==t?.firstWeekContainsDate?a:d(t.firstWeekContainsDate);if(!(u>=1&&u<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var h=new Date(0);h.setFullYear(s+1,0,u),h.setHours(0,0,0,0);var l=p(h,t),c=new Date(0);c.setFullYear(s,0,u),c.setHours(0,0,0,0);var m=p(c,t);return i.getTime()>=l.getTime()?s+1:i.getTime()>=m.getTime()?s:s-1}function A(e,t){f(1,arguments);var n=t||{},r=n.locale,i=r&&r.options&&r.options.firstWeekContainsDate,s=null==i?1:d(i),o=null==n.firstWeekContainsDate?s:d(n.firstWeekContainsDate),a=S(e,t),u=new Date(0);u.setFullYear(a,0,o),u.setHours(0,0,0,0);var h=p(u,t);return h}var O=6048e5;function C(e){f(1,arguments);var t=g(e);return t.setMinutes(0,0,0),t}var U={element_not_found:"Date Indicator element could not be found.",ones_element_not_found:"Date Indicator Ones element could not be found.",tenths_element_not_found:"Date Indicator Tenths element could not be found.",incompatible_elements:"An id cannot be used at the same time as a split Date display."},k={element_not_found:"Day Indicator element could not be found."},M={element_not_found:"Day Night Indicator element could not be found."},P={element_not_found:"Equation of Time element could not be found."},W={element_not_found:"Foudroyante element could not be found."},H={element_not_found:"Minute Repeater element could not be found."},B={element_not_found:"Month Indicator element could not be found."},L={element_not_found:"Moonphase element could not be found."},G={element_not_found:"Power Reserve element could not be found."},j={element_not_found:"Week Indicator element could not be found."},F={element_not_found:"Year Indicator element could not be found.",year_invalid:"The year value provided to the Year Indicator is invalid."};function Q({element:e,value:t}){let n=e.style.transform.split(" ").filter((e=>!e.startsWith("rotate")));e.style.transform=`${n} rotate(${t}deg)`.trim()}var Y=l(c()),x=l(m());new class{constructor(e){var r,i;this.id=e.id,this.settings={activeClass:null==(r=e.settings)?void 0:r.activeClass,now:(null==(i=e.settings)?void 0:i.date)||new Date},this.date=e.date&&new class{constructor(e,t){this.element=e.id?document.getElementById(e.id):void 0,this.split=e.ones&&e.tenths?{onesElement:document.getElementById(e.ones),tenthsElement:document.getElementById(e.tenths)}:void 0,this.isSplit=!!this.split,this.options=e,this.settings=t,this.hasError=!1,this.errorChecking()}errorChecking(){var e,t,n,r;if(this.hasError=!1,!this.isSplit&&!this.element)throw this.hasError=!0,new Error(U.element_not_found);if(((null==(e=this.split)?void 0:e.onesElement)||(null==(t=this.split)?void 0:t.tenthsElement))&&this.element)throw this.hasError=!0,new Error(U.incompatible_elements);if(this.isSplit&&(null==(n=this.split)||!n.onesElement))throw this.hasError=!0,new Error(U.ones_element_not_found);if(this.isSplit&&(null==(r=this.split)||!r.tenthsElement))throw this.hasError=!0,new Error(U.tenths_element_not_found);return this.hasError}getRotationValue(){let e=(D(this.settings.now)-1)*(360/31);return e*=this.options.reverse?-1:1,e}getSplitRotationValues(){let e=D(this.settings.now),t=e%10*36,n=90*Math.floor(e/10);return t*=this.options.reverse?-1:1,n*=this.options.reverse?-1:1,{ones:t,tenths:n}}init(){var e,t;if(!this.hasError)if(this.isSplit){let n=this.getSplitRotationValues();Q({element:null==(e=this.split)?void 0:e.onesElement,value:n.ones}),Q({element:null==(t=this.split)?void 0:t.tenthsElement,value:n.tenths})}else{let e=this.getRotationValue();Q({element:this.element,value:e})}}}(e.date,this.settings),this.day=e.day&&new class{constructor(e,t){this.day=_(t.now),this.element=document.getElementById(e.id),this.hour=b(t.now),this.offsetHours=e.offsetHours||!1,this.reverse=e.reverse||!1,this.hasError=!1,this.errorChecking()}errorChecking(){if(this.hasError=!1,!this.element)throw this.hasError=!0,new Error(k.element_not_found);return this.hasError}getRotationValue(){let e=51.42857142857143,t=this.day*e;if(this.offsetHours){let n=e/24;t+=this.hour*n}return t*=this.reverse?-1:1,t}init(){if(this.hasError)return;let e=this.getRotationValue();Q({element:this.element,value:e})}}(e.day,this.settings),this.dayNight=e.dayNight&&new class{constructor(e,t){this.element=document.getElementById(e.id),this.hour=b(t.now),this.offsetHours=e.offsetHours||!1,this.reverse=e.reverse||!1,this.hasError=!1,this.errorChecking()}errorChecking(){if(this.hasError=!1,!this.element)throw this.hasError=!0,new Error(M.element_not_found);return this.hasError}getRotationValue(){let e=0,t=0;return this.hour<6?(e=0,t=this.hour-0):this.hour>=6&&this.hour<12?(e=90,t=this.hour-6):this.hour>=12&&this.hour<18?(e=180,t=this.hour-12):(e=270,t=this.hour-18),this.offsetHours&&(e+=15*t),e*=this.reverse?-1:1,e}init(){if(this.hasError)return;let e=this.getRotationValue();Q({element:this.element,value:e})}}(e.dayNight,this.settings),this.eq=e.eq&&new class{constructor(e,t){this.element=document.getElementById(e.id),this.now=t.now,this.eq=this.getEquationOfTime(),this.range=e.range,this.maxIncrement=this.range.max/16,this.minIncrement=this.range.min/14,this.hasError=!1,this.errorChecking()}errorChecking(){if(this.hasError=!1,!this.element)throw this.hasError=!0,new Error(P.element_not_found);return this.hasError}getEquationOfTime(){return(0,Y.equationOfTime)(new Date(this.now))}getRotationValue(){let e=this.eq>0?this.maxIncrement:this.minIncrement;return this.eq*e}init(){this.hasError||this.rotate()}rotate(){if(!this.element)return;let e=this.getRotationValue();Q({element:this.element,value:e})}}(e.eq,this.settings),this.foudroyante=e.foudroyante&&new class{constructor(e){this.currentRotation=0,this.element=document.getElementById(e.id),this.reverse=e.reverse||!1,this.steps=e.steps,this.stepDuration=1e3/this.steps,this.stepRotation=360/this.steps,this.hasError=!1,this.errorChecking()}errorChecking(){if(this.hasError=!1,!this.element)throw this.hasError=!0,new Error(W.element_not_found);return this.hasError}init(){this.hasError||this.startInterview()}clearInterval(){clearInterval(this.interval)}rotate(){!this.element||(Math.abs(this.currentRotation)+this.stepRotation===360?this.currentRotation=0:(this.currentRotation=Math.abs(this.currentRotation)+this.stepRotation,this.currentRotation*=this.reverse?-1:1),Q({element:this.element,value:this.currentRotation}))}startInterview(){this.interval=setInterval((()=>{this.rotate()}),this.stepDuration)}}(e.foudroyante),this.month=e.month&&new class{constructor(e,t){this.date=D(t.now),this.daysInMonth=function(e){f(1,arguments);var t=g(e),n=t.getFullYear(),r=t.getMonth(),i=new Date(0);return i.setFullYear(n,r+1,0),i.setHours(0,0,0,0),i.getDate()}(t.now),this.element=document.getElementById(e.id),this.month=R(t.now),this.offsetDate=e.offsetDate||!1,this.reverse=e.reverse||!1,this.hasError=!1,this.errorChecking()}errorChecking(){if(this.hasError=!1,!this.element)throw this.hasError=!0,new Error(B.element_not_found);return this.hasError}getRotationValue(){let e=30*this.month;if(this.offsetDate){let t=30/this.daysInMonth;e+=this.date*t}return e*=this.reverse?-1:1,e}init(){if(this.hasError)return;let e=this.getRotationValue();Q({element:this.element,value:e})}}(e.month,this.settings),this.moonphase=e.moonphase&&new class{constructor(e,t){this.date=t.now,this.element=document.getElementById(e.id),this.reverse=e.reverse||!1,this.hasError=!1,this.errorChecking()}errorChecking(){if(this.hasError=!1,!this.element)throw this.hasError=!0,new Error(L.element_not_found);return this.hasError}getRotationValue(){let e=x.Moon.lunarPhase(this.date),t=Object.freeze({New:0,"Waxing Crescent":45,"First Quarter":90,"Waxing Gibbous":135,Full:180,"Waning Gibbous":225,"Last Quarter":270,"Waning Crescent":315})[e];return t*=this.reverse?-1:1,t}init(){if(this.hasError)return;let e=this.getRotationValue();Q({element:this.element,value:e})}}(e.moonphase,this.settings),this.repeater=e.repeater&&new class{constructor(e,r){var i,s;this.chimes={audio:{hour:(null==(i=e.chimes)?void 0:i.hour)||t,minute:(null==(s=e.chimes)?void 0:s.minute)||n},counter:1,counts:{hour:0,minute:0,quarter:0},durations:{minute:0},elements:{hour:document.createElement("audio"),minute:document.createElement("audio")}},this.element=document.getElementById(e.id),this.isPlaying=!1,this.isPlayingQuarters=!1,this.options=e,this.now=r.now,this.settings=r,this.hasError=!1,this.errorChecking()}bindEvents(){(function(e,t){let n=e.activeClass||"active";e.element.addEventListener("click",(()=>{t(),e.element.classList.contains(n)||e.element.classList.add(n)})),e.element.addEventListener("transitionend",(()=>{e.element.classList.remove(n)})),e.element.style.cursor="pointer"})({activeClass:this.settings.activeClass,element:this.element},(()=>{var e,t,n,r;this.isPlaying?(this.stopAndResetAllAudio(),null==(t=(e=this.options).onStop)||t.call(e)):(this.isPlaying=!0,this.getChimeCounts(),this.playChimes(),null==(r=(n=this.options).onPlay)||r.call(n))})),this.chimes.elements.minute.addEventListener("loadedmetadata",(()=>this.chimes.durations.minute=this.chimes.elements.minute.duration||0),!1),this.chimes.elements.hour.addEventListener("ended",(()=>{this.isPlayingQuarters?this.playQuarterHours():this.playHours()})),this.chimes.elements.minute.addEventListener("ended",(()=>{!this.isPlayingQuarters&&this.playMinutes()}))}errorChecking(){if(this.hasError=!1,!this.element)throw this.hasError=!0,new Error(H.element_not_found);return this.hasError}getChimeCounts(){let e=b(this.now),t=e>=12?e-12:e,n=function(e){return f(1,arguments),g(e).getMinutes()}(this.now),r={hour:t,quarter:Math.floor(n/15),minute:n%15};return this.chimes.counts=r,r}init(){this.hasError||(this.setupAudioElements(),this.bindEvents())}playChimes(){this.playHours()}playHours(){this.chimes.counter<=this.chimes.counts.hour?(this.chimes.elements.hour.play(),this.chimes.counter++):(this.isPlayingQuarters=!0,this.chimes.counter=1,setTimeout((()=>{this.playQuarterHours()}),this.chimes.counts.quarter?500:1))}playMinutes(){var e,t;this.chimes.counter<=this.chimes.counts.minute?(this.chimes.elements.minute.play(),this.chimes.counter++):(this.stopAndResetAllAudio(),null==(t=(e=this.options).onEnd)||t.call(e))}playQuarterHours(){this.chimes.counter<=this.chimes.counts.quarter?(this.chimes.elements.minute.play(),setTimeout((()=>{this.chimes.elements.hour.play()}),Math.round(1e3*this.chimes.durations.minute)/2),this.chimes.counter++):(this.isPlayingQuarters=!1,this.chimes.counter=1,setTimeout((()=>{this.playMinutes()}),500))}setupAudioElements(){this.chimes.elements.hour.src=this.chimes.audio.hour,document.body.appendChild(this.chimes.elements.hour),this.chimes.elements.minute.src=this.chimes.audio.minute,document.body.appendChild(this.chimes.elements.minute)}stopAndResetAllAudio(){this.isPlaying=!1,this.chimes.counter=1,this.chimes.elements.hour.pause(),this.chimes.elements.hour.currentTime=0,this.chimes.elements.minute.pause(),this.chimes.elements.minute.currentTime=0}}(e.repeater,this.settings),this.reserve=e.reserve&&new class{constructor(e,t){this.currentRotation=e.range.full,this.element=document.getElementById(e.id),this.onEmpty=e.onEmpty,this.range=e.range,this.rate=e.rate||.5,this.windingKey=e.windingKey||"ArrowUp",this.invert=this.range.empty>this.range.full,this.watch=t.parent,this.watchSettings=t.settings,this.hasError=!1,this.errorChecking()}addKeyBindings(){document.addEventListener("keydown",(e=>{e.key===this.windingKey&&this.rotate("increment")}))}errorChecking(){if(this.hasError=!1,!this.element)throw this.hasError=!0,new Error(G.element_not_found);return this.hasError}getRotationValue(e="decrement"){let t=this.currentRotation;return"increment"===e?this.invert?t-this.rate:t+this.rate:this.invert?t+this.rate:t-this.rate}init(){this.hasError||(this.addKeyBindings(),Q({element:this.element,value:this.currentRotation}))}rotate(e="decrement"){var t;let n=this.currentRotation,r=this.getRotationValue(e);"increment"===e?((!this.invert&&this.currentRotation<=this.range.empty||this.invert&&this.currentRotation>=this.range.empty)&&this.watch.startInterval(),(!this.invert&&n+this.rate<=this.range.full||this.invert&&n-this.rate>=this.range.full)&&(this.currentRotation=r,Q({element:this.element,value:r}))):!this.invert&&n-this.rate>=this.range.empty||this.invert&&n+this.rate<=this.range.empty?(this.currentRotation=r,Q({element:this.element,value:r})):(null==(t=this.onEmpty)||t.call(this),this.watch.clearInterval(),this.watchSettings.interval=void 0)}}(e.reserve,{settings:this.settings,parent:this}),this.week=e.week&&new class{constructor(e,t){this.day=e.iso?function(e){f(1,arguments);var t=g(e).getDay();return 0===t&&(t=7),t}(t.now):_(t.now),this.element=document.getElementById(e.id),this.iso=e.iso||!1,this.maxWeeks=this.iso?53:52,this.offsetDays=e.offsetDays||!1,this.reverse=e.reverse||!1,this.week=this.iso?function(e){f(1,arguments);var t=g(e),n=E(t).getTime()-N(t).getTime();return Math.round(n/I)+1}(t.now):function(e,t){f(1,arguments);var n=g(e),r=p(n,t).getTime()-A(n,t).getTime();return Math.round(r/O)+1}(t.now),this.hasError=!1,this.errorChecking()}errorChecking(){if(this.hasError=!1,!this.element)throw this.hasError=!0,new Error(j.element_not_found);return this.hasError}getRotationValue(){let e=360/this.maxWeeks,t=this.week*e;if(this.offsetDays){let n=e/7;t+=this.day*n}return t*=this.reverse?-1:1,t}init(){if(this.hasError)return;let e=this.getRotationValue();Q({element:this.element,value:e})}}(e.week,this.settings),this.year=e.year&&new class{constructor(e,t){this.element=document.getElementById(e.id),this.month=R(t.now),this.offsetMonths=e.offsetMonths||!1,this.reverse=e.reverse||!1,this.year=function(e){return f(1,arguments),g(e).getFullYear()}(t.now),this.hasError=!1,this.errorChecking()}errorChecking(){if(this.hasError=!1,!this.element)throw this.hasError=!0,new Error(F.element_not_found);if(!this.year)throw this.hasError=!0,new Error(F.year_invalid);return this.hasError}getRotationValue(e){if(!this.element)return 0;let t=Object.freeze({1:0,2:90,3:180,4:270})[e];return this.offsetMonths&&(t+=7.5*this.month),t*=this.reverse?-1:1,t}getYearInCycle(e){return e%4==0&&e%100!=0||e%400==0?4:e%4==2&&e%100!=2||e%400==2?2:e%4==3&&e%100!=3||e%400==3?3:1}init(){if(this.hasError)return;let e=this.getYearInCycle(this.year),t=this.getRotationValue(e);Q({element:this.element,value:t})}}(e.year,this.settings)}clearInterval(){var e,t;clearInterval(this.settings.interval),null==(e=this.foudroyante)||e.clearInterval(),null==(t=this.repeater)||t.stopAndResetAllAudio()}startInterval(){this.settings.interval=setInterval((()=>{var e,t,n,r,i,s,o,a,u;let h=this.settings.now;this.settings.now=function(e,t){f(2,arguments);var n=d(t);return v(e,1e3*n)}(h,1),null==(e=this.reserve)||e.rotate("decrement"),function(e,t){f(2,arguments);var n=T(e),r=T(t);return n.getTime()===r.getTime()}(h,this.settings.now)||(this.repeater.now=this.settings.now),function(e,t){f(2,arguments);var n=C(e),r=C(t);return n.getTime()===r.getTime()}(h,this.settings.now)||(null==(t=this.day)||t.init(),null==(n=this.dayNight)||n.init()),function(e,t){f(2,arguments);var n=y(e),r=y(t);return n.getTime()===r.getTime()}(h,this.settings.now)||(null==(r=this.date)||r.init(),null==(i=this.eq)||i.init(),null==(s=this.month)||s.init(),null==(o=this.moonphase)||o.init(),null==(a=this.week)||a.init()),function(e,t){f(2,arguments);var n=g(e),r=g(t);return n.getFullYear()===r.getFullYear()&&n.getMonth()===r.getMonth()}(h,this.settings.now)||null==(u=this.year)||u.init()}),1e3)}start(){var e,t,n,r,i,s,o,a,u,h,l;this.startInterval(),null==(e=this.date)||e.init(),null==(t=this.day)||t.init(),null==(n=this.dayNight)||n.init(),null==(r=this.eq)||r.init(),null==(i=this.foudroyante)||i.init(),null==(s=this.month)||s.init(),null==(o=this.moonphase)||o.init(),null==(a=this.repeater)||a.init(),null==(u=this.reserve)||u.init(),null==(h=this.week)||h.init(),null==(l=this.year)||l.init()}}({id:"demo-watch",date:{ones:"ones-disc",tenths:"tens-disc"}}).start()})();