(function() {
    'use strict';

    angular
        .module('app.router')
        .provider('RouterServiceConfig', RouterServiceConfig)
        .factory('RouterService', RouterService);

    // Must configure via the routerConfigProvider
    function RouterServiceConfig() {
        /* jshint validthis:true */
        this.config = {
            // These are the properties we need to set
            // $routeProvider: undefined
            // docTitle: ''
            // resolveAlways: {ready: function(){ } }
        };

        this.$get = function() {
            return {
                config: this.config
            };
        };
    }

    function RouterService($location, $rootScope, $route, RouterServiceConfig) {
        var handlingRouteChangeError = false;
        var routeCounts = {
            errors: 0,
            changes: 0
        };
        var currentRoute = {};
        var routes = [];
        var $routeProvider = RouterServiceConfig.config.$routeProvider;

        var service = {
            configureRoutes: configureRoutes,
            getNavRoutes: getNavRoutes,
            routeCounts: routeCounts,
            getCurrentRoute: getCurrentRoute,
            isCurrent: isCurrent
        };

        init();

        return service;
        ///////////////

        function configureRoutes(routes) {
            routes.forEach(function(route) {
                $routeProvider.when(route.url, route.config);
            });
            $routeProvider.otherwise({redirectTo: '/'});
        }

        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$routeChangeError',
                function(event, current, previous, rejection) {
                    if (handlingRouteChangeError) {
                        return;
                    }
                    routeCounts.errors++;
                    handlingRouteChangeError = true;
                    var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
                        'unknown target';
                    var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
                    $location.path('/');
                }
            );
        }

        function init() {
            handleRoutingErrors();
            updateDocTitle();
        }

        function getRoutes() {
            routes = [];
            for (var prop in $route.routes) {
                if ($route.routes.hasOwnProperty(prop)) {
                    var route = $route.routes[prop];
                    var isRoute = !!route.title;
                    if (isRoute && route.settings.module == $route.current.settings.module || isRoute && route.settings.module == '' || isRoute && route.settings.isModuleBase == true) {
                        routes.push(route);
                    }
                }
            }
            return routes;
        }
        
        function getNavRoutes() {
            return getRoutes();
        };

        function updateDocTitle() {
            $rootScope.$on('$routeChangeSuccess',
                function(event, current, previous) {
                    routeCounts.changes++;
                    handlingRouteChangeError = false;
                    var title = RouterServiceConfig.config.docTitle + ' | ' + (current.title || '');
                    currentRoute = current
                    $rootScope.title = title;
                }
            );
        }
        
        function updateRouteTitle(title, newTitle) {
            angular.forEach(routes, function(element, key) {
                if(element.title == title) {
                    routes[key].title = newTitle;
                }
            });
        }
        
        function isCurrent(route) {
            if(route.title == currentRoute.title) {
                return true;
            } else {
                return false;
            }
        }
        
        function getCurrentRoute() {
            return currentRoute;
        }
    }
})();