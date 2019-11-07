cc.Class({
    extends: cc.Component,

    properties: {
        applePrefab: {
            default: null,
            type: cc.Prefab
        },
        applePrefabPoolCapacity: 10,
        ballPrefab: {
            default: null,
            type: cc.Prefab
        },
        ballPrefabPoolCapacity: 5,
        ballNumLabel: {
            default: null,
            type: cc.Label
        },
        appleProgress: {
            default: null,
            type: cc.ProgressBar
        },
    },

    randomPos: function(apple) {
        var randX = Math.random() * (this.node.width - 20 - apple.width) - this.node.width / 2 + apple.width / 2 + 10;
        var randY = Math.random() * (this.node.height / 2 - apple.height / 2 - 10 - 50); // 50:标题栏高度;10:墙体宽度
        return cc.v2(randX, randY)
    },

    createApple: function() {
        var newApple;
        if (this.applePrefabPool.size() > 0) {
            newApple = this.applePrefabPool.get();
        } else {
            newApple = cc.instantiate(this.applePrefab);
        };
        this.node.addChild(newApple);
        newApple.setPosition(this.randomPos(newApple));
        newApple.getComponent('Apple').game = this;
    },

    recycleApple: function(oldApple) {
        this.applePrefabPool.put(oldApple);
        this.appleProgress.progress += 1 / this.applePrefabPoolCapacity;
    },

    createBall: function() {
        var newBall;
        if (this.ballPrefabPool.size() > 0) {
            newBall = this.ballPrefabPool.get();
        } else {
            newBall = cc.instantiate(this.ballPrefab);
        };
        this.node.addChild(newBall);
        newBall.setPosition(cc.v2(0, 350));
        newBall.getComponent('Ball').game = this;
    },

    recycleBall: function(oldBall) {
        this.ballPrefabPool.put(oldBall);
        this.ballNum -= 1;
        this.ballNumLabel.string = 'x ' + this.ballNum;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 初始化苹果对象池
        this.applePrefabPool = new cc.NodePool();
        for (var i = 0; i < this.applePrefabPoolCapacity; i++) {
            var apple = cc.instantiate(this.applePrefab);
            this.applePrefabPool.put(apple);
        };
        this.createApple();
        // 初始化球球预制资源池
        this.ballPrefabPool = new cc.NodePool();
        for (var i = 0; i < this.ballPrefabPoolCapacity; i++) {
            var ball = cc.instantiate(this.ballPrefab);
            this.ballPrefabPool.put(ball);
        };
        this.createBall();
        // 初始化球球数量
        this.ballNum = this.ballPrefabPoolCapacity;
        this.ballNumLabel.string = 'x ' + this.ballNum;
        // 初始化进度条
        this.appleProgress.progress = 0;
    },

    start () {

    },

    update (dt) {
        if (this.ballNum == 0) {
            cc.director.loadScene('End');
        };
        if (this.appleProgress.progress >= 1) {
            cc.director.loadScene('Start');
        }
    },
});
