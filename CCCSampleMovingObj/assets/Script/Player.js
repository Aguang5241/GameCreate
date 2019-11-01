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
        speedValue: 0
    },

    // LIFE-CYCLE CALLBACKS:

    // 此阶段进行一些初始化相关的操作
    onLoad: function () {
        // 开启事件监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        // 初始化位置为当前所在位置
        this.posX = this.node.x;
        this.posY = this.node.y;
        // 初始化速度
        this.speedX = 0;
        this.speedY = 0;
    },

    // 此阶段在被调用后在帧结束时统一回收组件
    onDestroy: function () {
        // 关闭事件监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.speedX = -this.speedValue;
                break;
            case cc.macro.KEY.d:
                this.speedX = this.speedValue;
                break;
            case cc.macro.KEY.w:
                this.speedY = this.speedValue;
                break;
            case cc.macro.KEY.s:
                this.speedY = -this.speedValue;
                break;
        }
    },

    onKeyUp: function (event) {
        this.speedX = 0;
        this.speedY = 0;
    },

    // 用以初始化一些中间状态的数据，这些数据可能在update时频繁发生变化
    start: function () {

    },

    // 每一帧渲染前更新物体的行为、状态和方向
    update: function (dt) {
        this.posX += this.speedX;
        this.posY += this.speedY;
        this.node.x = this.posX;
        this.node.y = this.posY;
    },
});
