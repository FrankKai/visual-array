# visual-array
canvas可视化数组。

### 功能介绍
- 支持通过一组数字，生成一个可视化的数组结构
- 支持自定义单个元素的width和height，支持动态伸缩
- 支持自定义单个元素font，strokeStyle，fillStyle
- 支持选择暴露出底部的index: all, 头尾, 关闭
- 支持自定义数组顶部的文字：{index0: value0, index1: value1}
- 支持导出图片
- 支持shift、pop、unshift、push功能
- 支持在vue，react中使用

### 亟需完成
- 使用typescript重构visual-array

### 效果图
<img src="https://i.imgur.com/SlqTNPE.png" >

### 使用说明

#### vue demo
```html
<template>
  <div id="canvas"></div>
</template>

<script>
import VisualArray from "visual-array";

export default {
  name: "vue-demo",
  mounted() {
    const canvasConfig = {
      array: [1, 2, 3, 4],
      cw: 60,
      ch: 60,
      bottomIndex: null,
      topText: null,
      customStyle: null,
      _canvas: null,
    };
    const visualArray = new VisualArray(
      "canvas",
      canvasConfig.array,
      canvasConfig.cw,
      canvasConfig.ch
    );
    canvasConfig._canvas = visualArray;
  },
};
</script>

<style lang="scss" scoped></style>
```

#### react demo
```js
import { useEffect } from "react";
import VisualArray from "visual-array";

function Demo() {
  useEffect(() => {
    const canvasConfig = {
      array: [1, 2, 3, 4],
      cw: 60,
      ch: 60,
      bottomIndex: null,
      topText: null,
      customStyle: null,
      _canvas: null,
    };
    const visualArray = new VisualArray(
      "canvas",
      canvasConfig.array,
      canvasConfig.cw,
      canvasConfig.ch
    );
    canvasConfig._canvas = visualArray;
  }, []);
  return (
    <div className="demo">
      <div id="canvas"></div>
    </div>
  );
}

export default Demo;
```

enjoy it!