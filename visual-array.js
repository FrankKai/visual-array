class VisualArray {
  /**
   * @param { String } canvasId
   * @param { String } containerId
   * @param { Array } array
   * @param { Number } cw
   * @param { Number } ch
   * @param { String } bottomIndex
   * @param { Object } topText
   * @param {Object} customStyle
   */

  constructor(
    canvasId,
    containerId,
    array,
    cw = 30,
    ch = 30,
    bottomIndex,
    topText,
    customStyle = { font: "30px math", strokeStyle: "black", lineWidth: 1 }
  ) {
    if (!canvasId || !containerId) return;
    if (!Array.isArray(array)) return;
    this.bottomIndex = bottomIndex || "head tail";
    this.topText = topText || {
      show: true,
      data: { 0: "头", [array.length - 1]: "尾" },
    };
    this.length = array.length;
    this.numberFont = parseInt(customStyle.font.replace("px", ""));

    this.canvas = document.createElement("canvas");
    const { width, height } = VisualArray.calculateCanvas(
      this.length,
      cw,
      ch,
      this.bottomIndex,
      this.topText,
      this.numberFont
    );
    this.canvas.width = width;
    this.canvas.height = height + 2 * customStyle.lineWidth;
    this.canvas.id = canvasId;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = customStyle.font;
    this.ctx.textAlign = "center";

    this.generateArray(array, cw, ch, this.topText, customStyle);
    this.generateText(this.topText, cw);
    this.generateIndex(cw, ch, this.bottomIndex, this.topText);
    this.appendToContainer(containerId);
  }
  /**
   * 计算canvas宽度和高度
   */
  static calculateCanvas(length, cw, ch, bottomIndex, topText, numberFont) {
    const width = cw * length;
    let canvasHeight = ch;
    if (bottomIndex) {
      canvasHeight += numberFont;
    }
    if (topText.show) {
      canvasHeight += numberFont;
    }
    const height = canvasHeight;
    return { width, height };
  }
  /**
   * 生成数组
   */
  generateArray(array, cw, ch, topText, customStyle) {
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
  generateText(topText, cw) {
    if (!topText.show) return;
    let keys = Object.keys(topText.data);
    keys.forEach((key) => {
      console.log(key);
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
  generateIndex(cw, ch, bottomIndex, topText) {
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
  appendToContainer(id) {
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
}
