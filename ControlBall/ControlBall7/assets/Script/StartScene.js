cc.Class({
    extends: cc.Component,

    properties: {
        bgm: {
            default: null,
            type: cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:


    onStartBtnClick: function () {
        cc.director.loadScene('Main');
    },

    onInfoBtnClick: function () {
        cc.director.loadScene('Info');
    },

    onLoad() {
        this.bgmID = cc.audioEngine.play(this.bgm, true, 1);

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
                width: width / 4,
                height: height / 4,
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
                return;
            }

            button.hide(); // 隐藏用户按钮
            button.destroy(); // 销毁用户按钮
        })
    },

    start() {

    },

    // update (dt) {},
});
