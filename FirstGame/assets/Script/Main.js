cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        },

        blockPrefab: {
            default: null,
            type: cc.Prefab
        },

        jumpAudio: {
            default: null,
            type: cc.AudioClip
        },

        wallWidth: 34,

        jumpSpeed: 1,

        blockPoolCapacity: 10,
    },

    jumpUp: function () {
        var act;
        if (this.player.x < 0) {
            act = cc.spawn(
                cc.moveBy(1 / this.jumpSpeed, cc.v2(this.node.width - 2 * this.wallWidth - this.player.height, 0)),
                cc.rotateBy(1 / this.jumpSpeed, 180),
            ).easing(cc.easeCubicActionIn())
        } else {
            act = cc.sequence(
                cc.moveBy(0.2 / this.jumpSpeed, cc.v2(-10, 0)),
                cc.moveBy(0.2 / this.jumpSpeed, cc.v2(10, 0))
            )
        }
        return act
    },

    jumpDown: function () {
        var act;
        if (this.player.x > 0) {
            act = cc.spawn(
                cc.moveBy(1 / this.jumpSpeed, cc.v2(-(this.node.width - 2 * this.wallWidth - this.player.height), 0)),
                cc.rotateBy(1 / this.jumpSpeed, 180)
            ).easing(cc.easeCubicActionIn())
        } else {
            act = cc.sequence(
                cc.moveBy(0.2 / this.jumpSpeed, cc.v2(10, 0)),
                cc.moveBy(0.2 / this.jumpSpeed, cc.v2(-10, 0))
            )
        }
        return act
    },

    onTouchStart: function (event) {
        cc.audioEngine.play(this.jumpAudio, false);
        if (event.getLocationX() > this.node.width / 2) {
            this.player.runAction(this.jumpUp())
        } else {
            this.player.runAction(this.jumpDown())
        };
        this.createBlock()
    },

    randomPosition: function (block, index) {
        var randX;
        var randY;
        if (Math.random() > 0.5) {
            randX = this.node.width / 2 - this.wallWidth - block.height / 2;
            block.angle = 90;
        } else {
            randX = -(this.node.width / 2 - this.wallWidth - block.height / 2);
            block.angle = -90;
        };
        if (index < this.blockPoolCapacity / 2) {
            randY = 0 - this.player.width * 3 * index;
        } else {
            randY = 0 - this.player.width * 3 * (this.blockPoolCapacity / 2 - 1)
        };
        return cc.v2(randX, randY)
    },

    createBlock: function (index) {
        var newblock;
        if (this.blockPool.size() > 0) {
            newblock = this.blockPool.get();
        } else {
            newblock = cc.instantiate(this.blockPrefab);
        };
        this.node.addChild(newblock);
        newblock.setPosition(this.randomPosition(newblock, index));
        newblock.getComponent('Block').game = this;
    },

    recycleBlock: function (usedBlock) {
        this.blockPool.put(usedBlock);
        // console.log(this.blockPool.size());
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 玩家位置重置
        this.player.setPosition(-(this.node.width / 2 - this.wallWidth - this.player.height / 2), 240);
        // 开启事件监听
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        // 初始化对象池
        this.blockPool = new cc.NodePool;
        for (var i = 0; i < this.blockPoolCapacity; i++) {
            var block = cc.instantiate(this.blockPrefab);
            this.blockPool.put(block);
        };
        // 初始化生成若干地刺
        for(var i = 0; i < this.blockPoolCapacity / 2; i++) {
            this.createBlock(i);
        };
    },

    start() {
        
    },

    update (dt) {
    },
});
