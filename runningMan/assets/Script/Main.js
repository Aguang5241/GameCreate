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
        blockPrefabCapacity: 5,
        intervalTime: 3,
    },

    onTouchStart: function (event) {
        this.startY = event.getLocationY();
    },

    onTouchEnd: function (event) {
        this.endY = event.getLocationY();
        if (this.startY - this.endY < 0) {
            this.player.getComponent(dragonBones.ArmatureDisplay).playAnimation('jump', 1),
            this.player.runAction(cc.sequence(
                cc.moveTo(0.29, cc.v2(this.player.x, -620)),
                cc.moveTo(0.09, cc.v2(this.player.x, -610)),
                cc.moveTo(0.16, cc.v2(this.player.x, 300)).easing(cc.easeCubicActionOut()),
                cc.moveTo(0.63, cc.v2(this.player.x, -610)).easing(cc.easeCubicActionIn())
            ));   
        };
    },

    createBlock: function() {
        var newBlock;
        if (this.blockPrefabPool.size() > 0) {
            newBlock = this.blockPrefabPool.get()
        } else {
            newBlock = cc.instantiate(this.blockPrefab)
        };
        this.node.addChild(newBlock);
        newBlock.setPosition(cc.v2(this.node.width / 2 + Math.random() * 500, -710));
        newBlock.getComponent('Block').main = this;
    },

    recycleBlock: function(oldBlock) {
        this.blockPrefabPool.put(oldBlock);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);

        this.player.getComponent(dragonBones.ArmatureDisplay).playAnimation('run', 0),
        this.player.getComponent(dragonBones.ArmatureDisplay).on(dragonBones.EventObject.COMPLETE, function(){
            this.player.getComponent(dragonBones.ArmatureDisplay).playAnimation('run', 0)
        }, this)

        // 创建对象池
        this.blockPrefabPool = new cc.NodePool();
        for (var i = 0; i < this.blockPrefabCapacity; i++) {
            var block = cc.instantiate(this.blockPrefab);
            this.blockPrefabPool.put(block);
        };
        // 每隔一段时间生成一个对象
        this.schedule(function() {
            this.createBlock();
        }, this.intervalTime);
    },
    
    start() {
        
    },
    
    update(dt) {
        // console.log(this.player.getComponent(dragonBones.ArmatureDisplay).animationName)
        // if (this.player.getComponent(dragonBones.ArmatureDisplay).playAnimation('jump', 1).COMPLETE) {
        //     this.player.getComponent(dragonBones.ArmatureDisplay).playAnimation('run', 0)
        // }
    },
});
