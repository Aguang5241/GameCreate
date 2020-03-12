cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onCollisionEnter: function(other, self) {
        if (other.tag == 1) {
            this.game.recycleApple(this.node);
            this.game.createApple();
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
    },

    start () {

    },

    update (dt) {
        
    },
});
