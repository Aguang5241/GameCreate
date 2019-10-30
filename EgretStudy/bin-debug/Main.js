//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        // 设定偏移量
        var offsetX;
        var offsetY;
        // 圆
        var circle = new egret.Shape();
        circle.graphics.beginFill(0xff0000);
        circle.graphics.drawCircle(25, 25, 25);
        circle.graphics.endFill();
        this.addChild(circle);
        // 触发startMove()方法
        circle.touchEnabled = true;
        circle.addEventListener(egret.TouchEvent.TOUCH_BEGIN, startMove, this);
        // 触发endMove()方法
        circle.addEventListener(egret.TouchEvent.TOUCH_END, endMove, this);
        // 定义相关函数
        function startMove(e) {
            offsetX = e.stageX - circle.x;
            offsetY = e.stageY - circle.y;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
        }
        function endMove(e) {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
        }
        function onMove(e) {
            circle.x = e.stageX - offsetX;
            circle.y = e.stageY - offsetY;
        }
        // // 创建container实例继承自egret.DisplayObjectContainer
        // var container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        // container.x = 200;
        // container.y = 200;
        // this.addChild(container)
        // // 向其中添加一个红色的圆形
        // var circle: egret.Shape = new egret.Shape();
        // circle.graphics.beginFill(0xff0000);
        // circle.graphics.drawCircle(25, 25, 25);
        // circle.graphics.endFill();
        // container.addChild(circle);
        // // 增加点击事件
        // circle.touchEnabled = true;
        // circle.addEventListener(egret.TouchEvent.TOUCH_TAP, onClick, this);
        // function onClick(): void {
        //     // 将舞台坐标(0, 0)赋予container本地坐标
        //     // var targetPoint: egret.Point = container.globalToLocal(0, 0);
        //     // 将本地坐标(0, 0)赋予舞台坐标       
        //     var targetPoint: egret.Point = container.localToGlobal(0, 0);
        //     // 重新定位圆
        //     circle.x = targetPoint.x;
        //     circle.y = targetPoint.y;
        // }
        // var _myGrid: MyGrid = new MyGrid();
        // this.addChild(_myGrid);
        // var _myGrid2: GridSprite = new GridSprite();
        // this.addChild(_myGrid2);
        // egret.lifecycle.addLifecycleListener((context) => {
        //     // custom lifecycle plugin
        //     context.onUpdate = () => {
        //     }
        // })
        // egret.lifecycle.onPause = () => {
        //     egret.ticker.pause();
        // }
        // egret.lifecycle.onResume = () => {
        //     egret.ticker.resume();
        // }
        // this.runGame().catch(e => {
        //     console.log(e);
        // })
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
// private drawBorderProgress(): egret.DisplayObjectContainer {
//     var container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
//     var w: number = 100;
//     var h: number = 100;
//     var r: number = Math.max(w, h) / 2 * 1.5;
//     var bitmap = new egret.Bitmap(RES.getRes(key));
//     container.addChild(bitmap);
//     bitmap.width = w;
//     bitmap.height = h;
//     var shape: egret.Shape = new egret.Shape();
//     shape.x = bitmap.width / 2;
//     shape.y = bitmap.height / 2;
//     bitmap.mask = shape;
//     container.addChild(shape);
//     var angle = 0;
//     egret.startTick(function (timeStamp: number): boolean {
//         angle += 1;
//         changeGraphics(angle);
//         angle = angle % 360;
//         return true;
//     }, this);
//     return container;
//     function changeGraphics(angle) {
//         shape.graphics.clear();
//         shape.graphics.beginFill(0x00ffff, 1);
//         shape.graphics.lineTo(r, 0);
//         shape.graphics.drawArc(0, 0, r, 0, angle * Math.PI / 180, true);
//         shape.graphics.lineTo(0, 0);
//         shape.graphics.endFill();
//     }
// }
/**
 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
 * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
 */
// private createBitmapByName(name: string) {
//     let result = new egret.Bitmap();
//     let texture: egret.Texture = RES.getRes(name);
//     result.texture = texture;
//     return result;
// }
/**
 * 描述文件加载成功，开始播放动画
 * Description file loading is successful, start to play the animation
 */
// private startAnimation(result: string[]) {
//     let parser = new egret.HtmlTextParser();
//     let textflowArr = result.map(text => parser.parse(text));
//     let textfield = this.textfield;
//     let count = -1;
//     let change = () => {
//         count++;
//         if (count >= textflowArr.length) {
//             count = 0;
//         }
//         let textFlow = textflowArr[count];
//         // 切换描述内容
//         // Switch to described content
//         textfield.textFlow = textFlow;
//         let tw = egret.Tween.get(textfield);
//         tw.to({ "alpha": 1 }, 200);
//         tw.wait(2000);
//         tw.to({ "alpha": 0 }, 200);
//         tw.call(change, this);
//     };
//     change();
// }
// };
// 自定义容器
// class GridSprite extends egret.Sprite {
//     public constructor() {
//         super();
//         this.drawGrid();
//     }
//     private drawGrid() {
//         this.graphics.beginFill(0x0000ff);
//         this.graphics.drawRect(0, 0, 50, 50);
//         this.graphics.endFill();
//         this.graphics.beginFill(0x0000ff);
//         this.graphics.drawRect(50, 50, 50, 50);
//         this.graphics.endFill();
//         this.graphics.beginFill(0xff0000);
//         this.graphics.drawRect(50, 0, 50, 50);
//         this.graphics.endFill();
//         this.graphics.beginFill(0xff0000);
//         this.graphics.drawRect(0, 50, 50, 50);
//         this.graphics.endFill();
//     }
// }
// 自动以显示对象类
// class MyGrid extends egret.Shape {
//     public constructor() {
//         super();
//         this.drawGrid();
//     }
//     private drawGrid() {
//         this.graphics.beginFill(0x0000ff);
//         this.graphics.drawRect(0, 0, 50, 50);
//         this.graphics.endFill();
//         this.graphics.beginFill(0x0000ff);
//         this.graphics.drawRect(50, 50, 50, 50);
//         this.graphics.endFill();
//         this.graphics.beginFill(0xff0000);
//         this.graphics.drawRect(50, 0, 50, 50);
//         this.graphics.endFill();
//         this.graphics.beginFill(0xff0000);
//         this.graphics.drawRect(0, 50, 50, 50);
//         this.graphics.endFill();
//     }
// } 
