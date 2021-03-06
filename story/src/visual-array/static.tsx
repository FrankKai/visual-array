import React, { useEffect } from 'react';
import VisualArray from "visual-array";

function Demo() {
  useEffect(() => {
    const canvasConfig = {
      array: [2, 1, 9, 3, 1, 0],
      cw: 60,
      ch: 60,
      bottomIndex: 'all',
      topText: null,
      customStyle: null,
      _canvas: null,
    };
    const visualArray = new VisualArray({
      containerId: "canvas",
      array: canvasConfig.array,
      cw: canvasConfig.cw,
      ch: canvasConfig.ch,
      bottomIndex: canvasConfig.bottomIndex
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
