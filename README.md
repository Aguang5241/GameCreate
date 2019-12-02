# 游戏开发笔记

## 世上最大坑
* 千千万万不要命名同样的js文件，即使在不同文件夹里面，虽然程序可以正常运行，但是编译会出现错误！！！

## 关于节点和组件
* `getComponent()`方法针对于获得所在节点上的组件
* 对于获得其他节点，最简单的方法就是在属性检查器中引用
* `this.node.parent`可以获取当前节点的父节点
* 对于label节点，无法直接在其绑定的组件（脚本）中使用`this.node.string = 'xxx'`进行修改，应该将label作为节点进行引用后再修改其文本内容，而且必须事先声明其type为cc.Label

## 组件之间的通讯方法：
* 发送方使用module.export，接收方使用require
```javascript
// 发送方
module.exports = {
    backNode: null,
    backLabel: null,
};
// 接收方
var Global = require("Global");
```
* 在目标组件中暂存本地组件的this，使得在目标组件也能访问到本地组件的属性和方法
```javascript
newStar.getComponent('Star').game = this;
```

## 对象池
* 如果在预制对象上绑定了物理系统，需要在对应脚本上开启物理系统，否则生成的预制对象物理系统失效
```JavaScript
onLoad() {
    this.enemyPool = new cc.NodePool();
    let initCount = 5;
    for (let i = 0; i < initCount; ++i) {
        let enemy = cc.instantiate(this.enemyPrefab); // 创建节点
        this.enemyPool.put(enemy); // 通过 put 接口放入对象池
    }
    this.createEnemy();
},

createEnemy: function () {
    console.log('生成');
    let enemy = null;
    if (this.enemyPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
        enemy = this.enemyPool.get();
    } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
        enemy = cc.instantiate(this.enemyPrefab);
    }
    enemy.setPosition(xxx) // 一定要在加入节点树之前设置位置，否则无效
    this.node.addChild(enemy); // 将生成的敌人加入节点树

    enemy.getComponent('Enemy').init(); // 接下来就可以调用 enemy 身上的脚本进行初始化
    // 如果不初始化enemy，在从对象池中获取this.enemyPool.get();的时候，该enemy身上的脚本参数还接着上次调用的时候；
    // 因为执行this.enemyPool.put();只是把enemy重新放回对象池，并不是真正销毁；执行this.enemyPool.get()又可以重新获取出来；
    enemy.getComponent('Enemy').game = this; // 在Enemy组件上暂存Game组件的引用
},

onEnemyKilled: function (enemy) {
    console.log('回收前：' + this.enemyPool.size());
    this.enemyPool.put(enemy);
    console.log('回收后：' + this.enemyPool.size());
    // enemy 应该是一个 cc.Node
    // this.enemyPool.put(enemy); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
},
```

## 关于碰撞系统
* 设置碰撞边缘及tag
* 在被检测节点设置组件，内容如下
```JavaScript
onCollisionEnter: function(other, self) {
    if (other.tag == 1) {
        cc.director.loadScene('End')
    }
},

onLoad () {
    cc.director.getCollisionManager().enabled = true;
},
```

## 关于屏幕适配
* 选取1280 * 720 （1.7777778）
`fitHeight`
`fitWidth`

## 关于物理系统
* 如果子节点绑定了物理系统，其位移将不会随着父节点变化
```javascript
// 开启物理系统
cc.director.getPhysicsManager().enabled = true;
// 获得刚体
this.rigidBody = this.node.getComponent(cc.RigidBody);
// 获得线性速度
var currentSpeed = this.rigidBody.linearVelocity;
// 向刚体质心施加一个力
this.rigidBody.applyForceToCenter(cc.v2(0, this.jumpForce), true);
```
* 碰撞回调函数
```javascript
// 只在两个碰撞体开始接触时被调用一次
onBeginContact: function (contact, selfCollider, otherCollider) {
},

// 只在两个碰撞体结束接触时被调用一次
onEndContact: function (contact, selfCollider, otherCollider) {
},

// 每次将要处理碰撞体接触逻辑时被调用
onPreSolve: function (contact, selfCollider, otherCollider) {
},

// 每次处理完碰撞体接触逻辑时被调用
onPostSolve: function (contact, selfCollider, otherCollider) {
}

// 碰撞体的节点获取
selfCollider.node;
otherCollider.node
```
## 关于重力感应
```javascript
cc.Class({
    extends: cc.Component,
    onLoad () {
        // open Accelerometer
        cc.systemEvent.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },

    onDeviceMotionEvent (event) {
        cc.log(event.acc.x + "   " + event.acc.y);
    },
});
```
* 其中`event.acc.x; event.acc.y`的值分别为(-1, 1)，表示四个方向的加速度大小
* `event.acc.x`对应屏幕横向轴，由左到右数值为-1到1
* `event.acc.y`对应屏幕纵向轴，有下到上数值为-1到1

## 关于动态加载资源
* 预先将需要的动态加载资源放置在assets/resourses文件夹之下
```javascript
var self = this;
cc.loader.loadRes('white', cc.SpriteFrame, function(err, SpriteFrame) {
    self.player.getComponent(cc.Sprite).spriteFrame = SpriteFrame;
})
```

