var purs = require("./plugin_bundle")
var sketch = require("sketch")
var sketchDom = require("sketch/dom")
var Document = require("sketch/dom").Document

exports.test = function() {
  purs.main()
}

exports.api = function() {
  // var myDoc = sketchDom.getSelectedDocument()
  // log (myDoc.getLayerWithID("C7D70841-5229-4717-A84D-491BE4F55C03").id)
  // var doc = Document.getSelectedDocument()
  // var selectedLayers = doc.selectedLayers
  // log (selectedLayers.layers.map(function(layer) {
  //   return sketchDom.fromNative(layer._object)
  // }))
}