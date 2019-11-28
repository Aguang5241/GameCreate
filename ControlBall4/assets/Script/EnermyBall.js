cc.Class({
    extends: cc.Component,

    properties: {
        minTraceDistance: 200,
    },

    // LIFE-CYCLE CALLBACKS:

    onBeginContact: function(contact, selfCollider, otherCollider) {
        if (otherCollider.tag == 9) {
            this.anim.play('EnermyBallKilled');

            this.scheduleOnce(function () {
                this.generate.enermyBallKilled(this.node);
            }, 0.5);
        }
    },

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;

        this.target = this.node.parent.getChildByName('Player');

        this.anim = this.node.getComponent(cc.Animation);

        this.enermyPos = cc.v2(0, 0);
        this.targetPos = cc.v2(0, 0);
    },

    start() {

    },

    update(dt) {
        this.enermyPos = this.node.getPosition();
        this.targetPos = this.target.getPosition();
        if (this.enermyPos.sub(this.targetPos).mag() <= this.minTraceDistance) {
            this.node.runAction(cc.moveTo(3, this.targetPos));
        };

        // 检测超出一定范围销毁旧的节点并生成新的节点
        if (Math.abs(this.node.x) > 3000 || Math.abs(this.node.y) > 4000) {
            this.generate.enermyBallKilled(this.node);
        };
    },
});
