cc.Class({
    extends: cc.Component,

    properties: {
        maxSpeed: 300,
        score: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.tag == 1) {
            this.scoreValue += 1;
            this.score.string = "Score: " + this.scoreValue;

            this.anim.play();

            // 0.1秒后回收预制节点，保证先碰撞，后回收
            this.scheduleOnce(function() {
                this.generate.onEnemyNormalKilled(otherCollider.node);
            }, 0.1);

            // 冻结速度
            this.rbody.linearVelocity = this.rbody.linearVelocity.mul(1 / 15);
            this.control.controlActive = true;
            this.control.zoom = true;
        };

    },

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        this.rbody = this.node.getComponent(cc.RigidBody);

        this.speed = cc.v2(0, 0);

        this.anim = this.node.getComponent(cc.Animation);

        this.scoreValue = 0
    },

    start() {

    },

    update(dt) {
        this.speed = this.rbody.linearVelocity;
        // 限制最大线速度
        if (this.speed.mag() > this.maxSpeed) {
            this.rbody.linearVelocity = this.speed.normalize().mul(this.maxSpeed);
        }
    },
});
