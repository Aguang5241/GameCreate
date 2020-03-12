(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Pipe.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fc122qToQhByr8kag01h1T3', 'Pipe', __filename);
// Scripts/Pipe.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // 小鸟通过管道与否的标志位
        isPassed: false
    },

    // use this for initialization
    onLoad: function onLoad() {},

    init: function init(type) {
        // 设置管道的类型（上或下）
        this.type = type;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Pipe.js.map
        