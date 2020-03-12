cc.Class({
    extends: cc.Component,

    properties: {
        audio: {
            default: null,
            type: cc.AudioClip
        }
    },

    onCollisionEnter: function(other, self) {
        if (other.tag == 1) {
            cc.audioEngine.play(this.audio);
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    },

    start () {

    },

    // update (dt) {},
});
