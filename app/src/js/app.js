/**
 * @author odoe@odoe.net (Rene Rubalcava)
 */
/*global define */
(function() {
    'use strict';

    define(['views/ViewManager'], function(VM) {
        var initialize;
        initialize = function() {
            var vm;
            vm = new VM();
            vm.render();
        };

        // pass the init function as an object
        return {
            initialize: initialize
        };
    });

}).call(this);
