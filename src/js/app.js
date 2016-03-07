(function () {

   var arrDependencies;

   arrDependencies = [
      'widgetCore',
      'widgetCore.translate',
      'ngAnimate'
   ];

   (function ($app) {
      'use strict';
      return $app;
   })(angular.module('leagueWidget', arrDependencies));
}).call(this);
