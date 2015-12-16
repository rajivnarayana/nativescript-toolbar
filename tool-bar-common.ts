import { ToolBarItem as ToolBarItemDefinition, ToolBar as ToolBarDefinition, ToolBarItems as ToolBarItemsDefinition, IOSToolBarItemSettings} from "tool-bar";
import { View } from "ui/core/view";
import { Bindable } from "ui/core/bindable";
import { Property, PropertyChangeData, PropertyMetadata } from "ui/core/dependency-observable";
import { Visibility } from "ui/enums";

var TOOLBAR_ITEMS = "barItems";

export module knownCollections {
    export var items = "barItems";
}

export class ToolBar extends View implements ToolBarDefinition {

    private _toolbarItems: ToolBarItems;

    get barItems(): ToolBarItems {
        return this._toolbarItems;
    }
    set barItems(value: ToolBarItems) {
        throw new Error("actionItems property is read-only");
    }

    get _childrenCount(): number {
        return 0;
    }

    constructor() {
        super();
        this._toolbarItems = new ToolBarItems(this);
    }

    public update() {
        // 
    }

    public _addArrayFromBuilder(name: string, value: Array<any>) {
        console.log(`Add array from builder: for name: ${value.length}`);
        if (name === TOOLBAR_ITEMS) {
            // this.barItems.setItems(value);
        }
    }

    public _addChildFromBuilder(name: string, value: any) {
        console.log(`Add child from builder: for name: ${value}`);
        // if (name === "ToolBarItem") {
            this.barItems.addItem(value);
        // }
    }

    public _onBindingContextChanged(oldValue: any, newValue: any) {
        super._onBindingContextChanged(oldValue, newValue);

        this._toolbarItems.getItems().forEach((item, i, arr) => { item.bindingContext = newValue; });
    }

    public _isEmpty(): boolean {
        if (this.barItems.getItems().length > 0) {
            return false;
        }

        return true;
    }
}

export class ToolBarItems implements ToolBarItemsDefinition {
    private _items: Array<ToolBarItemDefinition> = new Array<ToolBarItemDefinition>();
    private _toolBar: ToolBar;

    constructor(toolBar: ToolBar) {
        this._toolBar = toolBar;
    }

    public addItem(item: ToolBarItemDefinition): void {
        console.log(`addItem : ${item?item.text:"empty"}`);
        if (!item) {
            throw new Error("Cannot add empty item");
        }

        this._items.push(item);
        item.toolBar = this._toolBar;
        this.invalidate();
    }

    public removeItem(item: ToolBarItemDefinition): void {
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
    }

    public getItems(): Array<ToolBarItemDefinition> {
        return this._items.slice();
    }

    public getVisibleItems(): Array<ToolBarItemDefinition> {
        var visibleItems = [];
        this._items.forEach((item) => {
            if (isVisible(item)) {
                visibleItems.push(item);
            }
        });

        return visibleItems;
    }

    public getItemAt(index: number): ToolBarItemDefinition {
        if (index < 0 || index >= this._items.length) {
            return undefined;
        }

        return this._items[index];
    }

    public setItems(items: Array<ToolBarItemDefinition>) {
        
        console.log(`Set Items : ${items.length}`);
        // Remove all existing items
        while (this._items.length > 0) {
            this.removeItem(this._items[this._items.length - 1]);
        }

        // Add new items
        for (var i = 0; i < items.length; i++) {
            this.addItem(items[i]);
        }

        this.invalidate();
    }

    private invalidate() {
        if (this._toolBar) {
            this._toolBar.update();
        }
    }
}

export class ToolBarItem extends Bindable implements ToolBarItemDefinition {
    public static tapEvent = "tap";

    public static textProperty = new Property(
        "text", "ToolBarItem", new PropertyMetadata("", null, ToolBarItem.onItemChanged));

    public static iconProperty = new Property(
        "icon", "ToolBarItem", new PropertyMetadata(null, null, ToolBarItem.onItemChanged));

    public static visibilityProperty = new Property(
        "visibility", "ToolBarItem", new PropertyMetadata(Visibility.visible, null, ToolBarItem.onItemChanged));

    private _toolBar: ToolBar;

    get text(): string {
        return this._getValue(ToolBarItem.textProperty);
    }

    set text(value: string) {
        this._setValue(ToolBarItem.textProperty, value);
    }

    get icon(): string {
        return this._getValue(ToolBarItem.iconProperty);
    }

    set icon(value: string) {
        this._setValue(ToolBarItem.iconProperty, value);
    }

    get visibility(): string {
        return this._getValue(ToolBarItem.visibilityProperty);
    }

    set visibility(value: string) {
        this._setValue(ToolBarItem.visibilityProperty, value);
    }

    get toolBar(): ToolBar {
        return this._toolBar;
    }

    set toolBar(value: ToolBar) {
        if (value !== this._toolBar) {
            this._toolBar = value;
            if (this._toolBar) {
                this.bindingContext = this._toolBar.bindingContext;
            }
        }
    }

    public _raiseTap() {
        this._emit(ToolBarItem.tapEvent);
    }

    public ios: IOSToolBarItemSettings;

    private static onItemChanged(data: PropertyChangeData) {
        var menuItem = <ToolBarItem>data.object;
        if (menuItem.toolBar) {
            menuItem.toolBar.update();
        }
    }
}

export function isVisible(item: ToolBarItemDefinition) {
    return item.visibility === Visibility.visible;
}
