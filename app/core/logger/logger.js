(function() {
    'use strict';

    angular
        .module('app.logger')
        .factory('logger', logger);

    function logger($log, growl) {
        var messages = []


        this.error = function(message, title, data) {
            var growlMessage = growl.error(getArrayAsString(message));
            messages.push(growlMessage);
            $log.error('Error: ' + getArrayAsString(message), (data != undefined) ? data : '');
        };

        this.info = function(message, title, data) {
            growl.info(message);
            $log.info('Info: ' + message, (data != undefined) ? data : '');
        };

        this.success = function(message, title, data) {
            growl.success(message);
            $log.info('Success: ' + message, (data != undefined) ? data : '');
        };

        this.warning = function(message, title, data) {
            growl.warning(message);
            $log.warn('Warning: ' + message, (data != undefined) ? data : '');
        };
        
        this.destroyAllMessages = function() {
            angular.forEach(messages, function(message) {
               message.destroy(); 
            });
        };
        
        function getArrayAsString(array) {
            if( Object.prototype.toString.call( array ) === '[object Object]' ) {
                var retValue = "";
                angular.forEach(array, function(element) {
                    retValue += "- " + element + "<br />";
                });
                return retValue;
            } else {
                if(array != undefined || array != null) {
                    return array;
                } else {
                    return "undefined error";
                }
            }
        }
        
        return this;
    }
}());