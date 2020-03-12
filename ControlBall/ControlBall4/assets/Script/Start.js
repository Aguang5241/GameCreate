cc.Class({
    extends: cc.Component,

    properties: {
        bgm: {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onStartBtnClick: function() {
        cc.director.loadScene('Main');
    },

    onLoad () {
        cc.audioEngine.play(this.bgm, true, 1);
    },

    start () {

    },

    // update (dt) {},
});
