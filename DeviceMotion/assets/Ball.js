cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onActive: function(event) {
        // console.log(event.acc.x);
        // this.speed = event.acc.x;
        // console.log(event.acc.y);
        // this.speed = event.acc.y;
        // console.log(event.acc.z);
        // this.speed = event.acc.z;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 启用加速器事件
        cc.systemEvent.setAccelerometerEnabled(true);
        // 启用重力感应
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onActive, this);
        this.speed = 0;
    },

    start () {
    },
    
    update (dt) {
        // this.node.x += this.speed
        // this.node.y += this.speed
        // this.node.z += this.speed
    },
});
