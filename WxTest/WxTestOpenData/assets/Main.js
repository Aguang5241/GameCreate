cc.Class({
    extends: cc.Component,

    properties: {
        scrollViewContent: cc.Node,
        prefabRankItem: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {

    },

    start() {
        wx.onMessage(data => {
            if (data.command == 0) {//提交得分
                this.submitScore(data.MAIN_MENU_NUM, data.score);
            };
            if (data.command == 1) {//获取好友排行榜
                this.fetchFriendData(data.MAIN_MENU_NUM);
            };
        });
    },

    //提交得分
    submitScore(MAIN_MENU_NUM, score) {
        wx.getUserCloudStorage({
            // 以key/value形式存储
            keyList: [MAIN_MENU_NUM],
            success: function (getres) {
                // 如果获取数据不为空
                if (getres.KVDataList.length != 0) {
                    // 进行比较，小于原有值则返回
                    if (getres.KVDataList[0].value > score) {
                        return;
                    }
                };
                // 如果获取数据为空，则对用户托管数据进行写数据操作
                wx.setUserCloudStorage({
                    KVDataList: [{ key: MAIN_MENU_NUM, value: "" + score }],
                    success: function (res) {
                        console.log('setUserCloudStorage', 'success', res)
                    },
                    fail: function (res) {
                        console.log('setUserCloudStorage', 'fail')
                    },
                    complete: function (res) {
                        console.log('setUserCloudStorage', 'ok')
                    }
                });
            },
            fail: function (res) {
                console.log('getUserCloudStorage', 'fail')
            },
            complete: function (res) {
                console.log('getUserCloudStorage', 'ok')
            }
        });
    },

    // 获取朋友
    fetchFriendData(MAIN_MENU_NUM) {
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            success: (userRes) => {
                let userData = userRes.data[0];
                //取出所有好友数据
                wx.getFriendCloudStorage({
                    keyList: [MAIN_MENU_NUM],
                    success: res => {
                        let data = res.data;
                        // 排序
                        data.sort((a, b) => {
                            if (a.KVDataList.length == 0 && b.KVDataList.length == 0) {
                                return 0;
                            }
                            if (a.KVDataList.length == 0) {
                                return 1;
                            }
                            if (b.KVDataList.length == 0) {
                                return -1;
                            }
                            return b.KVDataList[0].value - a.KVDataList[0].value;
                        });
                        // 添加
                        for (let i = 0; i < data.length; i++) {
                            var nick = data[i].nickname;

                            var item = cc.instantiate(this.prefabRankItem);

                            var userName = item.getComponent(cc.Label);
                            userName.string = nick;

                            this.scrollViewContent.addChild(item);
                        }
                        if (data.length <= 8) {
                            let layout = this.scrollViewContent.getComponent(cc.Layout);
                            layout.resizeMode = cc.Layout.ResizeMode.NONE;
                        }
                    },
                    fail: res => {
                        console.log("wx.getFriendCloudStorage fail");
                        // this.loadingLabel.getComponent(cc.Label).string = "数据加载失败，请检测网络，谢谢。";
                    },
                });
            },
            fail: (res) => {
                console.log("fetchFriendData fail");
                // this.loadingLabel.getComponent(cc.Label).string = "数据加载失败，请检测网络，谢谢。";
            }
        });
    },

    // update() {}
});