## 关于龙骨动画
```javascript
// 获取动画所有的ArmatureNames
console.log(this.node.getComponent(dragonBones.ArmatureDisplay).getArmatureNames()); 
// 获取当前armatureName
console.log(this.node.getComponent(dragonBones.ArmatureDisplay).armatureName); 
// 指定armatureName
this.node.getComponent(dragonBones.ArmatureDisplay).armatureName = 'StayStill'; 
this.node.getComponent(dragonBones.ArmatureDisplay).armatureName = 'Walk';
// 播放armatureName
this.node.getComponent(dragonBones.ArmatureDisplay).playAnimation('Walk', 0); 
// 动画播放一次结束后的回调函数方法
this.node.getComponent(dragonBones.ArmatureDisplay).on(dragonBones.EventObject.COMPLETE, function(){
    this.node.getComponent(dragonBones.ArmatureDisplay).playAnimation('run', 0) 
}, this)
```

## 关于动作系统
* `cc.delayTime(0.66)`可以巧妙地应用在动作系统里面执行一个空动作
```javascript
cc.sequence(
    cc.moveTo(0.17, cc.v2(-400, -250)).easing(cc.easeCubicActionOut()),
    cc.delayTime(0.66),
    cc.moveTo(0.17, cc.v2(-400, -220)).easing(cc.easeCubicActionIn())
);
```

## 关于坐标
* `cc.v2(x1, y1)`是一个`object`类型，不能直接拿来作比较，并不能得到正确的结果
* 两点之间的向量差`cc.v2(10, 8).sub(cc.v2(5, 4)) == cc.v2(5, 4)`
* 两点之间的距离`cc.v2(0, 4).sub(cc.v2(3, 0)).mag() == 5`

## 关于物理组件
* 要使用链接物理组件首先要绑定物理碰撞组件
### MotorJoint
* 该组件可以实现绑定刚体与被绑定刚体的相对运动
* `Max Force` 作用在绑定刚体上的最大力
* `Correction Factor` 位置矫正系数，从0-1矫正程度由强到弱
### DistanceJoint
* 该组件能够保持两个刚体之间的距离不变
* `Distance` 指定距离
* `Frequency` 指定弹性系数，有一种橡皮筋的感觉，其值越大橡皮筋越硬
### RevoluteJoint
* `Max Motor Torque` 表示旋转的增速幅度大小
* `Motor Speed` 表示期望最终达到的旋转速度

## 关于摄像机跟随
* 最为简单的方法就是将具有监听事件的脚本绑定在主摄像机上面，同时指定主摄像机的宽度和高度为所需要的大小，这样可以有效的避免因为事件监听脚本绑定在Canvas上面的时候当摄像机移动到其之外范围监听失效的问题
```javascript
// 简单跟随
update (dt) {
    this.node.x = this.target.x;
    this.node.y = this.target.y;
},
// 加边框限制的摄像机跟随
update (dt) {
if (Math.abs(this.target.x - this.node.x) > 100) {
    if ((this.target.x - this.node.x) > 0) {
        this.node.x = this.target.x - 100;
    } else {
        this.node.x = this.target.x + 100;
    }
};
if (Math.abs(this.target.y - this.node.y) > 100) {
    if ((this.target.y - this.node.y) > 0) {
        this.node.y = this.target.y - 100;
    } else {
        this.node.y = this.target.y + 100;
    }
}
```
### 双摄相机
* 系统设置分组并将需要分组的节点设置为该分组
* 添加摄像机并且设置`cullingMask`渲染所设置的分组即可
### 小地图
* 原理就是将摄像机捕获的图像渲染到指定的精灵上面而不是直接投射到屏幕上
```javascript
properties: {
    sprite: {
        default: null,
        type: cc.Sprite
    },

    camera: {
        default: null,
        type: cc.Camera
    }
},
start () {
    let texture = new cc.RenderTexture();
    texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height);

    let spriteFrame = new cc.SpriteFrame();
    spriteFrame.setTexture(texture)
    this.sprite.spriteFrame = spriteFrame;
    
    this.camera.targetTexture = texture;
},
```

## 关于微信
* 微信授权---一般在游戏开始时候运行一次即可
```javascript
// 获取权限
let systemInfo = wx.getSystemInfoSync(); // 获取用户设备信息
let width = systemInfo.windowWidth; // 可使用的窗口宽度
let height = systemInfo.windowHeight; // 可使用的窗口高度
let button = wx.createUserInfoButton({
    type: 'text',
    text: '',
    style: {
        left: 0,
        top: 0,r
        width: width,
        height: height,
        lineHeight: 40,
        backgroundColor: '#00000000',
        color: '#00000000',
        textAlign: 'center',
        fontSize: 10,
        borderRadius: 4
    }
})

button.onTap((res) => {
    let userInfo = res.userInfo;

    // 当没有获取到用户信息
    if (!userInfo) { 
        console.log('dot get userInfo')
        return;
    }

    button.hide(); // 隐藏用户按钮
    button.destroy(); // 销毁用户按钮
})
```