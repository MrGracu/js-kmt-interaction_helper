# [JS] KMT Interaction Helper
### [JavaScript] Key, Mouse, Touch Interaction Helper - Easier event handling  

## Installation
To use this script you can include optimized JS file using [jsDelivr](https://www.jsdelivr.com/):  
### Current version
```HTML
<script src="https://cdn.jsdelivr.net/gh/MrGracu/js-kmt-interaction_helper@main/production/kmt-interaction.helper.js"></script>
```
### Other versions
#### v0.1:
```HTML
<script src="https://cdn.jsdelivr.net/gh/MrGracu/js-kmt-interaction_helper@main/production/kmt-interaction.helper_v0.1.js"></script>
```
  
## Usage
You must include this script **before use** to use properly.  
### Tables
This script provides 4 arrays to which you need to assign functions that will be executed depending on the type of events they relate to:  
- `_keyFn` - contains functions for keyboard events
- `_mouseFn` - contains functions for mouse events
- `_touchFn` - contains functions for touch events
- `_onloadFn` - contains functions for on page load events. Push function directly to this array (not as object)  
  
### Push options
To assign function to one of the arrays you need tp push to this table function directly or as object.
  
Pushing function directly to array fires this function on every event to which array is related to, then you can handle the event yourself.
Pushing function to array as object allows you to specify some additional options:  
- `fn` - (**required**) type function name which should be fired
- `type` - (optional) specify event type when function should be fired. You can do this by type string as value when you want to fire this function on one event type or as array of string when you want to fire this function on multiple event functions (look at example section). To know what types of events a given array supports, see [**Event types**](#event-types) section below
- `target` - (optional) fire this function only on target which you specified
- `propagate` - (optional - default: true) - set to `false` if you want to prevent event propagation
- `preventDefault` - (optional - default: false) - set to `true` if you want to prevent default action event  
  
Pushing functions to array which fires onload page can be done with parameters:  

```javascript
_onloadFn.push(exampleFunction("Text in parameter"));
```  
  
Other arrays that are assigned to the mouse, touch and keyboard events **do not take any additional parameters**.
  
### Event types
When you push function to array as object then you can optionally specify event type when you want this function to fire. If you do not specify this option, then function will be fired on every event to which array is related to by default.  
  
For `_keyFn` array you can specify this events:  
- `up` - fires when key has been released
- `down` - fires when key has been pressed
- `press` - fires when key is pressed  
  
For `_mouseFn` array you can specify this events:  
- `click` - fires when user clicks on an element
- `context` - fires when user right-clicks on an element to open a context menu
- `dbclick` - fires when user double-clicks on an element
- `down` - fires when user presses a mouse button over an element
- `up` - fires when user releases a mouse button over an element
- `enter` - fires when pointer is moved onto an element
- `leave` - fires when pointer is moved out of an element
- `move` - fires when pointer is moving while it is over an element
- `out` - fires when user moves the mouse pointer out of an element, or out of one of its children
- `over` - fires when the pointer is moved onto an element, or onto one of its children  
  
For `_touchFn` array you can specify this events:  
- `cancel` - fires when touch is interrupted
- `end` - fires when user's finger is removed from a touch screen
- `move` - fires when user's finger is dragged across the screen
- `start` - fires when user's finger is placed on a touch screen  

## Return value from events
Except onload page event, other events return value to fired functions.  
  
Keyboard events array return object which contains properties:  
- `io` - string which contains one of the event array type: `mouse`, `touch`, `key`
- `type` - string which contains event type, for example `up`, when user release key
- `code` - int which contains key code, for example `65` means `a`
- `name` - string which contains key name, for example `ArrowUp`
- `target` - target on which element was fired  
  
Mouse and touch events arrays return the same object which contains properties:  
- `io` - string which contains one of the event array type: `mouse`, `touch`, `key`
- `type` - string which contains event type, for example `up`, when user release key
- `target` - target on which element was fired
- `ev` - event from whitch other parameters can be taken

## Examples
### Push directly to array
To push function directly to array:

```javascript
_keyFn.push(exampleFunction);
```  
  
---
### Push to array as object
To push function as object to array with all options specified:

```javascript
_mouseFn.push({
  type: ["click", "dbclick"],
  target: document.getElementById("test"),
  fn: exampleFunction,
  propagate: false,
  preventDefault: true
});
```  
  
To push function as object to array with only event type specified:

```javascript
_mouseFn.push({
  type: ["click", "dbclick"],
  fn: exampleFunction
});
```  
  
---
### Push function to onload page array
To push function to array which fires functions on page load event:

```javascript
_keyFn.push(exampleFunction);
```  
  
To push function with parameters to array which fires functions on page load event:

```javascript
_keyFn.push(exampleFunction("Text in parameter"));
```  
  
---
### Console log argument passed to fired function
Log passed argument from keyboard fired function to console:

```javascript
function exampleFunction(args) {
  console.log("exampleFunction:",args);
}
```  
  
Output:
```javascript
exampleFunction: Object { io: "key", type: "up", code: 38, name: "ArrowUp", target: body }
```

## License
[Licensed under MIT](https://github.com/MrGracu/js-kmt-interaction_helper/blob/main/LICENSE)
