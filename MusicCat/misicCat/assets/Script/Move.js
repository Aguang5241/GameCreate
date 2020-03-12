cc.Class({
    extends: cc.Component,

    properties: {
        speed: 5,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        
    },

    start() {

    },

    update(dt) {
        this.node.y -= this.speed;
        // if (this.node.y < -640 - 33) { // 33 fithHeight / 2
        //     this.main.recycleFish(this.node);
        // }
    },
});
