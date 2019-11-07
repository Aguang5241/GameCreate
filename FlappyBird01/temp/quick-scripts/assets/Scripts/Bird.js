(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Bird.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dba40+MKV5FjpALbo9uDYLc', 'Bird', __filename);
// Scripts/Bird.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // 小鸟重力值
        gravity: 0.5,
        // 小鸟弹跳值
        birdJump: 6.6,
        // 动画名称
        AnimName: '',
        // 弹跳音效
        jumpAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        // 获取本身的cc.Animation对象，并播放AnimName动画
        this.getComponent(cc.Animation).play(this.AnimName);
        // 初始化速度为0
        this.velocity = 0;
    },

    onStartDrop: function onStartDrop() {
        this.schedule(this.onDrop, 0.01);
    },

    onDrop: function onDrop() {
        this.node.y += this.velocity;
        this.velocity -= this.gravity;
    },

    onJump: function onJump() {
        // 弹跳时，重设向上的速度
        this.velocity = this.birdJump;
        // 播放弹跳音效
        cc.audioEngine.playEffect(this.jumpAudio, false);
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
        //# sourceMappingURL=Bird.js.map
        