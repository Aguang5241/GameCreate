"use strict";
cc._RFpush(module, '6bb266V8atHdb56fl6sfmwu', 'Game');
// Scripts\Game.js

var Bird = require('Bird');
var Background = require('Background');
var Constant = require('Constant');

var Storage = require('Storage');

var Game = cc.Class({
    'extends': cc.Component,

    properties: {
        // 管道纵向最大偏移值
        pipeMaxOffsetY: 150,
        // 上下管道间最小间隙
        pipeMinGap: 80,
        // 上下管道间最大间隙
        pipeMaxGap: 150,
        // 管道生成时间间隔
        pipeSpawnInterval: 4.5,
        // 管道生成时，屏幕外横向偏移位置
        pipeSpawnOffsetX: 30,
        // 重新刷新时间
        gameReflashTime: 5,
        // 形变动画播放间隔
        scoreScaleDuration: 0.2,
        // 游戏菜单节点
        gameMenu: {
            'default': null,
            type: cc.Node
        },
        // 小鸟对象
        bird: {
            'default': null,
            type: Bird
        },
        // 管道创建节点
        pipesNode: {
            'default': null,
            type: cc.Node
        },
        // 管道预制数组
        pipePrefabs: {
            'default': [],
            type: [cc.Prefab]
        },
        // 地板对象
        background: {
            'default': null,
            type: Background
        },
        // 游戏失败文字标签
        gameOverText: {
            'default': null,
            type: cc.Label
        },
        // 当前分数标签
        scoreText: {
            'default': null,
            type: cc.Label
        },
        // 最高分标签
        highScoreText: {
            'default': null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        // 初始化触摸事件
        this.setInputControl();
        // 初始化管道数组
        this.pipes = [];
        // 获取屏幕尺寸
        this.size = cc.winSize;
        // 获取地板的包围盒
        var groundBox = this.background.groundNode[0].getBoundingBox();
        // 获取地板顶部的纵坐标
        this.groundTop = groundBox.y + groundBox.height / 2;
        // 初始化游戏失败标志位
        this.isGameOver = false;
        // 初始化当前分数
        this.curScore = 0;
        // 开始游戏界面，如有历史最高分则显示该成绩
        if (Storage.getHighScore() > 0) {
            this.highScoreText.string = Constant.HIGHSCORE_TXT + Storage.getHighScore();
        }
    },

    setInputControl: function setInputControl() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: self._onTouchBegan.bind(self)
        }, self.node);
    },

    _onTouchBegan: function _onTouchBegan(touch, event) {
        if (this.isGameOver === true) return;
        this.bird.onJump();
    },

    onStartGame: function onStartGame() {
        // 关闭菜单节点显示
        this.gameMenu.active = false;
        // 小鸟开始下落
        this.bird.onStartDrop();
        // 从0开始显示分数
        this.scoreText.string = "" + this.curScore;
        // 启动管道生成定时器
        this.schedule(this.spawnPipes, this.pipeSpawnInterval);
        // 启动游戏逻辑更新定时器
        this.schedule(this.gameUpdate, Constant.GROUND_MOVE_INTERVAL);
    },

    spawnPipes: function spawnPipes() {
        // 从管道预制（上端），生成管道实例
        var pipeUp = cc.instantiate(this.pipePrefabs[Constant.PIPE_UP]);
        // 定义为上端类型
        pipeUp.getComponent('Pipe').init(Constant.PIPE_UP);
        // 获取管道的高度（上端与上端的相同）
        var pipeHeight = pipeUp.getComponent('cc.Sprite').spriteFrame.getRect().height;
        // 设置上端管道的横向起始位置（屏幕右端另加一定偏移）
        pipeUp.x = this.size.width / 2 + this.pipeSpawnOffsetX;
        // 设置上端管道的纵向起始位置（随机取偏移量）
        pipeUp.y = Math.floor(Math.random() * this.pipeMaxOffsetY) + pipeHeight / 2;
        // 下端生成逻辑基本与上端相同
        var pipeDown = cc.instantiate(this.pipePrefabs[Constant.PIPE_DOWN]);
        pipeDown.getComponent('Pipe').init(Constant.PIPE_DOWN);
        pipeDown.x = this.size.width / 2 + this.pipeSpawnOffsetX;
        // 随机生成上端与下端管道之间的间隙值（pipeMinGap与pipeMaxGap之间）
        var pipeGap = Math.floor(Math.random() * (this.pipeMaxGap - this.pipeMinGap)) + this.pipeMinGap;
        pipeDown.y = pipeUp.y - pipeGap - pipeHeight;
        // 添加管道到pipes节点上
        this.pipesNode.addChild(pipeUp);
        this.pipesNode.addChild(pipeDown);
        // 添加管道到管道数组中
        this.pipes.push(pipeUp);
        this.pipes.push(pipeDown);
    },

    gameUpdate: function gameUpdate() {
        for (var i = 0; i < this.pipes.length; i++) {
            // 获取当前管道对象节点
            var curPipeNode = this.pipes[i];
            // 对管道进行移动操作
            curPipeNode.x += Constant.GROUND_VX;

            // 获取小鸟的包围盒
            var birdBox = this.bird.node.getBoundingBox();
            // 获取当前管道的包围盒
            var pipeBox = curPipeNode.getBoundingBox();
            // var birdRect = new cc.Rect(birdBox.x - birdBox.width / 2, birdBox.y - birdBox.height / 2,
            //     birdBox.width, birdBox.height);
            // var pipeRect = new cc.Rect(pipeBox.x - pipeBox.width / 2, pipeBox.y - pipeBox.height / 2,
            //     pipeBox.width, pipeBox.height);
            // 根据两个矩形范围判断是否相交
            if (cc.Intersection.rectRect(birdBox, pipeBox)) {
                this.onGameOver();
                return;
            }

            // 获取当前管道对象
            var curPipe = curPipeNode.getComponent('Pipe');
            // 判断小鸟是否顺利通过管道，是则加分
            if (curPipeNode.x < this.bird.node.x && curPipe.isPassed === false && curPipe.type === Constant.PIPE_UP) {
                curPipe.isPassed = true;
                this.addScore();
            }

            // 超出屏幕范围的管道，从数组中移除，并从节点上删除
            if (curPipeNode.x < -(this.size.width / 2 + Constant.PIPE_SPAWN_OFFSET_X)) {
                this.pipes.splice(i, 1);
                this.pipesNode.removeChild(curPipeNode, true);
            }
        }

        // 小鸟触地，则死亡
        if (this.bird.node.y < this.groundTop) {
            this.onGameOver();
        }
    },

    addScore: function addScore() {
        // 加分
        this.curScore++;
        // 显示当前分数
        this.scoreText.string = "" + this.curScore;
        var action1 = cc.scaleTo(this.scoreScaleDuration, 1.1, 0.6);
        var action2 = cc.scaleTo(this.scoreScaleDuration, 0.8, 1.2);
        var action3 = cc.scaleTo(this.scoreScaleDuration, 1, 1);
        // 播放形变动画
        this.scoreText.node.runAction(cc.sequence(action1, action2, action3));
    },

    onGameOver: function onGameOver() {
        // 设置游戏失败标志位
        this.isGameOver = true;
        // 游戏失败，如超过最高分则成绩
        if (this.curScore > Storage.getHighScore()) {
            Storage.setHighScore(this.curScore);
        }
        // 死亡时，显示“Game Over”
        this.gameOverText.string = Constant.GAMEOVER_TXT;
        // 关闭所有定时器
        this.bird.unscheduleAllCallbacks();
        this.background.unscheduleAllCallbacks();
        this.unscheduleAllCallbacks();
        // 一定时间后，重新刷新游戏到开始状态
        this.schedule(function () {
            cc.director.loadScene('game');
        }, this.gameReflashTime);
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();