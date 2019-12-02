// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        playerSprite: cc.Sprite,
        playerName: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    showBtn: function() {
        // 向开放域发送信息
        wx.postMessage({
            command: 1,
            MAIN_MENU_NUM: "x1"
        })
    },

    // onLoad () {},

    start () {
        wx.getUserInfo({
            success: (res) => {
                console.log('get userInfo ok')

                this.playerName.string = res.userInfo.nickName;

                cc.loader.load({ url: res.userInfo.avatarUrl, type: 'png' }, (err, texture) => {
                    this.playerSprite.spriteFrame = new cc.SpriteFrame(texture);
                });
            },
            fail: (res) => {
                console.log('do not get userInfo')
            }
        })
    },

    // update (dt) {},
});
