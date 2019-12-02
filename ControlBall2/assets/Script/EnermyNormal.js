cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;

        this.playerPos = cc.v2(0, 0);
        this.player = this.node.parent.getChildByName('Player');
    },

    start () {

    },

    update (dt) {
        this.playerPos = this.player.getPosition();
        if (this.playerPos.sub(this.node.getPosition()).mag() > 1500) {
            this.generate.onEnemyNormalKilled(this.node);
        }
    },
});
