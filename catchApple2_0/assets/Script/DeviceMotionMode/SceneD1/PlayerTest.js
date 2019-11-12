cc.Class({
    extends: cc.Component,

    properties: {
        speedSensitivity: 10,        
    },

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },

    onDeviceMotionEvent(event) {
        this.speed = event.acc.x;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.systemEvent.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
        this.speed = 0;
    },

    start() {

    },

    update(dt) {
        this.node.x += this.speed * this.speedSensitivity;
        // 边缘判断
        if (this.node.x > this.node.parent.width / 2 - this.node.width / 2) {
            this.node.x = this.node.parent.width / 2 - this.node.width / 2
        };
        if (this.node.x < -this.node.parent.width / 2 + this.node.width / 2) {
            this.node.x = -this.node.parent.width / 2 + this.node.width / 2
        };
    },
});
