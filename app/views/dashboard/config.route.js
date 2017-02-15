(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    /* @ngInject */
    function appRun(RouterService) {
        RouterService.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/views/dashboard/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: 'vm',
                    title: 'Dashboard',
                    settings: {
                        nav: 1,
                        module: '',
                        isModuleBase: false,
                        isSubMenu: false
                    }
                }
            }
        ];
    }
})();