/**
 * @author odoe@odoe.net (Rene Rubalcava)
 */
/*global window document console define require */
(function() {
    'use strict';

    define([
        'dojo/_base/declare',
        'dojo/Evented',
        'esri/tasks/query'
        ], function(declare, Evented) {

            var featureSelection = declare([Evented], {
                constructor : function(featureLayer) {
                                 this.featureLayer = featureLayer;
                                 console.log('featureLayer set', this.featureLayer);
                             },

                selectByObjectIds: function(objectIds) {
                                    var query = new esri.tasks.Query();
                                    query.outFields = ['*'];
                                    query.objectIds = objectIds;
                                    var deferred = this.featureLayer.selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW);
                                    var _this = this;
                                    deferred.then(function(features) {
                                        console.log('features selected', features);
                                        _this.emit('featuresSelected', features);
                                    });
                                }

            });
            return featureSelection;

        });

}).call(this);
