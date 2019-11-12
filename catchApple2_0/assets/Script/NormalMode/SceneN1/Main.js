cc.Class({
    extends: cc.Component,

    properties: {
        ballPrefab: {
            default: null,
            type: cc.Prefab
        },
        ballPrefabCapacity: 5,
        ballNumLabel: {
            default: null,
            type: cc.Label
        },
        targetPrefab: {
            default: null,
            type: cc.Prefab
        },
        targetPrefabCapacity: 5,
        targetProcessBar: {
            default: null,
            type: cc.ProgressBar
        },
    },

    createBall: function () {
        var newBall;
        if (this.ballPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            newBall = this.ballPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            newBall = cc.instantiate(this.ballPrefab);
        };
        this.node.addChild(newBall); // 将生成的敌人加入节点树
        newBall.setPosition(cc.v2(0, 350));
        newBall.getComponent('Ball').main = this;
    },

    onBallKilled: function (oldBall) {
        this.ballPool.put(oldBall);
        this.ballNum -= 1;
        this.ballNumLabel.string = 'x   ' + this.ballNum;
        if (this.ballNum == 0) {
            cc.director.loadScene('Start');
        }
    },

    randTargetPos: function (target) {
        var randX = Math.random() * (this.node.width - target.width) + (-this.node.width / 2 + target.width / 2);
        var randY = Math.random() * (this.node.height / 2 - target.height / 2 - 60); // 60为标题头高度
        return cc.v2(randX, randY);
    },

    createTarget: function () {
        var newTarget;
        if (this.targetPool.size() > 0) {
            newTarget = this.targetPool.get();
        } else {
            newTarget = cc.instantiate(this.targetPrefab);
        };
        this.node.addChild(newTarget);
        newTarget.setPosition(this.randTargetPos(newTarget));
        newTarget.getComponent('Target').main = this;
    },

    onTargetKilled: function (oldTarget) {
        this.targetPool.put(oldTarget);
        this.targetProcessBar.progress += 1 / this.targetPrefabCapacity;
        if (this.targetProcessBar.progress >= 1) {
            cc.director.loadScene('Start');
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 初始化球球对象池
        this.ballPool = new cc.NodePool();
        for (var i = 0; i < this.ballPrefabCapacity; i++) {
            var ball = cc.instantiate(this.ballPrefab); // 创建节点
            this.ballPool.put(ball); // 通过 put 接口放入对象池
        };
        this.createBall();

        // 初始化球球数量标签
        this.ballNum = this.ballPrefabCapacity;
        this.ballNumLabel.string = 'x   ' + this.ballNum;

        // 初始化目标对象池
        this.targetPool = new cc.NodePool();
        for (var i = 0; i < this.targetPrefabCapacity; i++) {
            var target = cc.instantiate(this.targetPrefab);
            this.targetPool.put(target);
        };
        this.createTarget();

        // 初始化目标进度条
        this.targetProcessBar.progress = 0;
    },

    start() {

    },

    update (dt) {
        // if (!this.animState.isPlaying) {
        //     this.createBallOrNot = true;
        // }
    },
});