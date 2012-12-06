/**
 * @author odoe@odoe.net (Rene Rubalcava)
 */
/*global console window define require esri */
(function() {
    'use strict';

    define([
        'dojo/_base/declare',
        'dojo/_base/connect',
        'dojo/Evented',
        'helpers/extentFactory',
        'helpers/popupHelper',
        'helpers/symbolHelper',
        'helpers/IdentifyHelper',
        'esri/dijit/BasemapGallery',
        'esri/layers/osm'
        ], function(declare, connect, Evented, extents, popup, symbols, IdentifyHelper, BasemapGallery) {

            /**
             * Map View Controller
             * @constructor
             */

            var MapView = declare([Evented], {

                map: null,
                /**
                * Container for connect handlers
                * @type Array.<Function>
                * @private
                */
                _handlers: [],

                /**
                * Will start the map and load layers.
                * @return {MapView} returns itself.
                */
                render: function () {

                    var ext = extents.losAngeles();
                    this.map = new esri.Map('map',{
                        infoWindow: popup.create(),
                        extent: ext
                    });

                    var osm = new esri.layers.OpenStreetMapLayer();

                    var url = 'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer';
                    var censusLayer = new esri.layers.ArcGISDynamicMapServiceLayer(url, {
                        id: 'censusLayer'
                    });

                    censusLayer.title = 'Census Data';

                    // I am adding this little array here for my identify tool
                    censusLayer.identifyLayers = [1,3,4,5];

                    var _operational = [];

                    var _this = this;
                    var handle = connect.connect(this.map, 'onLayersAddResult', function (results) {
                        connect.disconnect(handle);

                        var _results = [], i = results.length;
                        while(i--) {
                            if (typeof(results[i].error) === 'undefined') {
                                _results[_results.length] = results[i];
                            }
                        }

                        if (censusLayer.loaded) { // just double checking that the layer is ready

                            _operational[_operational.length] = censusLayer; // using the array so I can add more later if needed

                            var idHelper = new IdentifyHelper();
                            idHelper.identifyHandler(_this.map, _operational);

                        }

                        var bmg = new BasemapGallery({
                            showArcGISBasemaps: true,
                            map: _this.map
                        });

                        var _handle = connect.connect(bmg, 'onLoad', function() {
                            connect.disconnect(_handle);

                            bmg.select(bmg.basemaps[bmg.basemaps.length-1].id);
                            _this.emit('mapIsReady', {
                                map: _this.map,
                                layers: _results,
                                operational: _operational,
                                bmg: bmg
                            });
                        });

                    });

                    var _lyrs = [osm, censusLayer];

                    this.map.addLayers(_lyrs);

                    this._handlers[this._handlers.length] = connect.connect(window, 'resize', function() {
                        _this.map.resize();
                    });

                    return this;
                }
            });

            return MapView;

        });

}).call(this);

