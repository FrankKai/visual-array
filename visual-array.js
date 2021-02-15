class VisualArray {
  /**
   * @param { String } containerId
   * @param { Array } array
   * @param { Number } cw
   * @param { Number } ch
   * @param { String } bottomIndex
   * @param { Object } topText
   * @param {Object} customStyle
   */

  constructor(
    containerId,
    array,
    cw = 30,
    ch = 30,
    bottomIndex = "head tail",
    topText,
    customStyle = { font: "30px math", strokeStyle: "black", lineWidth: 1 }
  ) {
    if (!containerId) return;
    if (!Array.isArray(array)) return;
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
      document.getElementById(containerId).children[0] ||
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
    const isCanvasExist = VisualArray.checkCanvasExist(containerId);
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
    length,
    cw,
    ch,
    bottomIndex,
    topText,
    numberFont,
    customStyle
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
  static checkCanvasExist(id) {
    const container = document.getElementById(id);
    return container.children.length >= 1;
  }
  /**
   * 生成数组
   */
  _generateArray(array, cw, ch, topText, customStyle) {
    const { strokeStyle } = customStyle;
    this.ctx.strokeStyle = strokeStyle;
    let y = 0;
    if (topText.show) {
      y += this.numberFont + 2 * customStyle.lineWidth;
    }
    for (let i = 0; i < this.length; i++) {
      this.ctx.strokeRect(i * cw, y, cw, ch);
      this.ctx.fillText(
        array[i],
        (i + 0.5) * cw,
        ch / 2 + y + this.numberFont / 2
      );
    }
  }
  /**
   * 生成顶部文字
   */
  _generateText(topText, cw) {
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
  _generateIndex(cw, ch, bottomIndex, topText) {
    let y = ch;
    if (bottomIndex) {
      y += this.numberFont;
    }
    if (topText.show) {
      y += this.numberFont;
    }
    if (bottomIndex === "head tail") {
      this.ctx.fillText(0, (0 + 0.5) * cw, y);
      this.ctx.fillText(this.length - 1, (this.length - 1 + 0.5) * cw, y);
    } else {
      bottomIndex === "all";
      for (let i = 0; i < this.length; i++) {
        this.ctx.fillText(i, (i + 0.5) * cw, y);
      }
    }
  }
  /**
   * 添加到容器
   */
  _appendToContainer(id) {
    const container = document.getElementById(id);
    container.appendChild(this.canvas);
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
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
  /**
   * 数组操作unshift、push、shift、pop
   */
  mutateArray(action, payload) {
    this.clearCanvas();
    if (!["unshift", "push", "shift", "pop"].includes(action)) return;
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
   * 配置context
   */
  _configContext() {
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = this.customStyle.font;
    this.ctx.textAlign = "center";
  }
}

module.exports = VisualArray;