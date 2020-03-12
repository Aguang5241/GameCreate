var Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        record: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    restart: function() {
        cc.director.loadScene('Main');
    },

    back: function() {
        cc.audioEngine.stopAll();
        cc.director.loadScene('Start');
    },

    onLoad () {
        this.record.string = "这次旅程你总共收集了" + Global.endStarsNum + "颗星星，\n\n获得了" + Global.endScore + "次祝福！";
    },
    
    start () {

    },

    // update (dt) {},
});
