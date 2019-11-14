cc.Class({
    extends: cc.Component,

    properties: {
        // music: {
        //     default: null,
        //     type: cc.AudioClip
        // }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // this.current = cc.audioEngine.playMusic(this.music, false, 1);
    },

    onDestroy() {
        // cc.audioEngine.stop(this.current);
    },

    start() {

    },

    // update (dt) {},
});
