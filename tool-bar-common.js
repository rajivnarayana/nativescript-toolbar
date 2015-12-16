var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var view_1 = require("ui/core/view");
var bindable_1 = require("ui/core/bindable");
var dependency_observable_1 = require("ui/core/dependency-observable");
var enums_1 = require("ui/enums");
var TOOLBAR_ITEMS = "barItems";
var knownCollections;
(function (knownCollections) {
    knownCollections.items = "barItems";
})(knownCollections = exports.knownCollections || (exports.knownCollections = {}));
var ToolBar = (function (_super) {
    __extends(ToolBar, _super);
    function ToolBar() {
        _super.call(this);
        this._toolbarItems = new ToolBarItems(this);
    }
    Object.defineProperty(ToolBar.prototype, "barItems", {
        get: function () {
            return this._toolbarItems;
        },
        set: function (value) {
            throw new Error("actionItems property is read-only");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBar.prototype, "_childrenCount", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    ToolBar.prototype.update = function () {
    };
    ToolBar.prototype._addArrayFromBuilder = function (name, value) {
        console.log("Add array from builder: for name: " + value.length);
        if (name === TOOLBAR_ITEMS) {
        }
    };
    ToolBar.prototype._addChildFromBuilder = function (name, value) {
        console.log("Add child from builder: for name: " + value);
        this.barItems.addItem(value);
    };
    ToolBar.prototype._onBindingContextChanged = function (oldValue, newValue) {
        _super.prototype._onBindingContextChanged.call(this, oldValue, newValue);
        this._toolbarItems.getItems().forEach(function (item, i, arr) { item.bindingContext = newValue; });
    };
    ToolBar.prototype._isEmpty = function () {
        if (this.barItems.getItems().length > 0) {
            return false;
        }
        return true;
    };
    return ToolBar;
})(view_1.View);
exports.ToolBar = ToolBar;
var ToolBarItems = (function () {
    function ToolBarItems(toolBar) {
        this._items = new Array();
        this._toolBar = toolBar;
    }
    ToolBarItems.prototype.addItem = function (item) {
        console.log("addItem : " + (item ? item.text : "empty"));
        if (!item) {
            throw new Error("Cannot add empty item");
        }
        this._items.push(item);
        item.toolBar = this._toolBar;
        this.invalidate();
    };
    ToolBarItems.prototype.removeItem = function (item) {
        if (!item) {
            throw new Error("Cannot remove empty item");
        }
        var itemIndex = this._items.indexOf(item);
        if (itemIndex < 0) {
            throw new Error("Cannot find item to remove");
        }
        this._items.splice(itemIndex, 1);
        item.toolBar = undefined;
        this.invalidate();
    };
    ToolBarItems.prototype.getItems = function () {
        return this._items.slice();
    };
    ToolBarItems.prototype.getVisibleItems = function () {
        var visibleItems = [];
        this._items.forEach(function (item) {
            if (isVisible(item)) {
                visibleItems.push(item);
            }
        });
        return visibleItems;
    };
    ToolBarItems.prototype.getItemAt = function (index) {
        if (index < 0 || index >= this._items.length) {
            return undefined;
        }
        return this._items[index];
    };
    ToolBarItems.prototype.setItems = function (items) {
        console.log("Set Items : " + items.length);
        while (this._items.length > 0) {
            this.removeItem(this._items[this._items.length - 1]);
        }
        for (var i = 0; i < items.length; i++) {
            this.addItem(items[i]);
        }
        this.invalidate();
    };
    ToolBarItems.prototype.invalidate = function () {
        if (this._toolBar) {
            this._toolBar.update();
        }
    };
    return ToolBarItems;
})();
exports.ToolBarItems = ToolBarItems;
var ToolBarItem = (function (_super) {
    __extends(ToolBarItem, _super);
    function ToolBarItem() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ToolBarItem.prototype, "text", {
        get: function () {
            return this._getValue(ToolBarItem.textProperty);
        },
        set: function (value) {
            this._setValue(ToolBarItem.textProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarItem.prototype, "icon", {
        get: function () {
            return this._getValue(ToolBarItem.iconProperty);
        },
        set: function (value) {
            this._setValue(ToolBarItem.iconProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarItem.prototype, "visibility", {
        get: function () {
            return this._getValue(ToolBarItem.visibilityProperty);
        },
        set: function (value) {
            this._setValue(ToolBarItem.visibilityProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolBarItem.prototype, "toolBar", {
        get: function () {
            return this._toolBar;
        },
        set: function (value) {
            if (value !== this._toolBar) {
                this._toolBar = value;
                if (this._toolBar) {
                    this.bindingContext = this._toolBar.bindingContext;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ToolBarItem.prototype._raiseTap = function () {
        this._emit(ToolBarItem.tapEvent);
    };
    ToolBarItem.onItemChanged = function (data) {
        var menuItem = data.object;
        if (menuItem.toolBar) {
            menuItem.toolBar.update();
        }
    };
    ToolBarItem.tapEvent = "tap";
    ToolBarItem.textProperty = new dependency_observable_1.Property("text", "ToolBarItem", new dependency_observable_1.PropertyMetadata("", null, ToolBarItem.onItemChanged));
    ToolBarItem.iconProperty = new dependency_observable_1.Property("icon", "ToolBarItem", new dependency_observable_1.PropertyMetadata(null, null, ToolBarItem.onItemChanged));
    ToolBarItem.visibilityProperty = new dependency_observable_1.Property("visibility", "ToolBarItem", new dependency_observable_1.PropertyMetadata(enums_1.Visibility.visible, null, ToolBarItem.onItemChanged));
    return ToolBarItem;
})(bindable_1.Bindable);
exports.ToolBarItem = ToolBarItem;
function isVisible(item) {
    return item.visibility === enums_1.Visibility.visible;
}
exports.isVisible = isVisible;
