cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('touchstart', function(event) {
            cc.director.loadScene('Main');
        })
    },

    start () {

    },

    // update (dt) {},
});
