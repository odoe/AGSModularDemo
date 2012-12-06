/**
* @author odoe@odoe.net (Rene Rubalcava)
*/
/*global console define */
(function() {
  'use strict';

  define([
    'dojo/_base/declare',
    'views/map/MapView',
    'widgets/basemaps/BasemapMenuWidget',
    'widgets/legendtoc/LegendMenuWidget',
    'dojo/domReady!'
    ], function(declare, MapView, BasemapMenuWidget, LegendMenuWidget) {

      /**
       * ViewManager Controller that handles what widgets are added to application
       * @constructor
       */
      var VM = declare([], {

      /**
       * Render function that will start viewable items
       * @return {ViewManager} Returns itself
       */
      render: function () {

                  var mapView = new MapView();
                  mapView.on('mapIsReady',function(result) {

                      var basemaps = new BasemapMenuWidget();
                      basemaps.startup(result.bmg);

                      if (result.operational.length > 0) {
                          var legendMenu = new LegendMenuWidget();
                          legendMenu.startup(result.operational);
                      }

                  });

                  mapView.render();

                  return this;
              }
      });
      return VM;

    });

}).call(this);
