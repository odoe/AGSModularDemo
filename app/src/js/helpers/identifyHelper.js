/**
 * @author odoe@odoe.net (Rene Rubalcava)
 */
/*global window document console define require esri */
(function() {
    'use strict';

    define([
        'dojo/_base/declare',
        'dojo/_base/connect',
        'dojo/_base/Deferred',
        'dojo/DeferredList',
        'helpers/templateBuilder',
        'esri/tasks/identify'
        ], function(declare, connect, Deferred, DeferredList, templateBuilder) {

            /**
             * Utility method to build the infotemplate for a
             * graphic feature displaying all attributes in a table format.
             * @param {esri.tasks.IdentifyResult} result
             */
            var _templateMaker = function(result) {

                var feature = result.feature;
                // assign the layerName to actual graphic
                // to display in the InfoTemplate
                feature.attributes.layerName = result.layerName;
                feature.layerName = result.layerName;
                return templateBuilder.buildInfoTemplate(feature);

            };

            /**
             * Map layers to create an array of IdentifyTasks
             * @param {Array} layers
             * @return {Array}
             */
            var _tasksMap = function(layers) {

                var _tasks = [];
                for (var i = 0, len = layers.length; i < len; i++) {
                    var task = new esri.tasks.IdentifyTask(layers[i].url);
                    task.identifyLayers = layers[i].identifyLayers; // append the identify layers from config to task
                    _tasks[_tasks.length] = task;
                }
                return _tasks;

            };

            /**
             * Map tasks to create an Array of Deffered objects
             * @param {Array} tasks
             * @return {Array}
             */
            var _deferredTasks = function(tasks) {

                var _deferreds = [];
                for (var i = 0, len = tasks.length; i < len; i++) {
                    _deferreds[_deferreds.length] = new Deferred();
                }
                return _deferreds;

            };

            var IdentifyHelper = declare([], {

                /**
                 * Handles the identify functions of a map 'onClick' event
                 * @param {esri.Map} map
                 * @param {Array} layers
                 */
                identifyHandler: function(map, layers) {

                                     var idParams = new esri.tasks.IdentifyParameters();
                                     idParams.tolerance = 3;
                                     idParams.returnGeometry = true;
                                     idParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_ALL;

                                     /**
                                      * Callback method to handle deferred response.
                                      * @return {Array} Array of mapped features.
                                      */
                                     var _callback = function(r) {

                                         var results = [];

                                         for (var j = 0, len_ = r.length; j < len_; j++) {
                                             if (r[j][0]) results = results.concat(r[j][1]);
                                         }

                                         for (var i = 0, len__ = results.length; i < len__; i++) {
                                             results[i] = _templateMaker(results[i]);
                                         }

                                         if (results.length === 0) {
                                             map.infoWindow.clearFeatures();
                                         } else {
                                             map.infoWindow.setFeatures(results);
                                         }
                                         map.infoWindow.show(idParams.geometry);
                                         return results;

                                     };

                                     connect.connect(map, 'onClick', function(evt) {

                                         var tasks = _tasksMap(layers);
                                         var deferredTasks = _deferredTasks(tasks);
                                         var defListTasks = new DeferredList(deferredTasks);
                                         defListTasks.then(_callback);

                                         idParams.geometry = evt.mapPoint;
                                         idParams.mapExtent = map.extent;
                                         idParams.width = map.width;
                                         idParams.height = map.height;


                                         for (var i = 0, len = tasks.length; i < len; i++) {
                                             try {
                                                 idParams.layerIds = tasks[i].identifyLayers; // use the identify layers described in config
                                                 var handle = tasks[i].execute(idParams, deferredTasks[i].callback, deferredTasks[i].errback);
                                             } catch(e) {
                                                 console.log(e);
                                                 deferredTasks[i].errback(e);
                                             }
                                         }

                                     });

                                 }

            });

            return IdentifyHelper;

        });

}).call(this);
