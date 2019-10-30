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

class Main extends egret.DisplayObjectContainer {



    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        // 设定偏移量
        var offsetX: number;
        var offsetY: number;
        // 圆
        var circle: egret.Shape = new egret.Shape();
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
        function startMove(e: egret.TouchEvent): void {
            offsetX = e.stageX - circle.x;
            offsetY = e.stageY - circle.y;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
        }
        function endMove(e: egret.TouchEvent): void {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
        }
        function onMove(e: egret.TouchEvent): void {
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



    }

    // private async runGame() {
    //     await this.loadResource()
    //     this.createGameScene();
    //     const result = await RES.getResAsync("description_json")
    //     this.startAnimation(result);
    //     await platform.login();
    //     const userInfo = await platform.getUserInfo();
    //     console.log(userInfo);

    // }

    // private async loadResource() {
    //     try {
    //         const loadingView = new LoadingUI();
    //         this.stage.addChild(loadingView);
    //         await RES.loadConfig("resource/default.res.json", "resource/");
    //         await RES.loadGroup("preload", 0, loadingView);
    //         this.stage.removeChild(loadingView);
    //     }
    //     catch (e) {
    //         console.error(e);
    //     }
    // }

    // private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    // private createGameScene() {
    //     console.log('GameSceneClear');



        // var shapeTest: egret.Shape = new egret.Shape();
        // shapeTest.graphics.beginFill(0xeeeeee);
        // shapeTest.graphics.drawRect(0, 0, 100, 300);
        // shapeTest.graphics.endFill();
        // shapeTest.x = 100;
        // shapeTest.y = 100;
        // shapeTest.scaleX = 0.5;
        // shapeTest.scaleY = 0.5;
        // shapeTest.alpha = 0.5;
        // shapeTest.rotation = 30;
        // this.addChild(shapeTest);

        // // 矩形绘制
        // var shp: egret.Shape = new egret.Shape();
        // // 定位
        // shp.x = 20;
        // shp.y = 20;
        // // 描边（线宽及颜色）
        // shp.graphics.lineStyle(10, 0x00ff00)
        // // 填充颜色（16进制颜色及透明度）
        // shp.graphics.beginFill(0xff0000, 0.5);
        // // 绘制矩形
        // shp.graphics.drawRect(0, 0, 100, 200);
        // // 结束绘制
        // shp.graphics.endFill();
        // this.addChild(shp);

        // // 圆形绘制
        // var shp2: egret.Shape = new egret.Shape();
        // shp2.x = 200;
        // shp2.y = 100;
        // shp2.graphics.lineStyle(10, 0x00ff00);
        // shp2.graphics.beginFill(0xff0000, 0.5);
        // // x轴坐标，y轴坐标，半径
        // shp2.graphics.drawCircle(0, 0, 50);
        // shp2.graphics.endFill();
        // this.addChild(shp2);

        // // 直线绘制
        // var shp3: egret.Shape = new egret.Shape();
        // shp3.graphics.lineStyle(2, 0x00ff00);
        // // 起点坐标
        // shp3.graphics.moveTo(200, 100);
        // // 轨迹点坐标
        // shp3.graphics.lineTo(300, 200);
        // shp3.graphics.lineTo(200, 300);
        // shp3.graphics.endFill();
        // this.addChild(shp3);

        // // 曲线绘制
        // var shp4: egret.Shape = new egret.Shape();
        // shp4.graphics.lineStyle(2, 0xeeeeee);
        // // 二次贝塞尔曲线起点坐标 
        // shp4.graphics.moveTo(201, 301);
        // // 二次贝塞尔曲线顶点与终点坐标
        // shp4.graphics.curveTo(300, 400, 400, 300);
        // shp4.graphics.endFill();
        // this.addChild(shp4);

        // // 圆弧绘制
        // var shp5: egret.Shape = new egret.Shape();
        // shp5.graphics.beginFill(0x1122cc);
        // // 圆形坐标，半径，圆弧起点角度，圆弧终点角度，绘制方向（true为顺时针）
        // shp5.graphics.drawArc(300, 300, 50, 0, Math.PI, true);
        // shp5.graphics.endFill();
        // this.addChild(shp5);

