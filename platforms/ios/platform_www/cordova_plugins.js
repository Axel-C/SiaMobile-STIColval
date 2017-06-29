cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-console.console",
        "file": "plugins/cordova-plugin-console/www/console-via-logger.js",
        "pluginId": "cordova-plugin-console",
        "clobbers": [
            "console"
        ]
    },
    {
        "id": "cordova-plugin-console.logger",
        "file": "plugins/cordova-plugin-console/www/logger.js",
        "pluginId": "cordova-plugin-console",
        "clobbers": [
            "cordova.logger"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-ms-adal.utility",
        "file": "plugins/cordova-plugin-ms-adal/www/utility.js",
        "pluginId": "cordova-plugin-ms-adal",
        "runs": true
    },
    {
        "id": "cordova-plugin-ms-adal.AuthenticationContext",
        "file": "plugins/cordova-plugin-ms-adal/www/AuthenticationContext.js",
        "pluginId": "cordova-plugin-ms-adal",
        "clobbers": [
            "Microsoft.ADAL.AuthenticationContext"
        ]
    },
    {
        "id": "cordova-plugin-ms-adal.CordovaBridge",
        "file": "plugins/cordova-plugin-ms-adal/www/CordovaBridge.js",
        "pluginId": "cordova-plugin-ms-adal"
    },
    {
        "id": "cordova-plugin-ms-adal.AuthenticationResult",
        "file": "plugins/cordova-plugin-ms-adal/www/AuthenticationResult.js",
        "pluginId": "cordova-plugin-ms-adal"
    },
    {
        "id": "cordova-plugin-ms-adal.TokenCache",
        "file": "plugins/cordova-plugin-ms-adal/www/TokenCache.js",
        "pluginId": "cordova-plugin-ms-adal"
    },
    {
        "id": "cordova-plugin-ms-adal.TokenCacheItem",
        "file": "plugins/cordova-plugin-ms-adal/www/TokenCacheItem.js",
        "pluginId": "cordova-plugin-ms-adal"
    },
    {
        "id": "cordova-plugin-ms-adal.UserInfo",
        "file": "plugins/cordova-plugin-ms-adal/www/UserInfo.js",
        "pluginId": "cordova-plugin-ms-adal"
    },
    {
        "id": "cordova-plugin-ms-adal.LogItem",
        "file": "plugins/cordova-plugin-ms-adal/www/LogItem.js",
        "pluginId": "cordova-plugin-ms-adal"
    },
    {
        "id": "cordova-plugin-ms-adal.AuthenticationSettings",
        "file": "plugins/cordova-plugin-ms-adal/www/AuthenticationSettings.js",
        "pluginId": "cordova-plugin-ms-adal",
        "clobbers": [
            "Microsoft.ADAL.AuthenticationSettings"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "ionic-plugin-keyboard.keyboard",
        "file": "plugins/ionic-plugin-keyboard/www/ios/keyboard.js",
        "pluginId": "ionic-plugin-keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ],
        "runs": true
    },
    {
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-compat": "1.1.0",
    "cordova-plugin-console": "1.0.5",
    "cordova-plugin-device": "1.1.4",
    "cordova-plugin-ms-adal": "0.10.0",
    "cordova-plugin-splashscreen": "4.0.2",
    "cordova-plugin-statusbar": "2.2.1",
    "cordova-plugin-whitelist": "1.3.1",
    "ionic-plugin-keyboard": "2.2.1",
    "cordova-plugin-inappbrowser": "1.7.1"
};
// BOTTOM OF METADATA
});