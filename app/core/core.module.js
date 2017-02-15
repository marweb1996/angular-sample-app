(function() {
	/* global angular */
	"use strict";

	angular.module('app.core', [
		'ngRoute',
		//'ngSanitize',
		//'app.logger'
		'app.router',
		//'app.dataservice',
		//'angular-growl'
	]).
	config(function($routeProvider, $httpProvider, $logProvider, RouterServiceConfigProvider, $mdDateLocaleProvider) { 
	
		if ($logProvider.debugEnabled) {
			$logProvider.debugEnabled(true);
		}
		
		RouterServiceConfigProvider.config.$routeProvider = $routeProvider;
		RouterServiceConfigProvider.config.docTitle = 'Sample Angular App';
		
		$mdDateLocaleProvider.parseDate = function(dateString) {
			var m = moment(dateString, 'DD.MM.YYYY', true);
			return m.isValid() ? m.toDate() : new Date(NaN);
		};
		
		$mdDateLocaleProvider.formatDate = function(date) {
			var m = moment(date);
			return m.isValid() ? m.format('DD.MM.YYYY') : '';
		};
	});
})();
