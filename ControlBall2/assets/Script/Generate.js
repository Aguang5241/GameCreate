cc.Class({
    extends: cc.Component,

    properties: {
        enermyNormal: {
            default: null,
            type: cc.Prefab
        },
        enermyNormalCapacity: 200,
        player: {
            default: null,
            type: cc.Node
        },
        initailEnermyNormalNum: 100,
    },

    // LIFE-CYCLE CALLBACKS:
    
    // 随机生成的范围取自player节点为中心的长宽各为4000px的正方形
    setPos: function () {
        var randX;
        var randY;
        // randX = Math.random() * 2 * (this.playerPos.x + 2000) + (this.playerPos.x - 2000);
        // randY = Math.random() * 2 * (this.playerPos.y + 2000) + (this.playerPos.y - 2000);
        randX = Math.random() * 3800 - 1900;
        randY = Math.random() * 3800 - 1900;
        return cc.v2(randX, randY);
    },

    createEnemyNormal: function () {
        var enemyN;
        if (this.enemyNormalPool.size() > 0) {
            enemyN = this.enemyNormalPool.get();
        } else {
            enemyN = cc.instantiate(this.enermyNormal);
        }
        enemyN.setPosition(this.setPos());
        this.node.addChild(enemyN);

        // 在EnermyNormal组件上寄存本组件的this
        enemyN.getComponent('EnermyNormal').generate = this;
    },
    
    onEnemyNormalKilled: function (enemyN) {
        this.enemyNormalPool.put(enemyN);

        // 每次调用销毁函数的时候同时调用生成函数，使得节点数量保持一定
        this.createEnemyNormal();
    },
    
    onLoad() {
        this.enemyNormalPool = new cc.NodePool();

        // 初始化player坐标
        this.playerPos = cc.v2(0, 0);

        for (var i = 0; i < this.enermyNormalCapacity; i++) {
            var enemyN = cc.instantiate(this.enermyNormal);
            this.enemyNormalPool.put(enemyN);
        };
        
        // 初始即生成若干个
        for (var i = 0; i < this.initailEnermyNormalNum; i++) {
            this.createEnemyNormal();
        }

        // 将本脚本中的this寄存在Player组件中
        this.player.getComponent('Player').generate = this;
    },

    start() {

    },

    update (dt) {
        this.playerPos = this.player.getPosition();
    },
});
