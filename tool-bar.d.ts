declare module "tool-bar" {
    import { EventData } from "data/observable";
    import { AddArrayFromBuilder, View } from "ui/core/view";
    import { Property } from "ui/core/dependency-observable";
    import { Bindable } from "ui/core/bindable";

    /**
     * Provides an abstraction over the ToolBar (iOS).
     */
    export class ToolBar extends View implements AddArrayFromBuilder {

        /**
         * Gets the collection of tool bar items.
         */
        barItems: ToolBarItems;
        
        /**
         * Gets the native [UIToolbar](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIToolbar_Class/) that represents the user interface for this component. Valid only when running on iOS.
         */
        ios: any /* UIToolbar */;
        
        /**
         * Updates the tool bar.
         */
        update();

        //@private
        _isEmpty(): boolean
        //@endprivate
        
		_addArrayFromBuilder(name: string, value: Array<any>): void;
        
        /**
         * Gets or sets the barPosition
         * https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIBarPositioning_Protocol/index.html#//apple_ref/doc/c_ref/UIBarPosition
         * UIBarPositionAny = 0,
         * UIBarPositionBottom = 1,
         * UIBarPositionTop = 2,
         * UIBarPositionTopAttached = 3,
         */
        barPosition: number;
        
	}
	
	/**
     * Represents a collection of ToolBarItems.
     */
	export class ToolBarItems {
        /**
         * Adds an item to the collection.
         * @param item - the item to be added
         */
        addItem(item: ToolBarItem): void;
        
        /**
         * Removes an item to the collection.
         * @param item - The item to be removed.
         */
        removeItem(item: ToolBarItem): void;
        
        /**
         * Gets an array of the current toolbar items in the collection.
         */
        getItems(): Array<ToolBarItem>;
        
        /**
         * Gets an item at a specified index.
         * @param index - The index.
         */
        getItemAt(index: number): ToolBarItem;
	}
	
	export class ToolBarItem extends Bindable {
		/**
         * String value used when hooking to tap event.
         */
        public static tapEvent: string;

        /**
         * Represents the observable property backing the text property.
         */
        public static textProperty: Property;

        /**
         * Represents the observable property backing the icon property.
         */
        public static iconProperty: Property;

        /**
         * Represents the observable property backing the visibility property.
         */
        public static visibilityProperty: Property;

        /**
         * Gets or sets the text of the toolbar item.
         */
        text: string;
        
        /**
         * Gets or sets the icon of the toolbar item.
         */
        icon: string;

        /**
         * Gets or sets the visibility of the toolbar item.
         */
        visibility: string;
		
        /**
         * Gets the action bar that contains the action item.
         */
        toolBar: ToolBar;
		/**
         * A basic method signature to hook an event listener (shortcut alias to the addEventListener method).
         * @param eventNames - String corresponding to events (e.g. "propertyChange"). Optionally could be used more events separated by `,` (e.g. "propertyChange", "change"). 
         * @param callback - Callback function which will be executed when event is raised.
         * @param thisArg - An optional parameter which will be used as `this` context for callback execution.
         */
        on(eventNames: string, callback: (data: EventData) => void);

        /**
         * Raised when a tap event occurs.
         */
        on(event: "tap", callback: (args: EventData) => void);
		
        //@private
        _raiseTap(): void;
        //@endprivate

        /**
         * Gets the iOS specific options of the action item.
         */
        ios: IOSToolBarItemSettings;
	}
	
	/**
     * Represents iOS specific options of the action item.
     */
    export interface IOSToolBarItemSettings {

        /**
         * Gets or sets a number representing the iOS system item to be displayed.
         * Use this property instead of ActionItem.icon if you want to diplsay a built-in iOS system icon.
         * Note: Property not applicable to NavigationButton
         * The value should be a number from the UIBarButtonSystemItem enumeration
         * (https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIBarButtonItem_Class/#//apple_ref/c/tdef/UIBarButtonSystemItem)
         *  0: Done
         *  1: Cancel
         *  2: Edit
         *  3: Save
         *  4: Add
         *  5: FlexibleSpace
         *  6: FixedSpace
         *  7: Compose
         *  8: Reply
         *  9: Action
         * 10: Organize
         * 11: Bookmarks
         * 12: Search
         * 13: Refresh
         * 14: Stop
         * 15: Camera
         * 16: Trash
         * 17: Play
         * 18: Pause
         * 19: Rewind
         * 20: FastForward
         * 21: Undo
         * 22: Redo
         * 23: PageCurl
         */
        systemIcon: number;
    }
}