(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ToolbarController', ToolbarController);

    function ToolbarController($mdSidenav) {
        /*jshint validthis: true */
        var vm = this;
        
        vm.toggleLeft = buildToggler('left');
		function buildToggler(componentId) {
		  return function() {
			$mdSidenav(componentId).toggle();
		  }
		}
    }
})();