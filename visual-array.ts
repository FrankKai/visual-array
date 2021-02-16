export type tBottomIndex = "head tail" | "all";
export type tArrayAction = "unshift" | "push" | "shift" | "pop"

export interface iTopText {
    show: boolean,
    data: Object
}

export interface iInitial {
    containerId: string,
    array: Array<number>,
    cw?: number,
    ch?: number,
    bottomIndex?: tBottomIndex,
    topText?: iTopText,
    customStyle?: any,
}

class VisualArray {
    array: Array<number>
    readonly cw?: number
    readonly ch?: number
    readonly bottomIndex?: tBottomIndex
    readonly topText?: iTopText
    readonly customStyle?: any
    length: number
    readonly numberFont: number
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    constructor(props: iInitial) {
        const { containerId,
            array,
            cw = 30,
            ch = 30,
            bottomIndex = "head tail",
            topText,
            customStyle = { font: "30px math", strokeStyle: "black", lineWidth: 1 } } = props
        this.array = array;
        this.cw = cw;
        this.ch = cw;
        this.bottomIndex = bottomIndex;
        this.topText = topText || {
            show: true,
            data: { 0: "头", [array.length - 1]: "尾" },
        };
        this.customStyle = customStyle;
        this.length = array.length;
        this.numberFont = parseInt(customStyle.font.replace("px", ""));
        // 若已经存在则不重新创建canvas
        this.canvas =
            <HTMLCanvasElement>document.getElementById(containerId).children[0] ||
            document.createElement("canvas");
        this._calculateCanvas(
            this.length,
            cw,
            ch,
            this.bottomIndex,
            this.topText,
            this.numberFont,
            this.customStyle
        );
        const isCanvasExist = this._checkCanvasExist(containerId);
        if (!isCanvasExist) {
            document.body.appendChild(this.canvas);
        }
        this._configContext();
        this._generateArray(array, cw, ch, this.topText, customStyle);
        this._generateText(this.topText, cw);
        this._generateIndex(cw, ch, this.bottomIndex, this.topText);
        if (!isCanvasExist) {
            this._appendToContainer(containerId);
        }
    }
    /**
     * 计算canvas宽度和高度
     */
    _calculateCanvas(
        length: number,
        cw: number,
        ch: number,
        bottomIndex: tBottomIndex,
        topText: iTopText,
        numberFont: number,
        customStyle: any
    ) {
        const width = cw * length;
        let canvasHeight = ch;
        if (bottomIndex) {
            canvasHeight += numberFont;
        }
        if (topText.show) {
            canvasHeight += numberFont;
        }
        const height = canvasHeight + 2 * customStyle.lineWidth;
        this.canvas.width = width;
        this.canvas.height = height;

        return { width, height };
    }
    /**
     * 检查是否已经添加
     */
    _checkCanvasExist(id: string) {
        const container = document.getElementById(id);
        return container.children.length >= 1;
    }
    /**
     * 生成数组
     */
    _generateArray(array: Array<number>, cw: number, ch: number, topText: iTopText, customStyle: any) {
        const { strokeStyle } = customStyle;
        this.ctx.strokeStyle = strokeStyle;
        let y = 0;
        if (topText.show) {
            y += this.numberFont + 2 * customStyle.lineWidth;
        }
        for (let i = 0; i < this.length; i++) {
            this.ctx.strokeRect(i * cw, y, cw, ch);
            this.ctx.fillText(
                `${array[i]}`,
                (i + 0.5) * cw,
                ch / 2 + y + this.numberFont / 2
            );
        }
    }
    /**
     * 生成顶部文字
     */
    _generateText(topText: iTopText, cw: number) {
        if (!topText.show) return;
        let keys = Object.keys(topText.data);
        keys.forEach((key) => {
            this.ctx.fillText(
                topText.data[key],
                (parseInt(key) + 0.5) * cw,
                this.numberFont
            );
        });
    }
    /**
     * 生成底部索引
     */
    _generateIndex(cw: number, ch: number, bottomIndex: tBottomIndex, topText: iTopText) {
        let y = ch;
        if (bottomIndex) {
            y += this.numberFont;
        }
        if (topText.show) {
            y += this.numberFont;
        }
        if (bottomIndex === "head tail") {
            this.ctx.fillText('0', (0 + 0.5) * cw, y);
            this.ctx.fillText(`${this.length - 1}`, (this.length - 1 + 0.5) * cw, y);
        } else {
            bottomIndex === "all";
            for (let i = 0; i < this.length; i++) {
                this.ctx.fillText(`${i}`, (i + 0.5) * cw, y);
            }
        }
    }
    /**
     * 添加到容器
     */
    _appendToContainer(id: string) {
        const container = document.getElementById(id);
        container.appendChild(this.canvas);
    }
    /**
     * 配置context
     */
    _configContext() {
        this.ctx = this.canvas.getContext("2d");
        this.ctx.font = this.customStyle.font;
        this.ctx.textAlign = "center";
    }
    /**
     * 重新绘制
     */
    _rerender() {
        this._generateArray(
            this.array,
            this.cw,
            this.ch,
            this.topText,
            this.customStyle
        );
        this._generateText(this.topText, this.cw);
        this._generateIndex(this.cw, this.ch, this.bottomIndex, this.topText);
    }
    /**
     * 数组操作unshift、push、shift、pop
     */
    mutateArray(action: tArrayAction, payload?: number) {
        this.clearCanvas();
        if (action === "unshift" || action === "push") {
            this.array[action](payload);
        } else {
            this.array[action]();
        }
        this.length = this.array.length;
        this._calculateCanvas(
            this.length,
            this.cw,
            this.ch,
            this.bottomIndex,
            this.topText,
            this.numberFont,
            this.customStyle
        );
        this._configContext();
        let tailIndex = this.array.length;
        if (action === "unshift" || action === "push") {
            tailIndex -= 2;
        }
        this.topText.data = {
            0: this.topText.data[0],
            [this.array.length - 1]: this.topText.data[tailIndex],
        };

        this._rerender();
    }
    /**
     * 导出图片
     */
    exportImage() {
        this.canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.setAttribute("href", url);
            a.setAttribute("download", `visual-array-${+new Date()}.jpg`);
            a.click();
            URL.revokeObjectURL(url);
        });
    }
    /**
     * 清空画布
     */
    clearCanvas() {
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default VisualArray;