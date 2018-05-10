
exports.log = function (val) {
    return function () {
        log (val)
    }
}

exports.getDocument = cocoa.sketch.getSelectedDocument()

exports.showMessage = function (document) {
    return function (msg) {
        return document.showMessage(msg)
    }
}

exports.getSelection = _getSelection()

function _getSelection() {
    var document = cocoa.sketch.getSelectedDocument()
    return document.selectedLayers.layers
}