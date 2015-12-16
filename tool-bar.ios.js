var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common = require("./tool-bar-common");
var utils_1 = require("utils/utils");
var types_1 = require("utils/types");
var view_1 = require("ui/core/view");
var image_source_1 = require("image-source");
global.moduleMerge(common, exports);
var ToolBarItem = (function (_super) {
    __extends(ToolBarItem, _super);
    function ToolBarItem() {
        _super.apply(this, arguments);
        this._ios = {
            systemIcon: undefined
        };
    }
    Object.defineProperty(ToolBarItem.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        set: function (value) {
            throw new Error("ToolBarItem.ios is read-only");
        },
        enumerable: true,
        configurable: true
    });
    return ToolBarItem;
})(common.ToolBarItem);
exports.ToolBarItem = ToolBarItem;
var ToolBar = (function (_super) {
    __extends(ToolBar, _super);
    function ToolBar() {
        _super.call(this);
        this._ios = UIToolbar.alloc().initWithFrame(CGRectZero);
    }
    ToolBar.prototype.update = function () {
        var items = this.barItems.getVisibleItems();
        console.log("no of items : " + items.length);
        var itemsArray = NSMutableArray.new();
        for (var i = 0; i < items.length; i++) {
            itemsArray.addObject(this.createBarButtonItem(items[i]));
        }
        this.ios.items = itemsArray;
        this.updateColors(this._ios);
    };
    ToolBar.prototype.createBarButtonItem = function (item) {
        var tapHandler = TapToolBarItemHandlerImpl.initWithOwner(new WeakRef(item));
        item.handler = tapHandler;
        var barButtonItem;
        if (types_1.isNumber(item.ios.systemIcon)) {
            barButtonItem = UIBarButtonItem.alloc().initWithBarButtonSystemItemTargetAction(item.ios.systemIcon, tapHandler, "tap");
        }
        else if (item.icon) {
            var img = image_source_1.fromFileOrResource(item.icon);
            if (img && img.ios) {
                barButtonItem = UIBarButtonItem.alloc().initWithImageStyleTargetAction(img.ios, UIBarButtonItemStyle.UIBarButtonItemStylePlain, tapHandler, "tap");
            }
            else {
                throw new Error("Error loading icon from " + item.icon);
            }
        }
        else {
            barButtonItem = UIBarButtonItem.alloc().initWithTitleStyleTargetAction(item.text + "", UIBarButtonItemStyle.UIBarButtonItemStylePlain, tapHandler, "tap");
        }
        return barButtonItem;
    };
    ToolBar.prototype.updateColors = function (toolbar) {
        var color = this.color;
        if (color) {
            toolbar.tintColor = color.ios;
        }
        else {
            toolbar.tintColor = null;
        }
        var bgColor = this.backgroundColor;
        toolbar.barTintColor = bgColor ? bgColor.ios : null;
    };
    ToolBar.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        var width = utils_1.layout.getMeasureSpecSize(widthMeasureSpec);
        var widthMode = utils_1.layout.getMeasureSpecMode(widthMeasureSpec);
        var height = utils_1.layout.getMeasureSpecSize(heightMeasureSpec);
        var heightMode = utils_1.layout.getMeasureSpecMode(heightMeasureSpec);
        var newHeight = height;
        var navBarWidth = 0;
        var navBarHeight = 0;
        if (heightMode != utils_1.layout.EXACTLY) {
            var toolbarSize = this._ios.intrinsicContentSize();
            newHeight = toolbarSize.height;
            heightMode = utils_1.layout.EXACTLY;
        }
        var heightAndState = view_1.View.resolveSizeAndState(height, newHeight, heightMode, 0);
        this.setMeasuredDimension(widthMeasureSpec, heightAndState);
    };
    ToolBar.prototype._shouldApplyStyleHandlers = function () {
        return true;
    };
    Object.defineProperty(ToolBar.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return ToolBar;
})(common.ToolBar);
exports.ToolBar = ToolBar;
var TapToolBarItemHandlerImpl = (function (_super) {
    __extends(TapToolBarItemHandlerImpl, _super);
    function TapToolBarItemHandlerImpl() {
        _super.apply(this, arguments);
    }
    TapToolBarItemHandlerImpl.initWithOwner = function (owner) {
        var handler = TapToolBarItemHandlerImpl.new();
        handler._owner = owner;
        return handler;
    };
    TapToolBarItemHandlerImpl.prototype.tap = function (args) {
        var owner = this._owner.get();
        if (owner) {
            owner._raiseTap();
        }
    };
    TapToolBarItemHandlerImpl.ObjCExposedMethods = {
        "tap": { returns: interop.types.void, params: [interop.types.id] }
    };
    return TapToolBarItemHandlerImpl;
})(NSObject);
