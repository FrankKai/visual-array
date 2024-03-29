[中文简体](./README-zh.md)

# visual-array
Canvas-based array visualization class that supports some common functions.

### Features
- Supports generating a visual array structure from a set of numbers
- Supports customizing the width and height of a single element, and supports dynamic scaling
- Support custom single element font, strokeStyle, fillStyle
- Supports selecting the index that exposes the bottom: all, head and tail, close
- Support for text at the top of custom arrays: {index0: value0, index1: value1}
- Support for exporting pictures
- Support shift, pop, unshift, push functions
- Support use in vue, react

### Glance
<img src="https://imgur.com/SpBfX9O.png" >

### Instructions for use

#### Install
```shell
npm i visual-array
yarn add visual-array
```

#### vue demo
online demo: https://codesandbox.io/s/visual-array-vue-en-qjj56f


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
      topText: { show: true, data: { 0: " head", 3: "tail" } },
      customStyle: null,
      _canvas: null,
    };
    const visualArray = new VisualArray({
      containerId: "canvas",
      array: canvasConfig.array,
      cw: canvasConfig.cw,
      ch: canvasConfig.ch,
      topText: canvasConfig.topText,
    });
    canvasConfig._canvas = visualArray;
  },
};
</script>

<style lang="scss" scoped></style>
```

#### react demo
online demo: https://codesandbox.io/s/visual-array-react-en-00wh0m

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
      topText: { show: true, data: { 0: " head", 3: "tail" } },
      customStyle: null,
      _canvas: null,
    };
    const visualArray = new VisualArray({
      containerId: "canvas",
      array: canvasConfig.array,
      cw: canvasConfig.cw,
      ch: canvasConfig.ch,
      topText: canvasConfig.topText,
    });
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

Enjoy it！