
exports.get = function(key) {
    return cocoa.sketch.Settings.settingForKey(key)
}