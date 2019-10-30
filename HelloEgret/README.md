# H5学习笔记
## Egret
### 1. Egret项目骨架
* .wing: 包括 Egret 项目的任务配置文件和启动配置文件。
* bin-debug: 项目调试时，所产生的文件存放于此目录。与src目录文件一一对应
* libs: 库文件，包括 Egret 核心库和其他扩展库存放于此目录。
* resource: 项目资源文件（图片、音频等）存放于此目录。
* script: 项目构建和发布时需要用到的脚本文件存放在此目录。
* src: 项目代码文件存放于此目录。
1. Main.ts 为项目入口类，也称文档类，是衔接项目运行容器环境和项目中所有类的重要文件
2. LoadingUI.ts 是加载过程中的辅助显示组件，用来显示加载进度
* template: 项目模板文件存放于此目录。
* egretProperties.json: Egret Wing 项目配置文件。
* favicon.ico:
* index.html: 入口文件。
* manifest.json: 网页清单文件。
* tsconfig.json: typescript 编译配置文件。
* winProperties.json: Egret Wing 项目配置文件。
### 2. 游戏基础知识
* 在egret渲染架构设计中，我们将能够参与渲染的对象抽象为显示对象
* 显示对象类型：

|类|说明|
|:---:|:---:|
|DisplayObject|显示对象基类，所有的显示对象继承自该类|
|Sprite|精灵，即可绘制矢量图形，也是容器|
|Bitmap|用于显示位图|
|Shape|用于绘制2D矢量图形|
|MovieClip|逐帧动画|
|Stage|舞台类，是游戏中的主场景|
|ScrollView|滚动拖放类，可以使得显示对象在一定范围内滚动|
|DisplayObjectContainer|显示容器基类，所有的显示容器继承自该类|
|TextField|文本类|
|BitmapText|位图文本|
* 坐标系：原点位于左上角
* 显示列表与容器类
1. 所有的容器类全部继承于DisplayObjectContainer，它中封装了显示列表常用的功能（添加、删除子对象，检测子对象，设置叠放次序）
```typescript
this.addChild(shape);
this.removeChild(shape);
```

2. Shape矢量图，用来绘制简单的图形，使用graphics方法
```typescript
// 定义一个矢量图
var circle: egret.Shape = new egret.Shape();
// 开始绘制
circle.graphics.beginFill(0x00ffff);
circle.graphics.drawCircle(200, 400, 200);
// 结束绘制
circle.graphics.endFill();
// 添加到显示列表
this.addChild(circle);
```

3. TextField文本类，使用它来显示文本
```typescript
// 定义文本
var textSample: egret.TextField = new egret.TextField();
// 设置文本内容
textSample.text = 'Aguang';
// 设置文本位置
textSample.y = 400;
textSample.x = 200;
// 添加到显示列表
this.addChild(textSample);
```

* 事件消息机制，在原生js基础上还提供了一整套的事件处理机制
1. 事件类是承载事件信息以及事件处理方法的对象，每个事件都有关联的事件类型，以字符串形式存储在Egret.Event.type属性中
2. 常见的事件对象：

|事件|名称|
|:---:|:---:|
|触摸事件|egret.TouchEvent|
|声音事件|egret.SoundEvent|
|定时事件|egret.TimeEvent|
|文本事件|egret.TextEvent|
|网络加载状态事件|egret.HTTPStatusEvent|
|I/O错误事件|egret.IOEvent|

3. 创建侦听器
```typescript
// 事件接受对象.addEventListener(事件类，事件类型，事件处理函数，事件处理函数中的this对象);

// function 事件处理函数(事件实例:事件类) {
     // 响应函数中的代码
// }
```
***
## Typescript语言基础
### 1. 微软开发，是js超集，向js添加了静态类型，还有基于类的面向对象

### 2. 基础类型
* 布尔值 boolean
```typescript
// true/false
let isDone: boolean = false;
```
* 数字 number
```typescript
// 同js，没有具体的数据类型比如浮点型、整型等
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o774;
```
* 字符串 string
```typescript
// 同js，单双引号并没有限制
let name: string = 'Bob';
name = 'Smith';
// 模板字符串
let name: string = `Aguang`;
let age: number = 24;
let sentence1: string = `Hello, my name is ${name}.

I'll be ${age + 1} years old next year.`;

