cc.Class({
    extends: cc.Component,

    properties: {
        player: {
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
        return rotation;
    },

    // 在触摸开始的时候冻结一切物体，进入蓄力状态
    touchStart: function (event) {
        this.startPos = cc.v2(event.getLocation());
    },

    // 在触摸移动的时候赋予目标移动方向与移动速度
    // 移动方向：由触摸移动点坐标指向触摸开始点坐标
    // 移动速度大小：触摸移动点坐标到触摸开始点坐标的距离大小
    touchMove: function (event) {
        this.movePos = cc.v2(event.getLocation());

        // 设置箭头的旋转及长度
        if (this.controlActive) {
            if (this.Arrow.width <= this.maxArrowLength && this.Arrow.width >= this.minArrowLength) {
                this.Arrow.width = this.movePos.sub(this.startPos).mag() + this.minArrowLength;
            };
            this.Arrow.rotation = this.getRotation();
        }
    },

    // 触摸结束释放目标（屏幕内）
    touchEnd: function (event) {
        this.Arrow.active = false;
        this.Arrow.width = this.minArrowLength;
        this.endPos = cc.v2(event.getLocation());

        this.anim.stop();
        
        // 赋予刚体目标一个冲量（在一定范围之内）
        if (this.controlActive) {
            // 将之前的速度重置
            this.rbody.linearVelocity = cc.v2(0, 0);
            this.force = this.endPos.sub(this.startPos);
            if (this.force.equals(cc.v2(0, 0))) { // 倘若附加冲量为0，则随机生成
                while(true) {
                    this.force = cc.v2(Math.ceil(Math.random() * 10 - 5), Math.ceil(Math.random() * 10 - 5));
                    if (this.force != cc.v2(0, 0)) {
                        break
                    }
                };
                this.rbody.applyLinearImpulse(this.force.mul(0.5), this.playerPos);
            } else {
                this.rbody.applyLinearImpulse(this.force.mul(0.5), this.playerPos);
            }

            // 恢复刚体的速度
            this.rbody.linearVelocity = this.rbody.linearVelocity.mul(20);
            this.speedBackToNormal = true;

            this.controlActive = false;
        }
    },

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);

        // 初始状态弓箭显示
        this.Arrow.active = true;
        this.Arrow.width = this.minArrowLength;
        // 触摸开始点坐标
        this.startPos = cc.v2(0, 0);
        // 触摸移动点坐标
        this.movePos = cc.v2(0, 0);
        // 触摸点结束的坐标
        this.endPos = cc.v2(0, 0);
        // 施加力以及最大施加力的大小
        this.force = cc.v2(0, 0);
        // 实时获取player节点位置
        this.playerPos = cc.v2(0, 0);
        // 获得目标刚体并在player组件中寄存this
        this.rbody = this.player.getComponent(cc.RigidBody);
        this.player.getComponent('Player').control = this;
        // 获得摄像机来控制摄像机缩放
        this.camera = this.node.getComponent(cc.Camera);
        // 初始化能否操纵
        this.controlActive = true;
        // 获取动画租金按
        this.anim = this.player.getComponent(cc.Animation);
        // 初始化速度恢复状态
        this.speedBackToNormal = false;
        // 最小的附加冲量
        this.minLinearImpulse = cc.v2(0, 0);
    },

    start() {

    },

    update(dt) {
        this.playerPos = this.player.getPosition();
        if (this.controlActive && this.camera.zoomRatio <= 1.7) {
            this.camera.zoomRatio += 0.08
            if (this.camera.zoomRatio > 1.7) {
                this.camera.zoomRatio = 1.7;
            }
        } else if (this.camera.zoomRatio >= 0.5 && !this.controlActive) {
            this.camera.zoomRatio -= 0.005
            if (this.camera.zoomRatio < 0.5) {
                this.camera.zoomRatio = 0.5;
            }
        }
    },
});
