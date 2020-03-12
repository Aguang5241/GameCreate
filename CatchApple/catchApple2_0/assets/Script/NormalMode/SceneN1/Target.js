cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onCollisionEnter: function(other, self) {
        if (other.tag == 1) {
            this.main.onTargetKilled(this.node);
            this.main.createTarget();
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
    },

    start () {

    },

    // update (dt) {},
});
