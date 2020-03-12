cc.Class({
    extends: cc.Component,

    properties: {

    },

    onCollisionEnter: function (other, self) {
        if (other.tag == 1) {
            this.main.onBallKilled(this.node);
            this.main.createBall();
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 开启物理系统
        cc.director.getPhysicsManager().enabled = true;
        // 开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
    },

    start() {

    },

    update(dt) {

    },
});
