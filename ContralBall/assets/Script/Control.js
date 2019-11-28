cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Node
        },
        Arrow: {
            default: null,
            type: cc.Node
        },
        maxArrowLength: 300,
        minArrowLength: 50,
    },

    // LIFE-CYCLE CALLBACKS:

    getRotation: function () {
        var rotation;
        if (this.movePos.y - this.startPos.y > 0) {
            rotation = Math.acos((this.startPos.x - this.movePos.x) / (this.startPos.sub(this.movePos).mag())) * (180 / Math.PI);
        } else {
            rotation = -Math.acos((this.startPos.x - this.movePos.x) / (this.startPos.sub(this.movePos).mag())) * (180 / Math.PI);
        };
        rotation += 180;
        return rotation;
    },

    // 在触摸开始的时候冻结一切物体，进入蓄力状态
    touchStart: function (event) {
        this.startPos = cc.v2(event.getLocation());
        this.Arrow.active = true;
    },

    // 在触摸移动的时候赋予目标移动方向与移动速度
    // 移动方向：由触摸移动点坐标指向触摸开始点坐标
    // 移动速度大小：触摸移动点坐标到触摸开始点坐标的距离大小
    touchMove: function (event) {
        this.movePos = cc.v2(event.getLocation());

        // 设置箭头的旋转及长度
        if (this.Arrow.width <= this.maxArrowLength && this.Arrow.width >= this.minArrowLength) {
            this.Arrow.width = this.movePos.sub(this.startPos).mag() + this.minArrowLength;
        };
        this.Arrow.rotation = this.getRotation();
    },
    
    // 触摸结束释放目标（屏幕内）
    touchEnd: function (event) {
        this.Arrow.active = false;
        this.Arrow.width = this.minArrowLength;
        this.endPos = cc.v2(event.getLocation());

        // 赋予刚体目标一个力（在一定范围之内）
        this.force = this.startPos.sub(this.endPos).clampf(cc.v2(-this.maxArrowLength, -this.maxArrowLength), cc.v2(this.maxArrowLength, this.maxArrowLength));
        this.rbody.applyForceToCenter(this.force.mul(300));
    },

    // 触摸结束释放目标（屏幕外）
    touchCancel: function (event) {
        this.Arrow.active = false;
        this.Arrow.width = this.minArrowLength;
    },

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);

        // 初始状态弓箭不显示，且长度为0
        this.Arrow.active = false;
        this.Arrow.width = this.minArrowLength;
        // 触摸开始点坐标
        this.startPos = cc.v2(0, 0);
        // 触摸移动点坐标
        this.movePos = cc.v2(0, 0);
        // 触摸点结束的坐标
        this.endPos = cc.v2(0, 0);
        // 施加力以及最大施加力的大小
        this.force = cc.v2(0, 0);
        // 获得目标刚体
        this.rbody = this.target.getComponent(cc.RigidBody);
    },

    start() {

    },

    // update (dt) {},
});
