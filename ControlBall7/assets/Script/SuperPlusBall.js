cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    init: function() {
        this.anim.stop();
        this.node.opacity = 255;
        this.anim.play();
    },

    onBeginContact: function(contact, selfCollider, otherCollider) {
        if (otherCollider.tag == 9) {
            this.anim.play('SuperPlusKilled');

            this.scheduleOnce(function () {
                this.generate.superPlusBallKilled(this.node);
            }, 0.6);
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
