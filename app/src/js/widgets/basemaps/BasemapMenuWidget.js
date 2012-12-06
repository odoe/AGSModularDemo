/**
* @author odoe@odoe.net (Rene Rubalcava)
*/
/**
* This is a simple, basic BasemapGallery menu dijit for use with the
* ArcGIS JavaScript API.
* This will create a menu dijit of checkbox items that correspond
* to basemaps in the BasemapGallery dijit.
* Since there is not RadioMenuItem, this dijit will make sure only
* the selected basemap in the menu is checked.
* For reference, see http://help.arcgis.com/EN/webapi/javascript/arcgis/help/jsapi/basemapgallery.htm
*/

/*global window document console define require */
(function() {
  'use strict';
  
  define([
    'dojo/_base/declare',
    'dojo/Evented',
    'dojo/query',
    'dijit/MenuBar',
    'dijit/Menu',
    'dijit/PopupMenuBarItem',
    'dijit/CheckedMenuItem'
    ], function(declare, Evented, query, MenuBar, Menu, PopupMenuBarItem, CheckedMenuItem) {

      /**
      * Basemap Widget to display BasemapGallery items in a menu
      * @constructor
      */
      var BasemapWidget = declare([Evented], {
        _checkeditems: [],

      /**
       * Starts the widget
       * @param {esri.dijit.BasemapGallery} basemapGallery
       * @return {BasemapWidget} returns itself
       */
      startup: function(basemapGallery) {

        var menuBar = new MenuBar({});
        var mapMenu = new Menu({});

        /**
         * I save my items in a local array to iterate
         * and make sure only selected basemap is checked
         **/

        var _this = this;

        var _buildMenu = function(basemap) {
          var item = new CheckedMenuItem({
            label    : basemap.title,
            base     : basemap.id,
            checked  : basemapGallery.basemaps[basemapGallery.basemaps.length-1].id === basemap.id,
            onChange : function(checked) {
              if (checked) basemapGallery.select(basemap.id);
              var i = _this._checkeditems.length;
              while(i--) {
                var item = _this._checkeditems[i];
                item.set('checked', item.base === basemap.id);
              }
            }
          });
          _this._checkeditems[_this._checkeditems.length] = item;
          mapMenu.addChild(item);
        };

        for (var j = 0, len = basemapGallery.basemaps.length; j < len; j++) {
          _buildMenu(basemapGallery.basemaps[j]);
        }

        menuBar.addChild(new PopupMenuBarItem({
          label: '<span class="icon-th-large icon-white"></span> Basemaps',
        popup: mapMenu
        }));

        try {
          menuBar.placeAt(query('.base-menu')[0]);
          menuBar.startup();
          this.emit('loaded');
        } catch(err) {
          console.log('error in placing basemap menu widget', err);
        }

        return this;

      }
      });

      return BasemapWidget;

    });

}).call(this);

