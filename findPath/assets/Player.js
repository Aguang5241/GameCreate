cc.Class({
    extends: cc.Component,

    properties: {
        speed: {
            default: 5,
            type: cc.Integer
        },
        nodesList: [cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.nodesPosesList = [];
        for (var i = 0; i < this.nodesList.length; i++) {
            this.nodesPosesList.push(cc.v2(this.nodesList[i].x, this.nodesList[i].y))
        };

        this.index = 0;

        this.node.runAction(cc.sequence(
            cc.moveTo(1, this.nodesPosesList[this.index + 1]),
            cc.moveTo(1, this.nodesPosesList[this.index + 2]),
            cc.moveTo(1, this.nodesPosesList[this.index + 3]),
            cc.moveTo(1, this.nodesPosesList[this.index + 4]),
            cc.moveTo(1, this.nodesPosesList[this.index + 5]),
        ))
    },
    
    start() {
        
    },
    
    update(dt) {

    },
});
