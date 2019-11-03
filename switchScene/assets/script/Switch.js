cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        this.node.on('mousedown', function(event) {
            cc.director.loadScene('Scene2');
        })
    },

    start () {

    },

    // update (dt) {},
});
