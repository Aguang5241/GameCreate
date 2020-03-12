/**
 * wx api: https://developers.weixin.qq.com/minigame/dev/document/open-api/user-info/wx.createUserInfoButton.html
 */
cc.Class({
    extends: cc.Component,

    properties: {
        wxSubContextView: cc.Node,
        tips: cc.Label,

        avatar: cc.Sprite,
        nickName: cc.Label,

        readme: cc.Label,

        background: cc.Node
    },

    start () {
        this.loadReadme();
        this.initAction();
        this.initUserInfoButton();
    },

    initAction () {
        this._isShow = false;
        this.wxSubContextView.y = 1000;
        this._showAction = cc.moveTo(0.5, this.wxSubContextView.x, 110);
        this._hideAction = cc.moveTo(0.5, this.wxSubContextView.x, 1000);

        this.background.on('touchstart', this.onClick, this);
    },

    initUserInfoButton () {
        if (typeof wx === 'undefined') {
            return;
        }

        let systemInfo = wx.getSystemInfoSync(); // 获取用户设备信息
        let width = systemInfo.windowWidth; // 可使用的窗口宽度
        let height = systemInfo.windowHeight; // 可使用的窗口高度
        let button = wx.createUserInfoButton({ // 创建用户信息按钮（首次获取）
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
        });

        button.onTap((res) => { // 点击所创建的按钮
            let userInfo = res.userInfo;

            // 当没有获取到用户信息
            if (!userInfo) { 
                this.tips.string = res.errMsg; // 返回错误信息
                return;
            }

            this.nickName.string = userInfo.nickName; // 用户昵称

            cc.loader.load({url: userInfo.avatarUrl, type: 'png'}, (err, texture) => { // 用户头像
                if (err) {
                    console.error(err);
                    return;
                }
                this.avatar.spriteFrame = new cc.SpriteFrame(texture); // 添加至精灵
            });


            wx.getOpenDataContext().postMessage({ // 获取开放数据域并向开放数据与发送信息
                message: "User info get success."
            });

            this.wxSubContextView.runAction(this._showAction);
            this._isShow = true;

            button.hide(); // 隐藏用户按钮
            button.destroy(); // 销毁用户按钮

        });
    },

    onClick () {
        this._isShow = !this._isShow;
        if (this._isShow) {
            this.wxSubContextView.runAction(this._showAction);
        }
        else {
            this.wxSubContextView.runAction(this._hideAction);
        }
    },


    onShowReadme () {
        this.readme.node.parent.active = true;
    },

    loadReadme () {
        cc.loader.loadRes('readme', cc.TextAsset, (err, res) => {
            this.readme.string = '\n' + res.text;
        });
        this.readme.node.on('touchstart' , () => {
            this.readme.node.parent.active = false;
        }, this);
    },
});
