cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onCollisionEnter: function(other, self) {
        if (other.tag == 1) {
            cc.director.loadScene('Main');
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    start () {

    },

    // update (dt) {},
});
