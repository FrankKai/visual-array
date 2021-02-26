import React, { useEffect } from 'react';
import VisualArray from "visual-array";

function Demo() {
    useEffect(() => {
        const canvasConfig = {
            array: [2, 1, 9, 3, 1, 0],
            cw: 60,
            ch: 60,
            bottomIndex: 'head tail',
            topText: {
                show: true,
                data: { 0: "队头", 5: "队尾" },
            },
            customStyle: {
                font: "15px math",
                strokeStyle: "green",
                lineWidth: 1,
            },
            _canvas: null,
        };
        const visualArray = new VisualArray({
            containerId: "canvas",
            array: canvasConfig.array,
            cw: canvasConfig.cw,
            ch: canvasConfig.ch,
            customStyle: canvasConfig.customStyle,
            bottomIndex: canvasConfig.bottomIndex,
            topText: canvasConfig.topText
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
