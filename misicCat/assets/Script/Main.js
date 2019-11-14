cc.Class({
    extends: cc.Component,

    properties: {
        cat: {
            default: null,
            type: cc.Node
        },
        fish1Prefab: {
            default: null,
            type: cc.Prefab
        },
        fish2Prefab: {
            default: null,
            type: cc.Prefab
        },
        fish3Prefab: {
            default: null,
            type: cc.Prefab
        },
        fish4Prefab: {
            default: null,
            type: cc.Prefab
        },
        fish5Prefab: {
            default: null,
            type: cc.Prefab
        },
        fish6Prefab: {
            default: null,
            type: cc.Prefab
        },
        fish7lPrefab: {
            default: null,
            type: cc.Prefab
        },
        fish6lPrefab: {
            default: null,
            type: cc.Prefab
        },
        fish5lPrefab: {
            default: null,
            type: cc.Prefab
        },
        // fishPrefabCapacity: 10,
    },

    // 触摸操作
    onTouchMove: function (event) {
        this.cat.x = event.getLocationX() - this.node.width / 2;
        if (this.cat.x < -this.node.width / 2 + this.cat.width / 2) {
            this.cat.x = -this.node.width / 2 + this.cat.width / 2;
        };
        if (this.cat.x > this.node.width / 2 - this.cat.width / 2) {
            this.cat.x = this.node.width / 2 - this.cat.width / 2
        }
    },

    // 由音乐生成鱼谱
    // getYFromMusic: function(i) {
    //     var y = this.node.height / 2 + this.deltaT[i] * this.speed;
    //     return y;
    // },

    // 随机位置函数
    // randPos: function (i) {
    //     var randXList = [72, 216, 360, 504, 648];
    //     var randXIndex = Math.floor(Math.random() * 5);
    //     var randX = randXList[randXIndex] - 360; // 360 screenWidth / 2
    //     // var randY = this.node.height / 2 + 33 // 33 fishHeight / 2
    //     var randY = this.getYFromMusic(i);
    //     return cc.v2(randX, randY);
    // },

    // 创建fish
    // createFish: function (i) {
    //     var newFish;
    //     if (this.fishPrefabPool.size() > 0) {
    //         newFish = this.fishPrefabPool.get();
    //     } else {
    //         newFish = cc.instantiate(this.fishPrefab);
    //     };
    //     this.node.addChild(newFish);
    //     newFish.setPosition(this.randPos(i));
    //     newFish.getComponent('Fish').main = this;
    // },

    // 回收fish
    // recycleFish: function (oldFish) {
    //     this.fishPrefabPool.put(oldFish);
    //     console.log(this.fishPrefabPool.size());
    // },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);

        this.deltaT = [1.3, 1.6, ]

        // 创建对象池
        // this.fishPrefabPool = new cc.NodePool();
        // for (var i = 0; i < this.fishPrefabCapacity; i++) {
        //     var fish = cc.instantiate(this.fishPrefab);
        //     this.fishPrefabPool.put(fish);
        // };

        // 在music组件寄存this
        this.node.getComponent('Music').main = this;

        // for (var index = 0; index < 100; index++) {
        //     this.createFish(index);
        // };

        this.newfish = cc.instantiate(this.fish1Prefab);
        this.node.addChild(this.newfish);
    },

    start() {

    },

    update(dt) {

    },
});
