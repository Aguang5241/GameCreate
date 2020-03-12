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
        // 引用星星预制资源
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 指定星星消失事件范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点，确定星星高度
        ground: {
            default: null,
            type: cc.Node
        },
        // 玩家节点，获取玩家高度
        player: {
            default: null,
            type: cc.Node
        },
        // 得分属性
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        // 得分音效
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },

        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad: function () {
        // 获取地平面y轴坐标
        this.groundY = this.ground.y + this.ground.height / 2;
        // 初始化计时器
        this.timer = 0;
        this.starDuration = 0;
        // 生成一个新的星星
        this.spawnNewStar();
        // 初始化分数
        this.score = 0;
    },

    spawnNewStar: function () {
        // 使用给定的模板在场景中生成一个新的节点
        var newStar = cc.instantiate(this.starPrefab);
        // 添加到canvas节点之下
        this.node.addChild(newStar);
        // 位置随记
        newStar.setPosition(this.getNewStarPosition());
        // 在星星组件上暂存Game对象的引用
        newStar.getComponent('Star').game = this;
        // 重置计时器
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    getNewStarPosition: function () {
        var randX = 0;
        // 根据地面位置与主角跳跃的高度，随记得到一个星星的y坐标
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight;
        // 根据屏幕宽度随记生成星星的x坐标
        var maxX = this.node.width / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        // 返回坐标
        return cc.v2(randX, randY);
    },

    start() {

    },

    // update (dt) {},

    update: function(dt) {
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    },

    gainScore: function() {
        // 更新得分
        this.score += 1;
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
        // 播放声音
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver: function() {
        this.player.stopAllActions();
        cc.director.loadScene('game');
    }
});
