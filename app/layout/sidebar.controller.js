(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('SidebarController', SidebarController);

    function SidebarController($rootScope, $route, RouterService, $scope, $location, $mdSidenav) {
        /*jshint validthis: true */
        var vm = this;
        vm.routes = [];
        vm.isCurrent = isCurrent;
        vm.routerService = RouterService;
		
		vm.toggleLeft = buildToggler('left');
		function buildToggler(componentId) {
		  return function() {
			$mdSidenav(componentId).toggle();
		  }
		}
        
        watchCurrentRoute();
        
        function watchCurrentRoute() {
            $rootScope.$watch(function(){return $route.current;}, function(current) {
                vm.routes = RouterService.getNavRoutes();
            });
        }
        
        function isCurrent(route) {
            if (!route.title || !$route.current || !$route.current.title) {
                return false;
            }
            var menuName = route.title;
            return $route.current.title.substr(0, menuName.length) === menuName ? true : false;
        }
    }
})();