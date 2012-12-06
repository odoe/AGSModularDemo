/**
* @author odoe@odoe.net (Rene Rubalcava)
*/
/*global window document console define require esri */
(function() {
  'use strict';

  define([], function() {

    /** @const */ var DOC_URL = 'http://dmxlink1p/cyberdocs/quickstart.asp?altentry=Y&show=VIEW:';

    var _builder = {};

    /**
     * Utility method to build the infotemplate for a
     * graphic feature displaying all attributes in a table format.
     * @param {esri.Graphic} feature Graphic to set infoTemplate.
     * @return {esri.Graphic} Graphic with infoTemplate set.
     */
    _builder.buildInfoTemplate = function(feature) {

      // get the dom element for my infotemplate as a string
      var content = [];
      //var content = '<table cellspacing="0" class="table table-striped table-condensed attr-info">';
      content[content.length] = '<table cellspacing="0" class="table table-striped table-condensed attr-info">';
      if (feature.layerName) {
          content[content.length] = '<tr><td class="fieldName">SOURCE: </td><td class="fieldName">' + feature.layerName + '</td></tr>';
      }
      /**
       * Iterate over attributes to get field names.
       * Ignore certain fields not needing to be displayed
       * Order matters, so loop forward over keys.
       **/
      var keys = Object.keys(feature.attributes);
      
      for (var i = 0, len = keys.length; i < len; i++) {
        var _key = keys[i].toLowerCase();
        if (!(_key.indexOf('shape') > -1 ||
            _key === 'layername'||
            _key === 'objectid' ||
            _key === 'fid')) {
          var name = keys[i];
          // Checking for DOCID, this is a URL field used internally only.
          if (name.toLowerCase() !== 'docid') {
            content[content.length]= '<tr><td class="fieldName">' + name + '</td><td>${' + name + '}</td></tr>';
          } else {
            content[content.length] = '<tr><td class="fieldName">' + name + '</td><td><a href="' + DOC_URL + '">${' + name + '}</a></td></tr>';
          }
        }
      }
      content[content.length] = '</table>';

      // now set the template
      var template = new esri.InfoTemplate('', content.join(''));
      feature.setInfoTemplate(template);

      return feature;

    };

    return _builder;

  });

}).call(this);

