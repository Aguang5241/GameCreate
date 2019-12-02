cc.Class({
    extends: cc.Component,

    properties: {
        minSpeed: cc.v2(-500, -500),
        maxSpeed: cc.v2(500, 500),
    },

    // LIFE-CYCLE CALLBACKS:

    onBeginContact: function (contact, selfCollider, otherCollider) {
        // 0.1秒后回收预制节点，保证先碰撞，后回收
        this.scheduleOnce(function() {
            this.generate.onEnemyNormalKilled(otherCollider.node);
        }, 0.1);
    },

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        this.rbody = this.node.getComponent(cc.RigidBody);
        this.speed = cc.v2(0, 0);
    },

    start() {

    },

    update(dt) {
        this.speed = this.rbody.linearVelocity;
        // 限制最大线速度
        this.rbody.linearVelocity = this.speed.clampf(this.minSpeed, this.maxSpeed);
    },
});
