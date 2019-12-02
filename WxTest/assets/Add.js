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
        showLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onAdd: function() {
        this.initScore += 1;
        this.showLabel.string = this.initScore;
    },

    onEnd: function() {
        cc.director.loadScene('End');

        // 向开放域发送信息
        wx.postMessage({
            command: 0,
            MAIN_MENU_NUM: "x1",
            score: this.initScore
        })
    },

    onLoad () {
        this.initScore = 0

        // 获取权限
        let systemInfo = wx.getSystemInfoSync(); // 获取用户设备信息
        let width = systemInfo.windowWidth; // 可使用的窗口宽度
        let height = systemInfo.windowHeight; // 可使用的窗口高度
        let button = wx.createUserInfoButton({
            type: 'text',
            text: '',
            style: {
                left: 0,
                top: 0,
                width: width,
                height: height,
                lineHeight: 40,
                backgroundColor: '#00000000',
                color: '#00000000',
                textAlign: 'center',
                fontSize: 10,
                borderRadius: 4
            }
        })

        button.onTap((res) => {
            let userInfo = res.userInfo;

            // 当没有获取到用户信息
            if (!userInfo) { 
                console.log('dot get userInfo')
                return;
            }

            button.hide(); // 隐藏用户按钮
            button.destroy(); // 销毁用户按钮
        })
    },

    start () {

    },

    // update (dt) {},
});
