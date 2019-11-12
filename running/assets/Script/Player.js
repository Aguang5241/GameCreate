cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onCollisionEnter: function(other, self) {
        if (other.tag == 1) {
            cc.director.pause();
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    },

    start () {

    },

    update (dt) {

    },
});
