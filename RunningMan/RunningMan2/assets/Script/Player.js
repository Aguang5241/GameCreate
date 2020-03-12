cc.Class({
    extends: cc.Component,

    properties: {
        info: {
            default: null,
            type: cc.Node
        },
        infoLabel: {
            default: null,
            type: cc.Label
        },
        infoBtnLabel: {
            default: null,
            type: cc.Label
        },
        bg: {
            default: null,
            type: cc.Node
        },
        gameEndAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onCollisionEnter: function (other, self) {
        if (other.tag == 0) {
            this.infoLabel.string = '挑战失败！';
            // this.infoBtnLabel.string = '再来一次';
            this.node.getComponent(dragonBones.ArmatureDisplay).playAnimation('Fall', 1);
            this.anim.play();
            // 游戏结束音效
            cc.audioEngine.stopAll();
            cc.audioEngine.play(this.gameEndAudio);
        } else if (other.tag == 2) {
            this.infoLabel.string = '挑战成功';
            // this.infoBtnLabel.string = '继续挑战';
            this.anim.play();
            this.node.getComponent(dragonBones.ArmatureDisplay).playAnimation('Walk', 0);
        }
        this.infoBtnLabel.string = '再来一次';
        this.stopBg = true;
    },

    onLoad() {
        cc.director.getCollisionManager().enabled = true;

        // 目标动画播放完毕回调奔跑动画(前提是当前播放的不是死亡动画)
        this.node.getComponent(dragonBones.ArmatureDisplay).on(dragonBones.EventObject.COMPLETE, function () {
            if (this.node.getComponent(dragonBones.ArmatureDisplay).animationName != 'Fall') {
                this.node.getComponent(dragonBones.ArmatureDisplay).playAnimation('Run', 0);
            };
        }, this)

        // 获得动画组件
        this.anim = this.info.getComponent(cc.Animation);

        // 将本脚本的this寄存在MoveBg脚本及Main脚本中，用以控制暂停
        this.stopBg = false;
        this.bg.getComponent('MoveBg').player = this;
        // this.node.parent.getComponent('Main').playerModule = this;
    },

    start() {

    },

    update(dt) {

    },
});
