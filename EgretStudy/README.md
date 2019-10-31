# Egret 基础
## 矢量绘图
* Graphics 类实现矢量绘图功能
* 矩形
```typescript
var shp: egret.Shape = new egret.Shape();
// 定位
shp.x = 20;
shp.y = 20;
// 描边（线宽及颜色）
shp.graphics.lineStyle(10, 0x00ff00)
// 填充颜色（16进制颜色及透明度）
shp.graphics.beginFill(0xff0000, 0.5);
// 绘制矩形
shp.graphics.drawRect(0, 0, 100, 200);
// 结束绘制
shp.graphics.endFill();
this.addChild(shp);
```
* 圆形
```typescript
var shp2: egret.Shape = new egret.Shape();
shp2.x = 200;
shp2.y = 100;
shp2.graphics.lineStyle(10, 0x00ff00);
shp2.graphics.beginFill(0xff0000, 0.5);
// x轴坐标，y轴坐标，半径
shp2.graphics.drawCircle(0, 0, 50);
shp2.graphics.endFill();
this.addChild(shp2);
```
* 直线（折线）
```typescript
var shp3: egret.Shape = new egret.Shape();
shp3.graphics.lineStyle(2, 0x00ff00);
// 起点坐标
shp3.graphics.moveTo(200, 100);
// 轨迹点坐标
shp3.graphics.lineTo(300, 200);
shp3.graphics.lineTo(200, 300);
shp3.graphics.endFill();
this.addChild(shp3);
```
* 曲线
```typescript
var shp4: egret.Shape = new egret.Shape();
shp4.graphics.lineStyle(2, 0xeeeeee);
// 二次贝塞尔曲线起点坐标 
shp4.graphics.moveTo(201, 301);
// 二次贝塞尔曲线顶点与终点坐标
shp4.graphics.curveTo(300, 400, 400, 300);
shp4.graphics.endFill();
this.addChild(shp4);
```
* 圆弧
```typescript
var shp5: egret.Shape = new egret.Shape();
shp5.graphics.beginFill(0x1122cc);
// 圆形坐标，半径，圆弧起点角度，圆弧终点角度，绘制方向（true为顺时针）
shp5.graphics.drawArc(300, 300, 50, 0, Math.PI, true);
shp5.graphics.endFill();
this.addChild(shp5);
```
* 圆弧高级---弧线
```typescript
var shp5_1: egret.Shape = new egret.Shape();
shp5_1.graphics.lineStyle(2, 0xffff00);
shp5_1.graphics.drawArc(300, 300, 50, 0, Math.PI / 180 * 30, false);
shp5_1.graphics.endFill();
this.addChild(shp5_1);
```
* 圆弧高级---拱形
```typescript
var shp5_2: egret.Shape = new egret.Shape();
shp5_2.graphics.beginFill(0xff0000);
shp5_2.graphics.drawArc(50, 350, 50, 0, Math.PI / 180 * 60, false);
shp5_2.graphics.endFill();
this.addChild(shp5_2);
```
* 圆弧高级---扇形
```typescript
var r: number = 50;
var shp5_3: egret.Shape = new egret.Shape();
shp5_3.graphics.beginFill(0xffffff);
shp5_3.graphics.moveTo(r, r);
shp5_3.graphics.lineTo(r * 2, r);
shp5_3.graphics.drawArc(50, 50, 50, 0, 260 * Math.PI / 180, false);
shp5_3.graphics.endFill();
this.addChild(shp5_3);
```
* 弧形进度条
```typescript
var shp5_4: egret.Shape = new egret.Shape();
var angle: number = 0;
egret.startTick(function (timeStamp: number): boolean {
    angle += 1;
    changeGraphics(angle);
    angle = angle % 360;
    return true;
}, this)
function changeGraphics(angle) {
    shp5_4.graphics.clear();
    shp5_4.graphics.lineStyle(10, 0x0000ff, 0.5);
    shp5_4.graphics.drawArc(60, 500, 50, 0, angle * Math.PI / 180, false);
    shp5.graphics.endFill();
}
this.addChild(shp5_4);
```
* 扇形进度条
```typescript
var shp5_5: egret.Shape = new egret.Shape();
var angle2: number = 0;
egret.startTick(function (timeStamp: number): boolean {
    angle2 += 1;
    changeGraphics2(angle2);
    angle2 = angle2 % 360;
    return true;
}, this)
function changeGraphics2(angle) {
    shp5_5.graphics.clear();
    shp5_5.graphics.beginFill(0xff0000);
    shp5_5.graphics.moveTo(50, 650);
    shp5_5.graphics.lineTo(100, 650);
    shp5_5.graphics.drawArc(50, 650, 50, 0, angle2 * Math.PI / 180, false);
    shp5_5.graphics.lineTo(50, 650);
    shp5_5.graphics.endFill();
}
this.addChild(shp5_5);
```
* 不规则边框进度条
```typescript
private drawBorderProgress(): egret.DisplayObjectContainer {
    var container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    var w: number = 100;
    var h: number = 100;
    var r: number = Math.max(w, h) / 2 * 1.5;
    var bitmap = new egret.Bitmap(RES.getRes(key));
    container.addChild(bitmap);
    bitmap.width = w;
    bitmap.height = h;
    var shape: egret.Shape = new egret.Shape();
    shape.x = bitmap.width / 2;
    shape.y = bitmap.height / 2;
    bitmap.mask = shape;
    container.addChild(shape);
    var angle = 0;
    egret.startTick(function (timeStamp: number): boolean {
        angle += 1;
        changeGraphics(angle);
        angle = angle % 360;
        return true;
    }, this);
    return container;
    function changeGraphics(angle) {
        shape.graphics.clear();
        shape.graphics.beginFill(0x00ffff, 1);
        shape.graphics.lineTo(r, 0);
        shape.graphics.drawArc(0, 0, r, 0, angle * Math.PI / 180, true);
        shape.graphics.lineTo(0, 0);
        shape.graphics.endFill();
    }
}
```
***注：方法`beginFill()`要位于操作步骤第一步***
***
## 显示对象和显示容器
### 1. 可视属性
* alpha：透明度
* width：宽度
* height：高度
* rotation：旋转角度
* scaleX：横向缩放
* scaleY：纵向缩放
* skewX：横向斜切
* skewY：纵向斜切
* visible：是否可见
* x：X轴坐标值
* y：Y轴坐标值
* anchorOffsetX：对象绝对锚点X
* anchorOffsetY：对象绝对锚点Y
### 2. 核心类
* 类