        // // 圆弧高级使用
        // // 1. 弧线
        // var shp5_1: egret.Shape = new egret.Shape();
        // shp5_1.graphics.lineStyle(2, 0xffff00);
        // shp5_1.graphics.drawArc(300, 300, 50, 0, Math.PI / 180 * 30, false);
        // shp5_1.graphics.endFill();
        // this.addChild(shp5_1);
        // // 2. 拱形
        // var shp5_2: egret.Shape = new egret.Shape();
        // shp5_2.graphics.beginFill(0xff0000);
        // shp5_2.graphics.drawArc(50, 350, 50, 0, Math.PI / 180 * 60, false);
        // shp5_2.graphics.endFill();
        // this.addChild(shp5_2);
        // // 3. 扇形
        // var r: number = 50;
        // var shp5_3: egret.Shape = new egret.Shape();
        // shp5_3.graphics.beginFill(0xffffff);
        // shp5_3.graphics.moveTo(r, r);
        // shp5_3.graphics.lineTo(r * 2, r);
        // shp5_3.graphics.drawArc(50, 50, 50, 0, 260 * Math.PI / 180, false);
        // shp5_3.graphics.endFill();
        // this.addChild(shp5_3);
        // // 4. 画弧形进度条
        // var shp5_4: egret.Shape = new egret.Shape();
        // var angle: number = 0;
        // egret.startTick(function (timeStamp: number): boolean {
        //     angle += 1;
        //     changeGraphics(angle);
        //     angle = angle % 360;
        //     return true;
        // }, this)
        // function changeGraphics(angle) {
        //     shp5_4.graphics.clear();
        //     shp5_4.graphics.lineStyle(10, 0x0000ff, 0.5);
        //     shp5_4.graphics.drawArc(60, 500, 50, 0, angle * Math.PI / 180, false);
        //     shp5.graphics.endFill();
        // }
        // this.addChild(shp5_4);

        // // 5. 画扇形进度条
        // var shp5_5: egret.Shape = new egret.Shape();
        // var angle2: number = 0;
        // egret.startTick(function (timeStamp: number): boolean {
        //     angle2 += 1;
        //     changeGraphics2(angle2);
        //     angle2 = angle2 % 360;
        //     return true;
        // }, this)
        // function changeGraphics2(angle) {
        //     shp5_5.graphics.clear();
        //     shp5_5.graphics.beginFill(0xff0000);
        //     shp5_5.graphics.moveTo(50, 650);
        //     shp5_5.graphics.lineTo(100, 650);
        //     shp5_5.graphics.drawArc(50, 650, 50, 0, angle2 * Math.PI / 180, false);
        //     shp5_5.graphics.lineTo(50, 650);
        //     shp5_5.graphics.endFill();
        // }
        // this.addChild(shp5_5);

        // 6. 画不规则边框进度条
        // let shp5_6 = this.drawBorderProgress();
        // this.addChild(shp5_6);
        // var container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        // var w: number = 100;
        // var h: number = 100;
        // var r: number = Math.max(w, h) / 2 * 1.5;
        // var bitmap = new egret.Bitmap(RES.getRes(key));
        // container.addChild(bitmap);
        // bitmap.width = w;
        // bitmap.height = h;
        // var shp5_6: egret.Shape = new egret.Shape();
        // shp5_6.x = bitmap.width / 2;
        // shp5_6.y = bitmap.height / 2;
        // bitmap.mask = shp5_6;
        // container.addChild(shp5_6);
        // var angle3 = 0;
        // egret.startTick(function (timeStamp: number): boolean {
        //     angle3 += 1;
        //     changeGraphics3(angle3);
        //     angle3 %= 360;
        //     return true;
        // }, this);
        // this.addChild(shp5_6);
        // return container;
        // function changeGraphics3(angle) {
        //     shp5_6.graphics.clear();
        //     shp5_6.graphics.beginFill(0x00ffff, 0.8);
        //     shp5_6.graphics.lineTo(r, 0);
        //     shp5_6.graphics.drawArc(0, 0, r, 0, angle * Math.PI / 180, true);
        //     shp5_6.graphics.lineTo(0, 0);
        //     shp5_6.graphics.endFill();
        // }

        // let sky = this.createBitmapByName("bg_jpg");
        // this.addChild(sky);
        // let stageW = this.stage.stageWidth;
        // let stageH = this.stage.stageHeight;
        // sky.width = stageW;
        // sky.height = stageH;

        // let topMask = new egret.Shape();
        // topMask.graphics.beginFill(0x000000, 0.5);
        // topMask.graphics.drawRect(0, 0, stageW, 172);
        // topMask.graphics.endFill();
        // topMask.y = 33;
        // this.addChild(topMask);

        // let icon = this.createBitmapByName("egret_icon_png");
        // this.addChild(icon);
        // icon.x = 26;
        // icon.y = 33;

        // let line = new egret.Shape();
        // line.graphics.lineStyle(2, 0xffffff);
        // line.graphics.moveTo(0, 0);
        // line.graphics.lineTo(0, 117);
        // line.graphics.endFill();
        // line.x = 172;
        // line.y = 61;
        // this.addChild(line);


        // let colorLabel = new egret.TextField();
        // colorLabel.textColor = 0xffffff;
        // colorLabel.width = stageW - 172;
        // colorLabel.textAlign = "center";
        // colorLabel.text = "Hello Egret";
        // colorLabel.size = 24;
        // colorLabel.x = 172;
        // colorLabel.y = 80;
        // this.addChild(colorLabel);

        // let textfield = new egret.TextField();
        // this.addChild(textfield);
        // textfield.alpha = 0;
        // textfield.width = stageW - 172;
        // textfield.textAlign = egret.HorizontalAlign.CENTER;
        // textfield.size = 24;
        // textfield.textColor = 0xffffff;
        // textfield.x = 172;
        // textfield.y = 135;
        // this.textfield = textfield;
    }

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