cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        },
        blackBlockPrefab: {
            default: null,
            type: cc.Prefab
        },
        blackBlockPrefabCapacity: 5,
        whiteBlockPrefab: {
            default: null,
            type: cc.Prefab
        },
        whiteBlockPrefabCapacity: 5,
        intervalTime: 2,
    },

    jumpUp: function () {
        var action = cc.sequence(
            cc.moveBy(0.8, cc.v2(0, 250)).easing(cc.easeCubicActionOut()),
            cc.moveBy(0.8, cc.v2(0, -250)).easing(cc.easeCubicActionIn())
        );
        return action;
    },

    jumpDown: function () {
        var action = cc.sequence(
            cc.moveBy(0.8, cc.v2(0, -250)).easing(cc.easeCubicActionOut()),
            cc.moveBy(0.8, cc.v2(0, 250)).easing(cc.easeCubicActionIn())
        );
        return action;
    },

    onTouchStart: function (event) {
        this.startY = event.getLocationY();
    },

    onTouchEnd: function (event) {
        this.endY = event.getLocationY();
        var self = this;
        if (this.startY - this.endY < 0) { // go up
            this.goUp = true;
            // this.goDown = false;
        } else { // go down
            this.goUp = false;
            // this.goDown = true;
        };
        if (this.goUp && this.player.y > 0) {
            this.player.runAction(this.jumpUp())
        } else if (this.goUp && this.player.y < 0) {
            cc.loader.loadRes('black', cc.SpriteFrame, function (err, SpriteFrame) {
                self.player.getComponent(cc.Sprite).spriteFrame = SpriteFrame;
                self.player.y = 50;
            });
        } else if (!this.goUp && this.player.y < 0) {
            this.player.runAction(this.jumpDown())
        } else if (!this.goUp && this.player.y > 0) {
            cc.loader.loadRes('white', cc.SpriteFrame, function (err, SpriteFrame) {
                self.player.getComponent(cc.Sprite).spriteFrame = SpriteFrame;
                self.player.y = -50;
            });
        }
    },

    createBlackBlock: function() {
        var newBlackBlock;
        if (this.blackBlockPrefabPool.size() > 0) {
            newBlackBlock = this.blackBlockPrefabPool.get()
        } else {
            newBlackBlock = cc.instantiate(this.blackBlockPrefab)
        };
        this.node.addChild(newBlackBlock);
        newBlackBlock.setPosition(cc.v2(this.node.width / 2 + Math.random() * 500, 0));
        newBlackBlock.getComponent('BlackBlock').main = this;
    },

    createWhiteBlock: function() {
        var newWhiteBlock;
        if (this.whiteBlockPrefabPool.size() > 0) {
            newWhiteBlock = this.whiteBlockPrefabPool.get()
        } else {
            newWhiteBlock = cc.instantiate(this.whiteBlockPrefab)
        };
        this.node.addChild(newWhiteBlock);
        newWhiteBlock.setPosition(cc.v2(this.node.width / 2 + Math.random() * 500, 0));
        newWhiteBlock.getComponent('WhiteBlock').main = this;
    },

    recycleBlackBlock: function(oldBlackBlock) {
        this.blackBlockPrefabPool.put(oldBlackBlock);
    },

    recycleWhiteBlock: function(oldWhiteBlock) {
        this.whiteBlockPrefabPool.put(oldWhiteBlock);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.startY = 0;
        this.endY = 0;
        this.goUp = false;
        this.goDown = false;

        // 创建对象池
        this.blackBlockPrefabPool = new cc.NodePool();
        for (var i = 0; i < this.blackBlockPrefabCapacity; i++) {
            var blackBlock = cc.instantiate(this.blackBlockPrefab);
            this.blackBlockPrefabPool.put(blackBlock);
        };
        this.whiteBlockPrefabPool = new cc.NodePool();
        for (var i = 0; i < this.whiteBlockPrefabCapacity; i++) {
            var whiteBlock = cc.instantiate(this.whiteBlockPrefab);
            this.whiteBlockPrefabPool.put(whiteBlock);
        };
        // 每隔一段时间生成一个对象
        this.schedule(function() {
            this.createBlackBlock();
            this.createWhiteBlock();
        }, this.intervalTime);
    },
    
    start() {
        
    },
    
    update(dt) {
        
    },
});
