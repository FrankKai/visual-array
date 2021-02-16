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
    const visualArray = new VisualArray({
      containerId: "canvas",
      array: canvasConfig.array,
      cw: canvasConfig.cw,
      ch: canvasConfig.ch,
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
