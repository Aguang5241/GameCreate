cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        },
        // 加分球
        scoreBall: {
            default: null,
            type: cc.Prefab
        },
        scoreBallCapacity: 200,
        initailScoreBallNum: 199,
        // 捕捉球
        enermyBall: {
            default: null,
            type: cc.Prefab
        },
        enermyBallCapacity: 30,
        initailEnermyBallNum: 29,
        //医疗球
        medicineBall: {
            default: null,
            type: cc.Prefab
        },
        medicineBallCapacity: 50,
        initailMedicineBallNum: 49,
        medicineBallMoveDuration: 5,
        medicineBallMoveDistance: 100,
        // 巡逻球
        sliderBall: {
            default: null,
            type: cc.Prefab
        },
        sliderBallCapacity: 15,
        initailSliderBallNum: 14,
        sliderBallMoveDuration: 5,
        // 超级加分球
        superPlusBall: {
            default: null,
            type: cc.Prefab
        },
        superPlusBallCapacity: 20,
        initailSuperPlusBallNum: 19,
    },

    // LIFE-CYCLE CALLBACKS:

    setSliderBallAction: function () {
        var act;
        if (Math.random() > 0.5) { // 水平移动
            act = cc.sequence(
                cc.moveBy(this.sliderBallMoveDuration, cc.v2(60, -80)),
                cc.moveBy(this.sliderBallMoveDuration, cc.v2(-120, 0)),
                cc.moveBy(this.sliderBallMoveDuration, cc.v2(60, 80))
            )
        } else { // 垂直移动
            act = cc.sequence(
                cc.moveBy(this.sliderBallMoveDuration, cc.v2(-60, -80)),
                cc.moveBy(this.sliderBallMoveDuration, cc.v2(120, 0)),
                cc.moveBy(this.sliderBallMoveDuration, cc.v2(-60, 80))
            )
        };
        return cc.repeatForever(act);
    },

    setMedicineBallAction: function () {
        var act;
        var randomNum = Math.random() * 0.8;
        if (randomNum < 0.2) { // 水平移动
            act = cc.sequence(
                cc.moveBy(this.medicineBallMoveDuration, cc.v2(this.medicineBallMoveDistance, 0)),
                cc.moveBy(this.medicineBallMoveDuration, cc.v2(-this.medicineBallMoveDistance, 0))
            )
        } else if (randomNum >= 0.2 && randomNum < 0.4) { // 垂直移动
            act = cc.sequence(
                cc.moveBy(this.medicineBallMoveDuration, cc.v2(0, this.medicineBallMoveDistance)),
                cc.moveBy(this.medicineBallMoveDuration, cc.v2(0, -this.medicineBallMoveDistance))
            )
        } else if (randomNum >= 0.4 && randomNum < 0.6) { // 45度移动
            act = cc.sequence(
                cc.moveBy(this.medicineBallMoveDuration, cc.v2(this.medicineBallMoveDistance, this.medicineBallMoveDistance)),
                cc.moveBy(this.medicineBallMoveDuration, cc.v2(-this.medicineBallMoveDistance, -this.medicineBallMoveDistance))
            )
        } else if (randomNum >= 0.6 && randomNum < 0.8) { // -45度移动
            act = cc.sequence(
                cc.moveBy(this.medicineBallMoveDuration, cc.v2(-this.medicineBallMoveDistance, this.medicineBallMoveDistance)),
                cc.moveBy(this.medicineBallMoveDuration, cc.v2(this.medicineBallMoveDistance, -this.medicineBallMoveDistance))
            )
        };
        return cc.repeatForever(act);
    },

    // 随机生成的范围
    setNormalPos: function () {
        var randX;
        var randY;
        var pos;
        while (true) {
            randX = Math.random() * 7800 - 3900;
            randY = Math.random() * 5800 - 2900;
            pos = cc.v2(randX, randY);
            if (pos.sub(this.playerPos).mag() > 50) {
                break;
            }
        };
        return cc.v2(randX, randY);
    },

    // 不能出现在距离玩家太附近
    setPosFarFromPlayer: function () {
        var randX;
        var randY;
        var pos;
        while (true) {
            randX = Math.random() * 7800 - 3900;
            randY = Math.random() * 5800 - 2900;
            pos = cc.v2(randX, randY);
            if (pos.sub(this.playerPos).mag() > 1000) {
                break;
            }
        };
        return pos;
    },

    // 不能出现在距离玩家以及边界太附近
    setPosFarFromPlayerAndBoundary: function() {
        var randX;
        var randY;
        var pos;
        while (true) {
            randX = Math.random() * 7000 - 3500;
            randY = Math.random() * 5000 - 2500;
            pos = cc.v2(randX, randY);
            if (pos.sub(this.playerPos).mag() > 1000) {
                break;
            }
        };
        return pos;
    },

    createScoreBall: function () {
        var scoreBall;
        if (this.scoreBallPool.size() > 0) {
            scoreBall = this.scoreBallPool.get();
        } else {
            scoreBall = cc.instantiate(this.scoreBall);
        }
        scoreBall.setPosition(this.setNormalPos());
        this.node.addChild(scoreBall);
        scoreBall.getComponent('ScoreBall').init(); //接下来就可以调用其身上的脚本进行初始化

        // 在ScoreBall组件上寄存本组件的this
        scoreBall.getComponent('ScoreBall').generate = this;
    },

    scoreBallKilled: function (scoreBall) {
        this.scoreBallPool.put(scoreBall);

        // 每次调用销毁函数的时候同时调用生成函数，使得节点数量保持一定
        this.createScoreBall();
    },

    createEnermyBall: function () {
        var enermyBall;
        if (this.enermyBallPool.size() > 0) {
            enermyBall = this.enermyBallPool.get();
        } else {
            enermyBall = cc.instantiate(this.enermyBall);
        }
        enermyBall.setPosition(this.setPosFarFromPlayer());
        this.node.addChild(enermyBall);
        enermyBall.getComponent('EnermyBall').init(); //接下来就可以调用其身上的脚本进行初始化


        // 在EnermyNormal组件上寄存本组件的this
        enermyBall.getComponent('EnermyBall').generate = this;
    },

    enermyBallKilled: function (enermyBall) {
        this.enermyBallPool.put(enermyBall);

        // 每次调用销毁函数的时候同时调用生成函数，使得节点数量保持一定
        this.createEnermyBall();
    },

    createMedicineBall: function () {
        var medicineBall;
        if (this.medicineBallPool.size() > 0) {
            medicineBall = this.medicineBallPool.get();
        } else {
            medicineBall = cc.instantiate(this.medicineBall);
        }
        medicineBall.setPosition(this.setPosFarFromPlayerAndBoundary());
        this.node.addChild(medicineBall);
        medicineBall.getComponent('MedicineBall').init(); //接下来就可以调用其身上的脚本进行初始化

        medicineBall.runAction(this.setMedicineBallAction())

        // 在MedicineBall组件上寄存本组件的this
        medicineBall.getComponent('MedicineBall').generate = this;
    },

    medicineBallKilled: function (medicineBall) {
        this.medicineBallPool.put(medicineBall);

        // 每次调用销毁函数的时候同时调用生成函数，使得节点数量保持一定
        this.createMedicineBall();
    },

    createSliderBall: function () {
        var sliderBall;
        if (this.sliderBallPool.size() > 0) {
            sliderBall = this.sliderBallPool.get();
        } else {
            sliderBall = cc.instantiate(this.sliderBall);
        };
        sliderBall.setPosition(this.setPosFarFromPlayerAndBoundary());
        this.node.addChild(sliderBall);
        sliderBall.getComponent('SliderBall').init(); //接下来就可以调用其身上的脚本进行初始化

        sliderBall.runAction(this.setSliderBallAction())

        // 在SliderBall组件上寄存本组件的this
        sliderBall.getComponent('SliderBall').generate = this;
    },

    sliderBallKilled: function (sliderBall) {
        this.sliderBallPool.put(sliderBall);

        // 每次调用销毁函数的时候同时调用生成函数，使得节点数量保持一定
        this.createSliderBall();
    },

    createSuperPlusBall: function () {
        var superPlusBall;
        if (this.superPlusBallPool.size() > 0) {
            superPlusBall = this.superPlusBallPool.get();
        } else {
            superPlusBall = cc.instantiate(this.superPlusBall);
        };
        superPlusBall.setPosition(this.setPosFarFromPlayer());
        this.node.addChild(superPlusBall);
        superPlusBall.getComponent('SuperPlusBall').init(); //接下来就可以调用其身上的脚本进行初始化

        // 在SuperPlusBall组件上寄存本组件的this
        superPlusBall.getComponent('SuperPlusBall').generate = this;
    },

    superPlusBallKilled: function (superPlusBall) {
        this.superPlusBallPool.put(superPlusBall);

        // 每次调用销毁函数的时候同时调用生成函数，使得节点数量保持一定
        this.createSuperPlusBall();
    },

    onLoad() {
        this.scoreBallPool = new cc.NodePool();
        this.enermyBallPool = new cc.NodePool();
        this.medicineBallPool = new cc.NodePool();
        this.sliderBallPool = new cc.NodePool();
        this.superPlusBallPool = new cc.NodePool();

        // 初始化player坐标
        this.playerPos = cc.v2(0, 0);

        for (var i = 0; i < this.scoreBallCapacity; i++) {
            var scoreBall = cc.instantiate(this.scoreBall);
            this.scoreBallPool.put(scoreBall);
        };
        for (var i = 0; i < this.enermyBallCapacity; i++) {
            var enermyBall = cc.instantiate(this.enermyBall);
            this.enermyBallPool.put(enermyBall);
        };
        for (var i = 0; i < this.medicineBallCapacity; i++) {
            var medicineBall = cc.instantiate(this.medicineBall);
            this.medicineBallPool.put(medicineBall);
        };
        for (var i = 0; i < this.sliderBallCapacity; i++) {
            var sliderBall = cc.instantiate(this.sliderBall);
            this.sliderBallPool.put(sliderBall);
        };
        for (var i = 0; i < this.superPlusBallCapacity; i++) {
            var superPlusBall = cc.instantiate(this.superPlusBall);
            this.superPlusBallPool.put(superPlusBall);
        };

        // 初始即生成若干个
        for (var i = 0; i < this.initailScoreBallNum; i++) {
            this.createScoreBall();
        };
        for (var i = 0; i < this.initailEnermyBallNum; i++) {
            this.createEnermyBall();
        };
        for (var i = 0; i < this.initailMedicineBallNum; i++) {
            this.createMedicineBall();
        };
        for (var i = 0; i < this.initailSliderBallNum; i++) {
            this.createSliderBall();
        };
        for (var i = 0; i < this.initailSuperPlusBallNum; i++) {
            this.createSuperPlusBall();
        };

        // 将本脚本中的this寄存在Player组件中
        this.player.getComponent('Player').generate = this;
    },

    start() {

    },

    update(dt) {
        this.playerPos = this.player.getPosition();
    },
});
