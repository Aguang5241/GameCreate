cc.Class({
    extends: cc.Component,

    properties: {
        star: {
            default: null,
            type: cc.Prefab
        },
        starCapacity: 20,
        initialStarNum: 19,
    },

    // LIFE-CYCLE CALLBACKS:

    getPos: function() {
        var randX;
        var randY = 370;
        randX = Math.random() * 1280 - 640;
        return cc.v2(randX, randY);
    },

    createStar: function() {
        var star;
        if (this.starPool.size() > 0) {
            star = this.starPool.get();
        } else {
            star = cc.instantiate(this.star);
        };
        star.setPosition(this.getPos());
        this.node.addChild(star);

        star.getComponent('Star').init();

        star.getComponent('Star').UI = this;
    },

    starKilled: function(star) {
        this.starPool.put(star);
    },
 
    onLoad () {
        this.starPool = new cc.NodePool();
        for (var i = 0; i < this.starCapacity; i++) {
            var star = cc.instantiate(this.star);
            this.starPool.put(star);
        };

        this.schedule(function() {
            this.createStar();
        }, Math.random() * 3 + 2)
    },

    start () {

    },

    // update (dt) {},
});
