"use strict";
cc._RFpush(module, 'dba40+MKV5FjpALbo9uDYLc', 'Bird');
// Scripts\Bird.js

cc.Class({
    'extends': cc.Component,

    properties: {
        // 小鸟重力值
        gravity: 0.5,
        // 小鸟弹跳值
        birdJump: 6.6,
        // 动画名称
        AnimName: '',
        // 弹跳音效
        jumpAudio: {
            'default': null,
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

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();