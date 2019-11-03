# Cocos Creator
## 图像与渲染
### 摄像机
* 可以同时存在多个摄像机
#### 摄像机属性
* zoomRatio 指定摄像机的缩放比例
* backgroundColor 使用设定的背景色来清除场景
* depth 摄像机深度，决定摄像机的渲染顺序，越大越后被渲染
* cullingMask 决定这个摄像机用来渲染场景的哪些部分
* clearFlags 指定渲染摄像机时需要做的清除操作
#### 摄像机方法*
* cc.Camera.findCamera
* containsNode
* render
#### 坐标转换*
#### 截图*
### Sprite 组件
#### Sprite 属性
* Atlas 图集资源(TexturePacker制作)
* Sprite Frame 图片资源(自带编辑器制作九宫格图像)
* Type 渲染模式，包括普通（Simple）、九宫格（Sliced）、平铺（Tiled）、填充（Filled）和网格（Mesh）渲染五种模式
* Size Mode 