let sentence2: string = 'Hello, my name is ' + name + '.\n\n' + "I'll be " + (age + 1) + ' years old next year.'
```
* 数组 array
```typescript
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3]; // 数组泛型
```
* 元祖 tuple
```typescript
// 声明
let x: [string, number];
// 赋值
x = ['hello', 10];
// 访问
console.log(x[0].substr(1));
```
* 枚举 enum
```typescript
enum Color {Red, Green, Blue};
let c: Color = Color.Green;
// 默认索引从0开始，支持手动赋值
enum Color {Red = 1, Green = 3, Blue = 5};
// 枚举类型提供的一个便利是你可以由枚举的值得到它的名字
colorName: string = Color[3];
console.log(colorName); // 'Green'
```
* Any
```typescript
// 不清楚类型的变量，任意的数据类型
// 可以再次赋值为任意类型的值
let notSure: any = 4;
notSure = 'Maybe a string instead';
notSure = false;
```
* Void
```typescript
// void类型像是与any类型相反
function warnUser(): void {
    console.log("This is my warning message");
};
// 只能赋予undefined与null，没有实际用处
let unusable1: void = undefined;
let unusable2: void = null;
```
* Null, Undefined
```typescript
var a;
```
* Never
```typescript
// never类型表示的是那些永不存在的值的类型
```
* Object

### 3. 常量与变量
* 变量是存储信息的容器
* 变量的声明
```typescript
// var 声明
var a; // 此时值为undefined
// 变量赋值
var c = 10;
// 一些var声明的问题：
//  - 1. 多次声明同一个变量并不会报错
//  - 2. 可以在包含它的函数，模块，命名空间或全局作用域内部任何位置被访问

// let 声明
let d = 20;
// let声明与var声明的区别:
// `- 它使用的是词法作用域或块作用
// `- 块作用域变量在包含它们的块或for循环之外是不能访问的
//  - 它们不能在被声明之前读或写
//  - 可以在一个拥有块作用域变量被声明前获取它，只是我们不能在变量声明前去调用那个函数
//  - 它不能在同一个作用域多次声明

// const 声明
const e = 30;
//  - 拥有与 let相同的作用域规则，但是不能对它们重新赋值

// 声明选择---最小特权原则
//  - 所有变量除了你计划去修改的都应该使用const
```

### 4. 运算符表达式
* 算数运算符 + - * /
* 赋值运算符 =
* 自增自减 -- ++
* 复合运算符 += -= *= /= %=
* 关系运算符 > < == >= <=
* 逻辑运算符 && || ！

### 5. 流程控制
* 计算机执行程序按照从上到下、从左到右执行
* 常见的流程：
1. 顺序
2. 分支
```typescript
// 单分支
if (expression) {
    codes;
};
// 双分支
if (expression) {
    codes1;
} else {
    codes2;
};
// 多分支
if (expression1) {
    codes1;
} else if (expression2) {
    codes2;
} else if (expression3) {
    codes3;
} else {
    codes4;
};
switch(value) {
    case value1:
        codes1;
        break;
    case value2:
        codes2;
        break;
    case ...
        ...
        break;
    default:
        codes;
}
```

3. 循环
```typescript
// while 循环
while(expression) {
    codes1;
};
// do...while 循环
do{
    codes;
}
while(expression);
// for 循环
for (expre1;expre2;expre3) {
    codes;
};
// 循环关键字
break;
continue;
```
### 6. 函数
* 函数是对功能的封装
* 定义函数
```typescript
// 定义法
function add(num1: number, num2: number): number {
    return num1 + num2;
}
// 表达式法
var add = function(num1: number, num2: number): number {
    return num1 + num2;
}
// 箭头函数---解决this指向问题
var add = (num1: number, num2: number): number => {
    return num1 + num2;
}
```
* 调用函数
```typescript
add(3, 5);
```
* 没有设置返回值的函数返回void
* 形参：定义函数时的参数；实参：调用时候传入的具体值
* 可选参数
```typescript
function add(num1: number, num2?: number): number {
    return num1 + num2;
}
```
* 默认参数
```typescript
function add(num1: number, num2 = 3): number {
    return num1 + num2;
}
```
* 剩余参数
```typescript
function add(num1: number, ...restNum: number[]): number {
    for (var i = 0; i < restNum.length; i++) {
        return num1 += restNum[i];
    }
}
```
### 7. 面向对象编程
* 类与对象
1. 类是一种复杂的数据结构，即属性和方法的集合
2. 对象是类的实例
3. 类是对象的抽象；对象是类的实体
* 创建类
```typescript
class Dog {
    name: string;
    age: number;
    sex: string;
    constructor(n: string, a: number, s: string) {
        this.name = n;
        this.age = a;
        this.sex = s;
    };
    run() {
        console.log(this.name + ' is playing!');
    }
}
```
* 创建对象
```typescript
var d1 = new Dog('旺财', 6, '公');
console.log(d1.name);
console.log(d1.age);
console.log(d1.sex);
d1.run();
```
* 访问修饰符
1. public---默认
2. protect---成员在派生类中仍然可以访问
3. private---不能在声明它的类的外部访问
4. readonly---只读属性修饰符
```typescript
class Person {
    public readonly name: string = '张三';
    constructor(){

    }
}
var p1 = new Person();
p1.name = '李四' // 报错
```
