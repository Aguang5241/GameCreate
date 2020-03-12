var Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        record: {
            default: null,
            type: cc.Label
        },
        wxNode: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // 获取排行榜
    friendButtonFunc(event) {
        this.wxShowAnim.play('ShowRand');

        wx.postMessage({
            messageType: 2,
            MAIN_MENU_NUM: "x1",
        });
    },

    restart: function () {
        cc.director.loadScene('Main');
    },

    back: function () {
        cc.audioEngine.stopAll();
        cc.director.loadScene('Start');
    },

    close: function() {
        this.wxShowAnim.play('hideRand');
    },

    onLoad() {
        this.wxShowAnim = this.wxNode.getComponent(cc.Animation);

        // this.initUserInfo();

        this.record.string = "这次旅程你总共收集了" + Global.endStarsNum + "颗星星，\n\n获得了" + Global.endScore + "次祝福！";

        // 游戏结束将本次游戏的得分数据传到开放域
        let score = Global.endScore;
        wx.postMessage({
            messageType: 1,
            MAIN_MENU_NUM: "x1",
            score: score,
        });
    },

    start() {

    },

    // update (dt) {},
});
