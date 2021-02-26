import React, { useEffect } from 'react';
import VisualArray from "visual-array";

function Demo() {
    const canvasConfig = {
        array: [2, 1, 9, 3, 1, 0],
        cw: 60,
        ch: 60,
        bottomIndex: null,
        topText: null,
        customStyle: null,
        _canvas: null,
    };
    useEffect(() => {
        const visualArray = new VisualArray({
            containerId: "canvas",
            array: canvasConfig.array,
            cw: canvasConfig.cw,
            ch: canvasConfig.ch,
        });
        canvasConfig._canvas = visualArray;
    }, [])
    const handleOnClick = (type: string) => {
        if (type === 'unshift' || type === 'push') {
            if (canvasConfig._canvas) {
                canvasConfig._canvas.mutateArray(type, Math.floor(10 * Math.random()))
            }
            return;
        }
        canvasConfig._canvas.mutateArray(type)
    }

    return (
        <div className="demo">
            <div id="canvas"></div>
            <div className="actions">
                <button onClick={() => { handleOnClick('unshift') }}>unshift</button>
                <button onClick={() => { handleOnClick('push') }}>push</button>
                <button onClick={() => { handleOnClick('shift') }}>shift</button>
                <button onClick={() => { handleOnClick('pop') }}>pop</button>
            </div>
            <div className="export" style={{marginTop: '10px'}}>
                <button onClick={() => { canvasConfig._canvas.exportImage() }}>下载</button>
            </div>

        </div >
    );
}

export default Demo;
