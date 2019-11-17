cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        },
        bgmAudio: {
            default: null,
            type: cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    playerJump: function () {
        var action = cc.sequence(
            cc.moveBy(0.5, cc.v2(0, 250)).easing(cc.easeCubicActionOut()),
            cc.moveBy(0.5, cc.v2(0, -250)).easing(cc.easeCubicActionIn())
        );
        return action;
    },

    playerDash: function () {
        var action = cc.sequence(
            cc.moveBy(0.17, cc.v2(0, -40)).easing(cc.easeCubicActionOut()),
            cc.delayTime(0.66),
            cc.moveBy(0.17, cc.v2(0, 40)).easing(cc.easeCubicActionIn())
        );
        return action;
    },

    onTouchStart: function (event) {
        this.touchStartPos = event.getLocationY();
    },

    onTouchEnd: function (event) {
        this.touchEndPos = event.getLocationY();
        if (this.touchEndPos - this.touchStartPos > 0 && this.player.getComponent(dragonBones.ArmatureDisplay).animationName == 'Run') { // play animation 'Jump'
            this.dashEnable = false;
            this.player.getComponent(dragonBones.ArmatureDisplay).playAnimation('Jump', 1);
            this.player.runAction(this.playerJump());
        } else if (this.touchEndPos - this.touchStartPos < 0 && this.player.getComponent(dragonBones.ArmatureDisplay).animationName == 'Run') { // play animation 'Dash'
            this.dashEnable = true;
            this.player.getComponent(dragonBones.ArmatureDisplay).playAnimation('Dash', 1);
            this.player.runAction(this.playerDash());
        }
    },

    onLoad() {
        // 初始取消播放之前的背景音乐
        cc.audioEngine.stopAll();

        // 初始播放奔跑动画
        this.player.getComponent(dragonBones.ArmatureDisplay).playAnimation('Run', 0);

        // 开启bgm
        this.audioEffect = cc.audioEngine.playEffect(this.bgmAudio, true);

        // 在player组件上寄存main的this
        this.player.getComponent('Player').main = this;

        // 在背景节点的组件MoveBg上寄存本节点的this,用于判断'Dash Animation'的时候背景加速移动
        this.dashEnable = false;
        this.node.getChildByName('bg').getComponent('MoveBg').main = this;

        // 初始化用户输入监听
        this.touchStartPos = 0;
        this.touchEndPos = 0;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },

    start() {

    },

    update(dt) {
        
    },
});
