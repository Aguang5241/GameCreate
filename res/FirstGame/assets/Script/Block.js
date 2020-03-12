// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onTouchStart: function (event) {
        this.node.runAction(cc.moveBy(0.2, cc.v2(0, this.game.player.width * 3)));
    },
    
    // LIFE-CYCLE CALLBACKS:
    
    onLoad () {
        this.node.parent.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    },
    
    start () {
        
    },
    
    update (dt) {
        // if (this.node.y > this.game.player.width * 9) {
        //     this.game.recycleBlock(this.node);
        // }
    },
});
