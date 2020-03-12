cc.Class({
    extends: cc.Component,

    properties: {
        interval: 0,
        heart: {
            default: null,
            type: cc.Prefab
        }
    },

    createHeart: function () {
        var newHeart = cc.instantiate(this.heart);
        this.node.addChild(newHeart);
        newHeart.setPosition(this.getInitialPos()); // setPosition()
        var act = cc.moveTo(Math.random() * 1.5 + 0.5, cc.v2(newHeart.x, -this.node.height / 2 - 50))
        var destroy = cc.callFunc(newHeart.removeFromParent, newHeart) // removeFromParent
        var seq = cc.sequence(act, destroy);
        newHeart.runAction(seq);
    },

    getInitialPos: function() {
        var randX = (Math.random() - 0.5) *  this.node.width;
        var randY = this.node.height / 2 + 100;
        return cc.v2(randX, randY)
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        console.log(this.node.height)
        this.schedule(function() {
            this.createHeart();
        }, this.interval);
    },

    start() {

    },

    // update (dt) {},
});
