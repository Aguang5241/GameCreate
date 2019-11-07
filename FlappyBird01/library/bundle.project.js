require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Background":[function(require,module,exports){
"use strict";
cc._RFpush(module, '4a8a8g8fIlLSZ5xoRWc4YRl', 'Background');
// Scripts\Background.js

var Constant = require('Constant');

var Background = cc.Class({
    'extends': cc.Component,

    properties: {
        // 地板节点数组
        groundNode: {
            'default': [],
            type: [cc.Node]
        },
        // 地板图片对象
        groundImg: {
            'default': null,
            type: cc.Sprite
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        // 获取屏幕尺寸
        this._size = cc.winSize;
        // 获取地板图片的宽度
        this._width = this.groundImg.spriteFrame.getRect().width;
        // 启动“地板移动控制”计时器
        this.schedule(this.onGroundMove, Constant.GROUND_MOVE_INTERVAL);
    },

    onGroundMove: function onGroundMove() {
        this.groundNode[0].x += Constant.GROUND_VX;
        this.groundNode[1].x += Constant.GROUND_VX;
        if (this.groundNode[0].x + this._width / 2 < -this._size.width / 2) {
            this.groundNode[0].x = this.groundNode[1].x + this._width - 5;
        }
        if (this.groundNode[1].x + this._width / 2 < -this._size.width / 2) {
            this.groundNode[1].x = this.groundNode[0].x + this._width - 5;
        }
    }
});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{"Constant":"Constant"}],"Bird":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'dba40+MKV5FjpALbo9uDYLc', 'Bird');
// Scripts\Bird.js

