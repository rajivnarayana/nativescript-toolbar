# NativeScript tool bar plugin

A plugin for using your tool bars in iOS part of your native script app.

## Installation

Run the following command from the root of your project:

```
$ tns plugin add nativescript-toolbar
```

This command automatically installs the necessary files, as well as stores nativescript-toolbar as a dependency in your project's `package.json` file.

## Examples

The code below creates a tool bar in xml

```xml
<!-- my-page.xml -->
<Page xmlns="http://schemas.nativescript.org/tns.xsd" 
	xmlns:tools="nativescript-toolbar">
  <StackLayout style="vertical-align : bottom">
  	<tools:ToolBar>
  		<tools.ToolBar.barItems>
  			<tools:ToolBarItem text="Done"/>
  		</tools.ToolBar.barItems>
  	</tools:ToolBar>
  </StackLayout>
</Page>
```

The code below creates a tool bar in xml using ios system bar button items.

The value should be a number from the UIBarButtonSystemItem enumeration
* (https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIBarButtonItem_Class/#//apple_ref/c/tdef/UIBarButtonSystemItem)

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" 
	xmlns:tools="nativescript-toolbar">
  <StackLayout style="vertical-align : bottom">
  	<tools:ToolBar>
			<tools:ToolBar.barItems>
				<tools:ToolBarItem ios.systemIcon="5"/><!-- Flexible space item-->
				<tools:ToolBarItem ios.systemIcon="1"/> <!-- Cancel button -->
				<tools:ToolBarItem ios.systemIcon="0" tap="onDoneButtonTapped"/> <!-- Done button -->
			</tools:ToolBar.barItems>
		</tools:ToolBar>
  </StackLayout>
</Page>
```
<img src="https://raw.githubusercontent.com/rajivnarayana/nativescript-toolbar/master/cancel-done-portrait.png" width="320"/>
<img src="https://raw.githubusercontent.com/rajivnarayana/nativescript-toolbar/master/cancel-done-landscape.png" height="320"/>

