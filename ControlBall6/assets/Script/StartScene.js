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

    onInfoBtnClick: function() {
        cc.director.loadScene('Info');
    },

    onLoad () {
        this.bgmID = cc.audioEngine.play(this.bgm, true, 1);
        // console.log(this.bgmID); // 0
    },

    start () {

    },

    // update (dt) {},
});