|类|描述|
|:---:|:---:|
|DisplayObject|显示对象基类，所有显示对象均继承自此类|
|Bitmap|位图，用来显示图片|
|Shape|用来显示矢量图，可以使用其中的方法绘制矢量图形|
|TextField|文本类|
|BitmapText|位图文本类|
|DisplayObjectContainer|显示对象容器接口，所有显示对象容器均实现此接口|
|Sprite|带有矢量绘制功能的显示容器|
|Stage|舞台类|
* 层级关系   

*floor1*

|DisplayObject|||||
|:---:|:---:|:---:|:---:|:---:|
|DisplayObjectContainer|Bitmap|Shape|TextField|TextInput|
*floor2*

|DisplayObjectContainer||||
|:---:|:---:|:---:|:---:|
|Sprite|Stage|MovieClip|BitmapText|
### 3. 变换操作
#### 锚点的操作
* 默认锚点为对象左上角
* 可以通过`anchorOffsetX`和`anchorOffsetY`属性修改锚点的位置
#### 位置和平移
* 本地坐标--->舞台坐标：`localToGlobal()`方法
* 舞台坐标--->本地坐标：`globalToLocal()`方法
#### 尺寸和缩放
```typescript
shapeTest.scaleX = 0.5;
shapeTest.scaleY = 0.5;
shapeTest.width = 50;
shapeTest.height = 100;
```
#### 旋转
```typescript
shapeTest.rotation = 45;
```
#### 斜切
* 在适当的动画呈现场合使用斜切变形，可以在不增加图片资源的前提下实现灵活而有趣的效果
```typescript
mySprite.skewX = 10;
mySprite.skewY = 10;
```
### 4. 添加与删除显示对象
* 将一个显示对象移除显示列表后，该对象并非在内存中被销毁,只是不让显示对象参与渲染而已
* 显示对象的坐标系是相对坐标系，而非绝对坐标系
* 被删除的显示对象必须存在于容器对象当中
```typescript
addChild()
removeChild()

if( spr.parent ) {
    spr.parent.removeChild( spr );
}
```
### 5. 深度管理
#### 1. 最前面的显示对象深度最低，为最底层，深度值为0
#### 2. 通过容器的`numChildren`属性来获取当前容器的子对象数量
#### 3. 指定深度的时候，需要使用`addChildAt(深度值)`和`removeChildAt(深度值)`方法
#### 4. 使用`removeChildren()`方法可以将当前容器内的所有子对象全部移除显示列表
#### 5. 交换深度使用`swapChildren()`或者`swapChildrenAt(深度值, 深度值)`方法
#### 6. 访问容器子对象使用`getChildAt(深度值)`或`getChildByName(显示对象)`方法
* `getChildAt(深度值)`方法速度快
* `getChildByName(显示对象)`速度较慢
* 两者都只匹配一个显示对象
#### 7. 重设子对象深度使用`setChildIndex(显示对象, 新的深度值)`或`zIndex`方法   
* 注：要给一个对象使用 zIndex，包含此显示对象的 DisplayObjectContainer 对象一定要设置 sortableChildren = true，开启排序功能，否则设置 zIndex 是无效的
***
## 遮罩
```typescript
// 被遮罩的显示对象.mask = 遮罩;
shape2.mask = shape1;
``` 
***
## 碰撞检测
### 1. 矩形碰撞检测
* 与待检测显示对象外围的矩形方框为基准
```typescript
var isHit:boolean = shape.hitTestPoint(x: number, y:number);
// shape---待检测显示对象
// x,y---待检测点坐标
// 碰撞返回true，未碰撞返回false
```
### 2. 像素碰撞检测
* 与待测显示对象本身为基准
```typescript
var isHit:boolean = shp.hitTestPoint( x: number, y:number, true:boolean );
// 增加第三个参数true
```
***
## 文本
### 1. 普通文本
* `egret.TextField`文本类型
```typescript
// 创建文本类
let testText: egret.TextField = new egret.TextField();
// 添加内容
testText.text = 'aguang is a handsome boy';
testText.textColor = 0x007abc;
// 添加到显示列表
background.addChild(testText);
```
### 2. 输入文本
* 普通输入文本
```typescript
// 创建文本类
let inputText: egret.TextField = new egret.TextField();
// 指定输入类型
inputText.type = egret.TextFieldType.INPUT;
inputText.inputType = egret.TextFieldInputType.TEXT;
// 设置输入框样式
inputText.width = 300;
inputText.height = 50;
inputText.x = 0;
inputText.y = 50;
inputText.textColor = 0x007abc;
// 边框样式
inputText.border = true;
inputText.borderColor = 0x00ff00;
// 字体描边
inputText.stroke = 3;
inputText.strokeColor = 0xff0000;
// 添加到显示列表
background.addChild(inputText);
```
* 密码
```typescript
let passText: egret.TextField = new egret.TextField();
passText.type = egret.TextFieldType.INPUT;
passText.inputType = egret.TextFieldInputType.PASSWORD;
// 密码显示设置
passText.displayAsPassword = true;
passText.text = '请输入密码：';
passText.y = 150;
passText.width = 300;
passText.border = true;
passText.borderColor = 0x00ff00;
background.addChild(passText);
```
* 电话
```typescript
var telText: egret.TextField = new egret.TextField();
telText.type = egret.TextFieldType.INPUT;
telText.inputType = egret.TextFieldInputType.TEL;
telText.text = '请输入电话：';
telText.y = 250;
telText.width = 300;
telText.border = true;
telText.borderColor = 0x00ff00;
background.addChild(telText);
```
***注：不同类型输入文本会弹出不同类型的输入键盘***
### 3. 文本样式
```typescript
let testText: egret.TextField = new egret.TextField();
// 添加内容
testText.text = 'aguang is a handsome boy';
// 字体
testText.fontFamily = 'Times';
// 字号
testText.size = 45;
// 颜色
testText.textColor = 0x007abc;
// 描边
testText.stroke = 3;
testText.strokeColor = 0xaaaaaa;
// 粗体与斜体
testText.bold = true;
testText.italic = true;
// 设置尺寸
testText.width = 640;
testText.height = 1136;
// 文本居中
testText.textAlign = egret.HorizontalAlign.CENTER;
testText.verticalAlign = egret.VerticalAlign.MIDDLE;
// 添加到显示列表
background.addChild(testText);
// 富文本样式
let testText2: egret.TextField = new egret.TextField();
testText2.textFlow = <Array<egret.ITextElement>>[
    {text: 'Aguang', style: {'textColor': 0xff0000, 'size':45}},
    {text: 'is a handsome boy', style: {'textColor':0xff0000, 'size':20}},
    {text: 'This is a link to Baidu', style: {'href': 'https://www.baidu.com'}}
];
testText2.touchEnabled = true;
background.addChild(testText2);
```
***
## 事件机制
### 1. 事件处理机制
* 发送者（Event dispatcher）---> 事件（Event）---> 事件侦听者（Event listener）
### 2. 事件的执行流程
* 注册侦听器 ---> 发送事件 ---> 侦听事件 ---> 移除侦听器
### 3. Event 类
#### 构造函数的三个参数：
* type: 事件类型
* bubbles: 事件是否参与事件流的冒泡阶段
* cancelable: 是否可以取消与事件关联的默认动作
* target: 表示事件的目标，即事件发送者
### 4. 事件侦听器
#### 注册事件侦听器：
```typescript
public addEventListener(type:string, listener:Function, thisObject:any, useCapture:boolean = false, priority:number = 0)
```
* type: 事件类型
* listener: 处理事件的侦听器
* thisObject: 作用域，一般为this
* useCapture: 确定侦听器运行于捕获阶段还是冒泡阶段，可选
* priority: 优先级，可选
#### 创建侦听器
```typescript
listenerName(evt:Event):void {...}
```
* 侦听器必须是函数
#### 注册与移除侦听器
```typescript
// 注册
事件发送者.addEventListener(事件类型, 侦听器, this);
// 移除
事件发送者.removeEventListener(事件类型, 侦听器, this);
```
#### 检测侦听器
```typescript
事件发送者.hasEventListener(事件类型);
```
#### TouchEvent 启动开关
```typescript
显示对象实例.touchEnabled = true;
```
* 打开所有开关使用`DisplayObjectContainer.touchChildren`
### 5. 事件的优先级
* 制定优先级需要设置 priority 属性。
* 该属性为一个number类型，当数字越大，则优先级越大。
* 在触发事件的时候优先级越高，越先执行。
### 6. 触摸事件
#### 触摸事件类型：
* TOUCH_BEGIN：当用户第一次触摸启用触摸的设备时
* TOUCH_CANCEL：由于某个事件取消了触摸时触发
* TOUCH_END：当用户移除与启用触摸的设备的接触时
* TOUCH_MOVE：当用户触碰设备并移动时进行触发，而且会连续触发，直到接触点被删除
* TOUCH_TAP：相当与点击事件
