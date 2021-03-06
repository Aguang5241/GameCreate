cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onBeginContact: function(contact, selfCollider, otherCollider) {
        if (otherCollider.tag == 9) {
            this.anim.play('MedicineBallKilled');

            this.scheduleOnce(function () {
                this.generate.medicineBallKilled(this.node);
            }, 0.5);
        }
    },

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        this.anim = this.node.getComponent(cc.Animation);
    },

    start () {

    },

    // update (dt) {},
});
