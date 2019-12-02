cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onBackBtnClick: function() {
        cc.audioEngine.stopAll();
        cc.director.loadScene('Start');
    },

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
