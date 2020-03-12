cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        
    },

    start() {

    },

    update(dt) {
        // 加边框限制的摄像机跟随
        if (Math.abs(this.target.x - this.node.x) > 40) {
            if ((this.target.x - this.node.x) > 0) {
                this.node.x = this.target.x - 40;
            } else {
                this.node.x = this.target.x + 40;
            }
        };
        if (Math.abs(this.target.y - this.node.y) > 40) {
            if ((this.target.y - this.node.y) > 0) {
                this.node.y = this.target.y - 40;
            } else {
                this.node.y = this.target.y + 40;
            }
        }
    },
});
