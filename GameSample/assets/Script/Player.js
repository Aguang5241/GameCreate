cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 开启物理系统
        cc.director.getPhysicsManager().enabled = true;
        // 初始化重力加速的方向
        this.gravityValue = -320;
        // 添加玩家输入事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onKeyDown: function(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.space:
                this.gravityValue = -this.gravityValue; 
                this.node.runAction(cc.rotateBy(1, 180).easing(cc.easeCubicActionOut()));
                break;
        }
    },

    start() {

    },
    
    update(dt) {
        cc.director.getPhysicsManager().gravity = cc.v2(0, this.gravityValue);
    },
});
