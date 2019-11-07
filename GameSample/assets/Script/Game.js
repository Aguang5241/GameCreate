cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        },

        jumpSpeed: 0,

        enemyPrefab: {
            default: null,
            type: cc.Prefab
        },

        enemyNum: 0,

        enemyInstance: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.count = 0;
        // 添加玩家输入事件
        this.registerTouchEvent();
        // 初始化对象池
        this.enemyPool = new cc.NodePool();
        for (var i = 0; i < this.enemyNum * 2; i++) {
            var enemy = cc.instantiate(this.enemyPrefab);
            this.enemyPool.put(enemy);
        };
        // 开局即随记生成若干地刺
        for (var i = 0; i < this.enemyNum; i++) {
            this.createEnemy();
        };
    },

    // 注册触摸事件
    registerTouchEvent: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    },

    touchStart: function (event) {
        if (event.getLocationX() > this.node.width / 2) {
            this.player.runAction(this.playerRightAct())
        } else {
            this.player.runAction(this.playerLeftAct())
        };
        // 点击生成地刺
        this.createEnemy();
    },

    playerRightAct: function () {
        var act;
        if (this.player.x < 0) {
            act = cc.spawn(
                cc.moveBy(1 / this.jumpSpeed, cc.v2(this.node.width - 150, 0)),
                cc.rotateBy(0.5 / this.jumpSpeed, 180)
            ).easing(cc.easeCubicActionIn());
        } else {
            act = cc.sequence(
                cc.moveBy(0.2 / this.jumpSpeed, cc.v2(-10, 0)),
                cc.moveBy(0.2 / this.jumpSpeed, cc.v2(10, 0))
            )
        }
        return act;
    },

    playerLeftAct: function () {
        var act;
        if (this.player.x > 0) {
            act = cc.spawn(
                cc.moveBy(1 / this.jumpSpeed, cc.v2(-this.node.width + 150, 0)),
                cc.rotateBy(0.5 / this.jumpSpeed, -180)
            ).easing(cc.easeCubicActionIn());
        } else {
            act = cc.sequence(
                cc.moveBy(0.2 / this.jumpSpeed, cc.v2(10, 0)),
                cc.moveBy(0.2 / this.jumpSpeed, cc.v2(-10, 0))
            )
        }
        return act;
    },

    // 从对象池中取出对象
    createEnemy: function () {
        var newEnemy;
        this.count += 1;
        if (this.enemyPool.size() > 0) {
            newEnemy = this.enemyPool.get();
        } else {
            newEnemy = cc.instantiate(this.enemyPrefab);
        };
        this.node.addChild(newEnemy);
        newEnemy.setPosition(this.randPos(newEnemy))
        newEnemy.getComponent('Enemy').game = this; // 在Enemy组件上暂存Game组件的引用
    },

    // 将失效对象放回对象池
    onEnemyKilled: function (enemy) {
        console.log('回收前：' + this.enemyPool.size());
        this.enemyPool.put(enemy);
        console.log('回收后：' + this.enemyPool.size());
    },

    randPos: function (enemy) {
        var randSideRight;
        var randX;
        var randY;
        if (Math.random() > 0.5) {
            randSideRight = true;
        } else {
            randSideRight = false;
        };
        if (randSideRight) {
            enemy.angle = 90;
            randX = this.node.width / 2 - 48 - enemy.height / 2;
        } else {
            enemy.angle = -90;
            randX = -this.node.width / 2 + 48 + enemy.height / 2;
        };
        if (this.count <= this.enemyNum) {
            randY = -this.count * this.enemyInstance;
        } else {
            randY = -this.enemyNum * this.enemyInstance;
        };
        return cc.v2(randX, randY);
    },

    // start() {

    // },

    // update(dt) {

    // },
});