cc.Class({
    'extends': cc.Component,

    properties: {
        // 小鸟重力值
        gravity: 0.5,
        // 小鸟弹跳值
        birdJump: 6.6,
        // 动画名称
        AnimName: '',
        // 弹跳音效
        jumpAudio: {
            'default': null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        // 获取本身的cc.Animation对象，并播放AnimName动画
        this.getComponent(cc.Animation).play(this.AnimName);
        // 初始化速度为0
        this.velocity = 0;
    },

    onStartDrop: function onStartDrop() {
        this.schedule(this.onDrop, 0.01);
    },

    onDrop: function onDrop() {
        this.node.y += this.velocity;
        this.velocity -= this.gravity;
    },

    onJump: function onJump() {
        // 弹跳时，重设向上的速度
        this.velocity = this.birdJump;
        // 播放弹跳音效
        cc.audioEngine.playEffect(this.jumpAudio, false);
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"Constant":[function(require,module,exports){
"use strict";
cc._RFpush(module, '1f331Khw8ZPUpFSgo3Y95tw', 'Constant');
// Scripts\Constant.js

var Constant = cc.Enum({
    // 地板移动时间间隔
    GROUND_MOVE_INTERVAL: 0.05,
    // 单位时间地板移动速度
    GROUND_VX: -5,
    // 上端管道序号为0
    PIPE_UP: 0,
    // 下端管道序号为1
    PIPE_DOWN: 1,
    // 游戏失败文字
    GAMEOVER_TXT: 'GAME OVER',
    // 最高分文字
    HIGHSCORE_TXT: 'HighScore: '
});

module.exports = Constant;

cc._RFpop();
},{}],"Game":[function(require,module,exports){
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
},{"Background":"Background","Bird":"Bird","Constant":"Constant","Storage":"Storage"}],"Pipe":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'fc122qToQhByr8kag01h1T3', 'Pipe');
// Scripts\Pipe.js

cc.Class({
    "extends": cc.Component,

    properties: {
        // 小鸟通过管道与否的标志位
        isPassed: false
    },

    // use this for initialization
    onLoad: function onLoad() {},

    init: function init(type) {
        // 设置管道的类型（上或下）
        this.type = type;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"Storage":[function(require,module,exports){
"use strict";
cc._RFpush(module, '66102528YBJXJl8YVn9PiMH', 'Storage');
// Scripts\Storage.js

var Storage = {
    getHighScore: function getHighScore() {
        var score = cc.sys.localStorage.getItem('HighScore') || 0;
        return parseInt(score);
    },

    setHighScore: function setHighScore(score) {
        cc.sys.localStorage.setItem('HighScore', score);
    }
};

module.exports = Storage;

cc._RFpop();
},{}]},{},["Constant","Background","Storage","Game","Bird","Pipe"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0NvY29zQ3JlYXRvci9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFzc2V0cy9TY3JpcHRzL0JhY2tncm91bmQuanMiLCJhc3NldHMvU2NyaXB0cy9CaXJkLmpzIiwiYXNzZXRzL1NjcmlwdHMvQ29uc3RhbnQuanMiLCJhc3NldHMvU2NyaXB0cy9HYW1lLmpzIiwiYXNzZXRzL1NjcmlwdHMvUGlwZS5qcyIsImFzc2V0cy9TY3JpcHRzL1N0b3JhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9OQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNGE4YThnOGZJbExTWjV4b1JXYzRZUmwnLCAnQmFja2dyb3VuZCcpO1xuLy8gU2NyaXB0c1xcQmFja2dyb3VuZC5qc1xuXG52YXIgQ29uc3RhbnQgPSByZXF1aXJlKCdDb25zdGFudCcpO1xuXG52YXIgQmFja2dyb3VuZCA9IGNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8g5Zyw5p2/6IqC54K55pWw57uEXG4gICAgICAgIGdyb3VuZE5vZGU6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogW10sXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV1cbiAgICAgICAgfSxcbiAgICAgICAgLy8g5Zyw5p2/5Zu+54mH5a+56LGhXG4gICAgICAgIGdyb3VuZEltZzoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIC8vIOiOt+WPluWxj+W5leWwuuWvuFxuICAgICAgICB0aGlzLl9zaXplID0gY2Mud2luU2l6ZTtcbiAgICAgICAgLy8g6I635Y+W5Zyw5p2/5Zu+54mH55qE5a695bqmXG4gICAgICAgIHRoaXMuX3dpZHRoID0gdGhpcy5ncm91bmRJbWcuc3ByaXRlRnJhbWUuZ2V0UmVjdCgpLndpZHRoO1xuICAgICAgICAvLyDlkK/liqjigJzlnLDmnb/np7vliqjmjqfliLbigJ3orqHml7blmahcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLm9uR3JvdW5kTW92ZSwgQ29uc3RhbnQuR1JPVU5EX01PVkVfSU5URVJWQUwpO1xuICAgIH0sXG5cbiAgICBvbkdyb3VuZE1vdmU6IGZ1bmN0aW9uIG9uR3JvdW5kTW92ZSgpIHtcbiAgICAgICAgdGhpcy5ncm91bmROb2RlWzBdLnggKz0gQ29uc3RhbnQuR1JPVU5EX1ZYO1xuICAgICAgICB0aGlzLmdyb3VuZE5vZGVbMV0ueCArPSBDb25zdGFudC5HUk9VTkRfVlg7XG4gICAgICAgIGlmICh0aGlzLmdyb3VuZE5vZGVbMF0ueCArIHRoaXMuX3dpZHRoIC8gMiA8IC10aGlzLl9zaXplLndpZHRoIC8gMikge1xuICAgICAgICAgICAgdGhpcy5ncm91bmROb2RlWzBdLnggPSB0aGlzLmdyb3VuZE5vZGVbMV0ueCArIHRoaXMuX3dpZHRoIC0gNTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ncm91bmROb2RlWzFdLnggKyB0aGlzLl93aWR0aCAvIDIgPCAtdGhpcy5fc2l6ZS53aWR0aCAvIDIpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JvdW5kTm9kZVsxXS54ID0gdGhpcy5ncm91bmROb2RlWzBdLnggKyB0aGlzLl93aWR0aCAtIDU7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnZGJhNDArTUtWNUZqcEFMYm85dURZTGMnLCAnQmlyZCcpO1xuLy8gU2NyaXB0c1xcQmlyZC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIOWwj+m4n+mHjeWKm+WAvFxuICAgICAgICBncmF2aXR5OiAwLjUsXG4gICAgICAgIC8vIOWwj+m4n+W8uei3s+WAvFxuICAgICAgICBiaXJkSnVtcDogNi42LFxuICAgICAgICAvLyDliqjnlLvlkI3np7BcbiAgICAgICAgQW5pbU5hbWU6ICcnLFxuICAgICAgICAvLyDlvLnot7Ppn7PmlYhcbiAgICAgICAganVtcEF1ZGlvOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICAvLyDojrflj5bmnKzouqvnmoRjYy5BbmltYXRpb27lr7nosaHvvIzlubbmkq3mlL5BbmltTmFtZeWKqOeUu1xuICAgICAgICB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkodGhpcy5BbmltTmFtZSk7XG4gICAgICAgIC8vIOWIneWni+WMlumAn+W6puS4ujBcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IDA7XG4gICAgfSxcblxuICAgIG9uU3RhcnREcm9wOiBmdW5jdGlvbiBvblN0YXJ0RHJvcCgpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLm9uRHJvcCwgMC4wMSk7XG4gICAgfSxcblxuICAgIG9uRHJvcDogZnVuY3Rpb24gb25Ecm9wKCkge1xuICAgICAgICB0aGlzLm5vZGUueSArPSB0aGlzLnZlbG9jaXR5O1xuICAgICAgICB0aGlzLnZlbG9jaXR5IC09IHRoaXMuZ3Jhdml0eTtcbiAgICB9LFxuXG4gICAgb25KdW1wOiBmdW5jdGlvbiBvbkp1bXAoKSB7XG4gICAgICAgIC8vIOW8uei3s+aXtu+8jOmHjeiuvuWQkeS4iueahOmAn+W6plxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy5iaXJkSnVtcDtcbiAgICAgICAgLy8g5pKt5pS+5by56Lez6Z+z5pWIXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5qdW1wQXVkaW8sIGZhbHNlKTtcbiAgICB9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICcxZjMzMUtodzhaUFVwRlNnbzNZOTV0dycsICdDb25zdGFudCcpO1xuLy8gU2NyaXB0c1xcQ29uc3RhbnQuanNcblxudmFyIENvbnN0YW50ID0gY2MuRW51bSh7XG4gICAgLy8g5Zyw5p2/56e75Yqo5pe26Ze06Ze06ZqUXG4gICAgR1JPVU5EX01PVkVfSU5URVJWQUw6IDAuMDUsXG4gICAgLy8g5Y2V5L2N5pe26Ze05Zyw5p2/56e75Yqo6YCf5bqmXG4gICAgR1JPVU5EX1ZYOiAtNSxcbiAgICAvLyDkuIrnq6/nrqHpgZPluo/lj7fkuLowXG4gICAgUElQRV9VUDogMCxcbiAgICAvLyDkuIvnq6/nrqHpgZPluo/lj7fkuLoxXG4gICAgUElQRV9ET1dOOiAxLFxuICAgIC8vIOa4uOaIj+Wksei0peaWh+Wtl1xuICAgIEdBTUVPVkVSX1RYVDogJ0dBTUUgT1ZFUicsXG4gICAgLy8g5pyA6auY5YiG5paH5a2XXG4gICAgSElHSFNDT1JFX1RYVDogJ0hpZ2hTY29yZTogJ1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29uc3RhbnQ7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc2YmIyNjZWOGF0SGRiNTZmbDZzZm13dScsICdHYW1lJyk7XG4vLyBTY3JpcHRzXFxHYW1lLmpzXG5cbnZhciBCaXJkID0gcmVxdWlyZSgnQmlyZCcpO1xudmFyIEJhY2tncm91bmQgPSByZXF1aXJlKCdCYWNrZ3JvdW5kJyk7XG52YXIgQ29uc3RhbnQgPSByZXF1aXJlKCdDb25zdGFudCcpO1xuXG52YXIgU3RvcmFnZSA9IHJlcXVpcmUoJ1N0b3JhZ2UnKTtcblxudmFyIEdhbWUgPSBjYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIOeuoemBk+e6teWQkeacgOWkp+WBj+enu+WAvFxuICAgICAgICBwaXBlTWF4T2Zmc2V0WTogMTUwLFxuICAgICAgICAvLyDkuIrkuIvnrqHpgZPpl7TmnIDlsI/pl7TpmplcbiAgICAgICAgcGlwZU1pbkdhcDogODAsXG4gICAgICAgIC8vIOS4iuS4i+euoemBk+mXtOacgOWkp+mXtOmamVxuICAgICAgICBwaXBlTWF4R2FwOiAxNTAsXG4gICAgICAgIC8vIOeuoemBk+eUn+aIkOaXtumXtOmXtOmalFxuICAgICAgICBwaXBlU3Bhd25JbnRlcnZhbDogNC41LFxuICAgICAgICAvLyDnrqHpgZPnlJ/miJDml7bvvIzlsY/luZXlpJbmqKrlkJHlgY/np7vkvY3nva5cbiAgICAgICAgcGlwZVNwYXduT2Zmc2V0WDogMzAsXG4gICAgICAgIC8vIOmHjeaWsOWIt+aWsOaXtumXtFxuICAgICAgICBnYW1lUmVmbGFzaFRpbWU6IDUsXG4gICAgICAgIC8vIOW9ouWPmOWKqOeUu+aSreaUvumXtOmalFxuICAgICAgICBzY29yZVNjYWxlRHVyYXRpb246IDAuMixcbiAgICAgICAgLy8g5ri45oiP6I+c5Y2V6IqC54K5XG4gICAgICAgIGdhbWVNZW51OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIC8vIOWwj+m4n+WvueixoVxuICAgICAgICBiaXJkOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBCaXJkXG4gICAgICAgIH0sXG4gICAgICAgIC8vIOeuoemBk+WIm+W7uuiKgueCuVxuICAgICAgICBwaXBlc05vZGU6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgLy8g566h6YGT6aKE5Yi25pWw57uEXG4gICAgICAgIHBpcGVQcmVmYWJzOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IFtdLFxuICAgICAgICAgICAgdHlwZTogW2NjLlByZWZhYl1cbiAgICAgICAgfSxcbiAgICAgICAgLy8g5Zyw5p2/5a+56LGhXG4gICAgICAgIGJhY2tncm91bmQ6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IEJhY2tncm91bmRcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5ri45oiP5aSx6LSl5paH5a2X5qCH562+XG4gICAgICAgIGdhbWVPdmVyVGV4dDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5b2T5YmN5YiG5pWw5qCH562+XG4gICAgICAgIHNjb3JlVGV4dDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5pyA6auY5YiG5qCH562+XG4gICAgICAgIGhpZ2hTY29yZVRleHQ6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIC8vIOWIneWni+WMluinpuaRuOS6i+S7tlxuICAgICAgICB0aGlzLnNldElucHV0Q29udHJvbCgpO1xuICAgICAgICAvLyDliJ3lp4vljJbnrqHpgZPmlbDnu4RcbiAgICAgICAgdGhpcy5waXBlcyA9IFtdO1xuICAgICAgICAvLyDojrflj5blsY/luZXlsLrlr7hcbiAgICAgICAgdGhpcy5zaXplID0gY2Mud2luU2l6ZTtcbiAgICAgICAgLy8g6I635Y+W5Zyw5p2/55qE5YyF5Zu055uSXG4gICAgICAgIHZhciBncm91bmRCb3ggPSB0aGlzLmJhY2tncm91bmQuZ3JvdW5kTm9kZVswXS5nZXRCb3VuZGluZ0JveCgpO1xuICAgICAgICAvLyDojrflj5blnLDmnb/pobbpg6jnmoTnurXlnZDmoIdcbiAgICAgICAgdGhpcy5ncm91bmRUb3AgPSBncm91bmRCb3gueSArIGdyb3VuZEJveC5oZWlnaHQgLyAyO1xuICAgICAgICAvLyDliJ3lp4vljJbmuLjmiI/lpLHotKXmoIflv5fkvY1cbiAgICAgICAgdGhpcy5pc0dhbWVPdmVyID0gZmFsc2U7XG4gICAgICAgIC8vIOWIneWni+WMluW9k+WJjeWIhuaVsFxuICAgICAgICB0aGlzLmN1clNjb3JlID0gMDtcbiAgICAgICAgLy8g5byA5aeL5ri45oiP55WM6Z2i77yM5aaC5pyJ5Y6G5Y+y5pyA6auY5YiG5YiZ5pi+56S66K+l5oiQ57upXG4gICAgICAgIGlmIChTdG9yYWdlLmdldEhpZ2hTY29yZSgpID4gMCkge1xuICAgICAgICAgICAgdGhpcy5oaWdoU2NvcmVUZXh0LnN0cmluZyA9IENvbnN0YW50LkhJR0hTQ09SRV9UWFQgKyBTdG9yYWdlLmdldEhpZ2hTY29yZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldElucHV0Q29udHJvbDogZnVuY3Rpb24gc2V0SW5wdXRDb250cm9sKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcih7XG4gICAgICAgICAgICBldmVudDogY2MuRXZlbnRMaXN0ZW5lci5UT1VDSF9PTkVfQllfT05FLFxuICAgICAgICAgICAgb25Ub3VjaEJlZ2FuOiBzZWxmLl9vblRvdWNoQmVnYW4uYmluZChzZWxmKVxuICAgICAgICB9LCBzZWxmLm5vZGUpO1xuICAgIH0sXG5cbiAgICBfb25Ub3VjaEJlZ2FuOiBmdW5jdGlvbiBfb25Ub3VjaEJlZ2FuKHRvdWNoLCBldmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0dhbWVPdmVyID09PSB0cnVlKSByZXR1cm47XG4gICAgICAgIHRoaXMuYmlyZC5vbkp1bXAoKTtcbiAgICB9LFxuXG4gICAgb25TdGFydEdhbWU6IGZ1bmN0aW9uIG9uU3RhcnRHYW1lKCkge1xuICAgICAgICAvLyDlhbPpl63oj5zljZXoioLngrnmmL7npLpcbiAgICAgICAgdGhpcy5nYW1lTWVudS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgLy8g5bCP6bif5byA5aeL5LiL6JC9XG4gICAgICAgIHRoaXMuYmlyZC5vblN0YXJ0RHJvcCgpO1xuICAgICAgICAvLyDku44w5byA5aeL5pi+56S65YiG5pWwXG4gICAgICAgIHRoaXMuc2NvcmVUZXh0LnN0cmluZyA9IFwiXCIgKyB0aGlzLmN1clNjb3JlO1xuICAgICAgICAvLyDlkK/liqjnrqHpgZPnlJ/miJDlrprml7blmahcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnNwYXduUGlwZXMsIHRoaXMucGlwZVNwYXduSW50ZXJ2YWwpO1xuICAgICAgICAvLyDlkK/liqjmuLjmiI/pgLvovpHmm7TmlrDlrprml7blmahcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmdhbWVVcGRhdGUsIENvbnN0YW50LkdST1VORF9NT1ZFX0lOVEVSVkFMKTtcbiAgICB9LFxuXG4gICAgc3Bhd25QaXBlczogZnVuY3Rpb24gc3Bhd25QaXBlcygpIHtcbiAgICAgICAgLy8g5LuO566h6YGT6aKE5Yi277yI5LiK56uv77yJ77yM55Sf5oiQ566h6YGT5a6e5L6LXG4gICAgICAgIHZhciBwaXBlVXAgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBpcGVQcmVmYWJzW0NvbnN0YW50LlBJUEVfVVBdKTtcbiAgICAgICAgLy8g5a6a5LmJ5Li65LiK56uv57G75Z6LXG4gICAgICAgIHBpcGVVcC5nZXRDb21wb25lbnQoJ1BpcGUnKS5pbml0KENvbnN0YW50LlBJUEVfVVApO1xuICAgICAgICAvLyDojrflj5bnrqHpgZPnmoTpq5jluqbvvIjkuIrnq6/kuI7kuIrnq6/nmoTnm7jlkIzvvIlcbiAgICAgICAgdmFyIHBpcGVIZWlnaHQgPSBwaXBlVXAuZ2V0Q29tcG9uZW50KCdjYy5TcHJpdGUnKS5zcHJpdGVGcmFtZS5nZXRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICAvLyDorr7nva7kuIrnq6/nrqHpgZPnmoTmqKrlkJHotbflp4vkvY3nva7vvIjlsY/luZXlj7Pnq6/lj6bliqDkuIDlrprlgY/np7vvvIlcbiAgICAgICAgcGlwZVVwLnggPSB0aGlzLnNpemUud2lkdGggLyAyICsgdGhpcy5waXBlU3Bhd25PZmZzZXRYO1xuICAgICAgICAvLyDorr7nva7kuIrnq6/nrqHpgZPnmoTnurXlkJHotbflp4vkvY3nva7vvIjpmo/mnLrlj5blgY/np7vph4/vvIlcbiAgICAgICAgcGlwZVVwLnkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBpcGVNYXhPZmZzZXRZKSArIHBpcGVIZWlnaHQgLyAyO1xuICAgICAgICAvLyDkuIvnq6/nlJ/miJDpgLvovpHln7rmnKzkuI7kuIrnq6/nm7jlkIxcbiAgICAgICAgdmFyIHBpcGVEb3duID0gY2MuaW5zdGFudGlhdGUodGhpcy5waXBlUHJlZmFic1tDb25zdGFudC5QSVBFX0RPV05dKTtcbiAgICAgICAgcGlwZURvd24uZ2V0Q29tcG9uZW50KCdQaXBlJykuaW5pdChDb25zdGFudC5QSVBFX0RPV04pO1xuICAgICAgICBwaXBlRG93bi54ID0gdGhpcy5zaXplLndpZHRoIC8gMiArIHRoaXMucGlwZVNwYXduT2Zmc2V0WDtcbiAgICAgICAgLy8g6ZqP5py655Sf5oiQ5LiK56uv5LiO5LiL56uv566h6YGT5LmL6Ze055qE6Ze06ZqZ5YC877yIcGlwZU1pbkdhcOS4jnBpcGVNYXhHYXDkuYvpl7TvvIlcbiAgICAgICAgdmFyIHBpcGVHYXAgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodGhpcy5waXBlTWF4R2FwIC0gdGhpcy5waXBlTWluR2FwKSkgKyB0aGlzLnBpcGVNaW5HYXA7XG4gICAgICAgIHBpcGVEb3duLnkgPSBwaXBlVXAueSAtIHBpcGVHYXAgLSBwaXBlSGVpZ2h0O1xuICAgICAgICAvLyDmt7vliqDnrqHpgZPliLBwaXBlc+iKgueCueS4ilxuICAgICAgICB0aGlzLnBpcGVzTm9kZS5hZGRDaGlsZChwaXBlVXApO1xuICAgICAgICB0aGlzLnBpcGVzTm9kZS5hZGRDaGlsZChwaXBlRG93bik7XG4gICAgICAgIC8vIOa3u+WKoOeuoemBk+WIsOeuoemBk+aVsOe7hOS4rVxuICAgICAgICB0aGlzLnBpcGVzLnB1c2gocGlwZVVwKTtcbiAgICAgICAgdGhpcy5waXBlcy5wdXNoKHBpcGVEb3duKTtcbiAgICB9LFxuXG4gICAgZ2FtZVVwZGF0ZTogZnVuY3Rpb24gZ2FtZVVwZGF0ZSgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBpcGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyDojrflj5blvZPliY3nrqHpgZPlr7nosaHoioLngrlcbiAgICAgICAgICAgIHZhciBjdXJQaXBlTm9kZSA9IHRoaXMucGlwZXNbaV07XG4gICAgICAgICAgICAvLyDlr7nnrqHpgZPov5vooYznp7vliqjmk43kvZxcbiAgICAgICAgICAgIGN1clBpcGVOb2RlLnggKz0gQ29uc3RhbnQuR1JPVU5EX1ZYO1xuXG4gICAgICAgICAgICAvLyDojrflj5blsI/puJ/nmoTljIXlm7Tnm5JcbiAgICAgICAgICAgIHZhciBiaXJkQm94ID0gdGhpcy5iaXJkLm5vZGUuZ2V0Qm91bmRpbmdCb3goKTtcbiAgICAgICAgICAgIC8vIOiOt+WPluW9k+WJjeeuoemBk+eahOWMheWbtOebklxuICAgICAgICAgICAgdmFyIHBpcGVCb3ggPSBjdXJQaXBlTm9kZS5nZXRCb3VuZGluZ0JveCgpO1xuICAgICAgICAgICAgLy8gdmFyIGJpcmRSZWN0ID0gbmV3IGNjLlJlY3QoYmlyZEJveC54IC0gYmlyZEJveC53aWR0aCAvIDIsIGJpcmRCb3gueSAtIGJpcmRCb3guaGVpZ2h0IC8gMixcbiAgICAgICAgICAgIC8vICAgICBiaXJkQm94LndpZHRoLCBiaXJkQm94LmhlaWdodCk7XG4gICAgICAgICAgICAvLyB2YXIgcGlwZVJlY3QgPSBuZXcgY2MuUmVjdChwaXBlQm94LnggLSBwaXBlQm94LndpZHRoIC8gMiwgcGlwZUJveC55IC0gcGlwZUJveC5oZWlnaHQgLyAyLFxuICAgICAgICAgICAgLy8gICAgIHBpcGVCb3gud2lkdGgsIHBpcGVCb3guaGVpZ2h0KTtcbiAgICAgICAgICAgIC8vIOagueaNruS4pOS4quefqeW9ouiMg+WbtOWIpOaWreaYr+WQpuebuOS6pFxuICAgICAgICAgICAgaWYgKGNjLkludGVyc2VjdGlvbi5yZWN0UmVjdChiaXJkQm94LCBwaXBlQm94KSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25HYW1lT3ZlcigpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g6I635Y+W5b2T5YmN566h6YGT5a+56LGhXG4gICAgICAgICAgICB2YXIgY3VyUGlwZSA9IGN1clBpcGVOb2RlLmdldENvbXBvbmVudCgnUGlwZScpO1xuICAgICAgICAgICAgLy8g5Yik5pat5bCP6bif5piv5ZCm6aG65Yip6YCa6L+H566h6YGT77yM5piv5YiZ5Yqg5YiGXG4gICAgICAgICAgICBpZiAoY3VyUGlwZU5vZGUueCA8IHRoaXMuYmlyZC5ub2RlLnggJiYgY3VyUGlwZS5pc1Bhc3NlZCA9PT0gZmFsc2UgJiYgY3VyUGlwZS50eXBlID09PSBDb25zdGFudC5QSVBFX1VQKSB7XG4gICAgICAgICAgICAgICAgY3VyUGlwZS5pc1Bhc3NlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTY29yZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDotoXlh7rlsY/luZXojIPlm7TnmoTnrqHpgZPvvIzku47mlbDnu4TkuK3np7vpmaTvvIzlubbku47oioLngrnkuIrliKDpmaRcbiAgICAgICAgICAgIGlmIChjdXJQaXBlTm9kZS54IDwgLSh0aGlzLnNpemUud2lkdGggLyAyICsgQ29uc3RhbnQuUElQRV9TUEFXTl9PRkZTRVRfWCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBpcGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpcGVzTm9kZS5yZW1vdmVDaGlsZChjdXJQaXBlTm9kZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyDlsI/puJ/op6blnLDvvIzliJnmrbvkuqFcbiAgICAgICAgaWYgKHRoaXMuYmlyZC5ub2RlLnkgPCB0aGlzLmdyb3VuZFRvcCkge1xuICAgICAgICAgICAgdGhpcy5vbkdhbWVPdmVyKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYWRkU2NvcmU6IGZ1bmN0aW9uIGFkZFNjb3JlKCkge1xuICAgICAgICAvLyDliqDliIZcbiAgICAgICAgdGhpcy5jdXJTY29yZSsrO1xuICAgICAgICAvLyDmmL7npLrlvZPliY3liIbmlbBcbiAgICAgICAgdGhpcy5zY29yZVRleHQuc3RyaW5nID0gXCJcIiArIHRoaXMuY3VyU2NvcmU7XG4gICAgICAgIHZhciBhY3Rpb24xID0gY2Muc2NhbGVUbyh0aGlzLnNjb3JlU2NhbGVEdXJhdGlvbiwgMS4xLCAwLjYpO1xuICAgICAgICB2YXIgYWN0aW9uMiA9IGNjLnNjYWxlVG8odGhpcy5zY29yZVNjYWxlRHVyYXRpb24sIDAuOCwgMS4yKTtcbiAgICAgICAgdmFyIGFjdGlvbjMgPSBjYy5zY2FsZVRvKHRoaXMuc2NvcmVTY2FsZUR1cmF0aW9uLCAxLCAxKTtcbiAgICAgICAgLy8g5pKt5pS+5b2i5Y+Y5Yqo55S7XG4gICAgICAgIHRoaXMuc2NvcmVUZXh0Lm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGFjdGlvbjEsIGFjdGlvbjIsIGFjdGlvbjMpKTtcbiAgICB9LFxuXG4gICAgb25HYW1lT3ZlcjogZnVuY3Rpb24gb25HYW1lT3ZlcigpIHtcbiAgICAgICAgLy8g6K6+572u5ri45oiP5aSx6LSl5qCH5b+X5L2NXG4gICAgICAgIHRoaXMuaXNHYW1lT3ZlciA9IHRydWU7XG4gICAgICAgIC8vIOa4uOaIj+Wksei0pe+8jOWmgui2hei/h+acgOmrmOWIhuWImeaIkOe7qVxuICAgICAgICBpZiAodGhpcy5jdXJTY29yZSA+IFN0b3JhZ2UuZ2V0SGlnaFNjb3JlKCkpIHtcbiAgICAgICAgICAgIFN0b3JhZ2Uuc2V0SGlnaFNjb3JlKHRoaXMuY3VyU2NvcmUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIOatu+S6oeaXtu+8jOaYvuekuuKAnEdhbWUgT3ZlcuKAnVxuICAgICAgICB0aGlzLmdhbWVPdmVyVGV4dC5zdHJpbmcgPSBDb25zdGFudC5HQU1FT1ZFUl9UWFQ7XG4gICAgICAgIC8vIOWFs+mXreaJgOacieWumuaXtuWZqFxuICAgICAgICB0aGlzLmJpcmQudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xuICAgICAgICB0aGlzLmJhY2tncm91bmQudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcbiAgICAgICAgLy8g5LiA5a6a5pe26Ze05ZCO77yM6YeN5paw5Yi35paw5ri45oiP5Yiw5byA5aeL54q25oCBXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJyk7XG4gICAgICAgIH0sIHRoaXMuZ2FtZVJlZmxhc2hUaW1lKTtcbiAgICB9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdmYzEyMnFUb1FoQnlyOGthZzAxaDFUMycsICdQaXBlJyk7XG4vLyBTY3JpcHRzXFxQaXBlLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyDlsI/puJ/pgJrov4fnrqHpgZPkuI7lkKbnmoTmoIflv5fkvY1cbiAgICAgICAgaXNQYXNzZWQ6IGZhbHNlXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KHR5cGUpIHtcbiAgICAgICAgLy8g6K6+572u566h6YGT55qE57G75Z6L77yI5LiK5oiW5LiL77yJXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgfVxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNjYxMDI1MjhZQkpYSmw4WVZuOVBpTUgnLCAnU3RvcmFnZScpO1xuLy8gU2NyaXB0c1xcU3RvcmFnZS5qc1xuXG52YXIgU3RvcmFnZSA9IHtcbiAgICBnZXRIaWdoU2NvcmU6IGZ1bmN0aW9uIGdldEhpZ2hTY29yZSgpIHtcbiAgICAgICAgdmFyIHNjb3JlID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdIaWdoU2NvcmUnKSB8fCAwO1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoc2NvcmUpO1xuICAgIH0sXG5cbiAgICBzZXRIaWdoU2NvcmU6IGZ1bmN0aW9uIHNldEhpZ2hTY29yZShzY29yZSkge1xuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0hpZ2hTY29yZScsIHNjb3JlKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0b3JhZ2U7XG5cbmNjLl9SRnBvcCgpOyJdfQ==
