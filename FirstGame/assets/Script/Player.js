cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    onCollisionEnter: function(other, self) {
        if (other.tag == 1) {
            cc.director.loadScene('End')
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
