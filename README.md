# 游戏开发笔记
## 游戏游戏分析
### 棍子英雄

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
* 对象池的使用会有点问题，有待解决
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
    this.node.addChild(enemy); // 将生成的敌人加入节点树
    // enemy.getComponent('Enemy').init(); // 接下来就可以调用 enemy 身上的脚本进行初始化
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

## 碰撞检测
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