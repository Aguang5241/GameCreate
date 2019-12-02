cc.Class({
    extends: cc.Component,

    properties: {
        rankingScrollView: cc.ScrollView,
        scrollViewContent: cc.Node,
        prefabRankItem: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        
    },

    start() {
        this.removeChild();

        wx.onMessage(data => {
            if (data.messageType == 1) {// 提交得分
                this.submitScore(data.MAIN_MENU_NUM, data.score);
            };
            if (data.messageType == 2) {// 获取好友排行榜
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
                console.log('getUserCloudStorage', 'success')
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
        this.removeChild();
        this.rankingScrollView.node.active = true;

        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            success: (userRes) => {
                let userData = userRes.data[0];
                console.log('userinfo success')
                //取出所有好友数据
                wx.getFriendCloudStorage({
                    keyList: [MAIN_MENU_NUM],

                    success: res => {
                        console.log("wx.getFriendCloudStorage success");

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
                            var playerInfo = data[i];
                            var item = cc.instantiate(this.prefabRankItem);
                            item.getComponent('Block').init(i, playerInfo);
                            this.scrollViewContent.addChild(item);
                            if (data[i].avatarUrl == userData.avatarUrl) {
                                let userItem = cc.instantiate(this.prefabRankItem);
                                userItem.getComponent('Block').init(i, playerInfo);
                                userItem.y = -250;
                                this.node.addChild(userItem, 1, "1000");
                            }
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

    removeChild() {
        if (this.node.getChildByName("1000") != null) {
            this.node.removeChild(this.node.getChildByName("1000"));
        }
        this.rankingScrollView.node.active = false;
        this.scrollViewContent.removeAllChildren();
    },

    // update() {}
});
