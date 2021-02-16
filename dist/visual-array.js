"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VisualArray = /** @class */ (function () {
    function VisualArray(props) {
        var _a;
        var containerId = props.containerId, array = props.array, _b = props.cw, cw = _b === void 0 ? 30 : _b, _c = props.ch, ch = _c === void 0 ? 30 : _c, _d = props.bottomIndex, bottomIndex = _d === void 0 ? "head tail" : _d, topText = props.topText, _e = props.customStyle, customStyle = _e === void 0 ? { font: "30px math", strokeStyle: "black", lineWidth: 1 } : _e;
        this.array = array;
        this.cw = cw;
        this.ch = cw;
        this.bottomIndex = bottomIndex;
        this.topText = topText || {
            show: true,
            data: (_a = { 0: "头" }, _a[array.length - 1] = "尾", _a),
        };
        this.customStyle = customStyle;
        this.length = array.length;
        this.numberFont = parseInt(customStyle.font.replace("px", ""));
        // 若已经存在则不重新创建canvas
        this.canvas =
            document.getElementById(containerId).children[0] ||
                document.createElement("canvas");
        this._calculateCanvas(this.length, cw, ch, this.bottomIndex, this.topText, this.numberFont, this.customStyle);
        var isCanvasExist = this._checkCanvasExist(containerId);
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
    VisualArray.prototype._calculateCanvas = function (length, cw, ch, bottomIndex, topText, numberFont, customStyle) {
        var width = cw * length;
        var canvasHeight = ch;
        if (bottomIndex) {
            canvasHeight += numberFont;
        }
        if (topText.show) {
            canvasHeight += numberFont;
        }
        var height = canvasHeight + 2 * customStyle.lineWidth;
        this.canvas.width = width;
        this.canvas.height = height;
        return { width: width, height: height };
    };
    /**
     * 检查是否已经添加
     */
    VisualArray.prototype._checkCanvasExist = function (id) {
        var container = document.getElementById(id);
        return container.children.length >= 1;
    };
    /**
     * 生成数组
     */
    VisualArray.prototype._generateArray = function (array, cw, ch, topText, customStyle) {
        var strokeStyle = customStyle.strokeStyle;
        this.ctx.strokeStyle = strokeStyle;
        var y = 0;
        if (topText.show) {
            y += this.numberFont + 2 * customStyle.lineWidth;
        }
        for (var i = 0; i < this.length; i++) {
            this.ctx.strokeRect(i * cw, y, cw, ch);
            this.ctx.fillText("" + array[i], (i + 0.5) * cw, ch / 2 + y + this.numberFont / 2);
        }
    };
    /**
     * 生成顶部文字
     */
    VisualArray.prototype._generateText = function (topText, cw) {
        var _this = this;
        if (!topText.show)
            return;
        var keys = Object.keys(topText.data);
        keys.forEach(function (key) {
            _this.ctx.fillText(topText.data[key], (parseInt(key) + 0.5) * cw, _this.numberFont);
        });
    };
    /**
     * 生成底部索引
     */
    VisualArray.prototype._generateIndex = function (cw, ch, bottomIndex, topText) {
        var y = ch;
        if (bottomIndex) {
            y += this.numberFont;
        }
        if (topText.show) {
            y += this.numberFont;
        }
        if (bottomIndex === "head tail") {
            this.ctx.fillText('0', (0 + 0.5) * cw, y);
            this.ctx.fillText("" + (this.length - 1), (this.length - 1 + 0.5) * cw, y);
        }
        else {
            bottomIndex === "all";
            for (var i = 0; i < this.length; i++) {
                this.ctx.fillText("" + i, (i + 0.5) * cw, y);
            }
        }
    };
    /**
     * 添加到容器
     */
    VisualArray.prototype._appendToContainer = function (id) {
        var container = document.getElementById(id);
        container.appendChild(this.canvas);
    };
    /**
     * 配置context
     */
    VisualArray.prototype._configContext = function () {
        this.ctx = this.canvas.getContext("2d");
        this.ctx.font = this.customStyle.font;
        this.ctx.textAlign = "center";
    };
    /**
     * 重新绘制
     */
    VisualArray.prototype._rerender = function () {
        this._generateArray(this.array, this.cw, this.ch, this.topText, this.customStyle);
        this._generateText(this.topText, this.cw);
        this._generateIndex(this.cw, this.ch, this.bottomIndex, this.topText);
    };
    /**
     * 数组操作unshift、push、shift、pop
     */
    VisualArray.prototype.mutateArray = function (action, payload) {
        var _a;
        this.clearCanvas();
        if (action === "unshift" || action === "push") {
            this.array[action](payload);
        }
        else {
            this.array[action]();
        }
        this.length = this.array.length;
        this._calculateCanvas(this.length, this.cw, this.ch, this.bottomIndex, this.topText, this.numberFont, this.customStyle);
        this._configContext();
        var tailIndex = this.array.length;
        if (action === "unshift" || action === "push") {
            tailIndex -= 2;
        }
        this.topText.data = (_a = {
                0: this.topText.data[0]
            },
            _a[this.array.length - 1] = this.topText.data[tailIndex],
            _a);
        this._rerender();
    };
    /**
     * 导出图片
     */
    VisualArray.prototype.exportImage = function () {
        this.canvas.toBlob(function (blob) {
            var url = URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.setAttribute("href", url);
            a.setAttribute("download", "visual-array-" + +new Date() + ".jpg");
            a.click();
            URL.revokeObjectURL(url);
        });
    };
    /**
     * 清空画布
     */
    VisualArray.prototype.clearCanvas = function () {
        var _a;
        (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    return VisualArray;
}());
exports.default = VisualArray;
