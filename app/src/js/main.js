/**
* @author odoe@odoe.net (Rene Rubalcava)
*/
/*global define require console esri location */
(function() {
  'use strict';

  require({
    async: true,
    parseOnLoad: true,
    aliases: [["text", "dojo/text"]],
    packages: [
      {
        name: "templates",
        location: location.pathname.replace(/\/[^/]+$/, "") + "templates"
      }, {
        name: "views",
        location: location.pathname.replace(/\/[^/]+$/, "") + "js/views"
      }, {
        name: "models",
        location: location.pathname.replace(/\/[^/]+$/, "") + "js/models"
      }, {
        name: "helpers",
        location: location.pathname.replace(/\/[^/]+$/, "") + "js/helpers"
      }, {
        name: "widgets",
        location: location.pathname.replace(/\/[^/]+$/, "") + "js/widgets"
      }, {
        name: "app",
        location: location.pathname.replace(/\/[^/]+$/, "") + "js",
        main: "app"
      }
    ]
  });

  require(['app', 'dojo/ready', 'helpers/shim'], function(App, ready) {

      ready(function() {

          App.initialize();

      });

  });

}).call(this);
