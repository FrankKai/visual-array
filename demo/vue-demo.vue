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
