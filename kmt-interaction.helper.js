/*!
  * KMT-Interaction Helper (https://github.com/MrGracu/js-kmt-interaction_helper)
  * Description: Key, Mouse, Touch Interaction Helper - Easier event handling
  * Copyright by Gracjan Mika (https://gmika.pl/)
  * Licensed under MIT (https://github.com/MrGracu/js-kmt-interaction_helper/blob/main/LICENSE)
  */

/* ARRAY CONTAINING FUNCTIONS FOR KEYS */
var _keyFn = [];

/* ARRAY CONTAINING FUNCTIONS FOR MOUSE */
var _mouseFn = [];

/* ARRAY CONTAINING FUNCTIONS FOR TOUCH */
var _touchFn = [];

/* ARRAY CONTAINING FUNCTIONS FOR PAGE LOAD */
var _onloadFn = [];

/**
 * Propagate event to functions.
 *
 * @param  args		- object of arguments passed to functions
 * @param  e		- (optional) event if not in args
 *
 * @return null
 */
function _eventPropagation(args, e = null) {
	let fnArray = [];
	
	if(args.io == "key") fnArray = _keyFn;
	else if(args.io == "mouse") fnArray = _mouseFn;
	else if(args.io == "touch") fnArray = _touchFn;
	
	for(let i = 0; i < fnArray.length; i++) {
		if(typeof fnArray[i] === "function") fnArray[i](args);
		else {
			if(typeof fnArray[i] === "object") {
				let isOk = true;
				
				if(fnArray[i].target !== undefined && fnArray[i].target != args.target) {
					isOk = false;
				}
				
				if(fnArray[i].type !== undefined) {
					if(typeof fnArray[i].type === "string" || typeof fnArray[i].type === "object") {
						if(typeof fnArray[i].type === "string") {
							if(fnArray[i].type != args.type) isOk = false;
						} else {
							if(typeof fnArray[i].type === "object") {
								if(!fnArray[i].type.includes(args.type)) isOk = false;
							}
						}
					}
					else console.error("Object in " + args.io + " array have bad key type. Position: " + i);
				}
				
				if(isOk) {
					if(fnArray[i].fn !== undefined && typeof fnArray[i].fn === "function") {
						fnArray[i].fn(args);
						
						if(fnArray[i].propagate !== undefined && !fnArray[i].propagate) {
							if(e !== null) e.stopPropagation();
							else if(args.ev != null) args.ev.stopPropagation();
						}
						
						if(fnArray[i].preventDefault !== undefined && fnArray[i].preventDefault) {
							if(e !== null) e.preventDefault();
							else if(args.ev != null) args.ev.preventDefault();
						}
					}
					else console.error("Object in " + args.io + " array have not get function. Position: " + i);
				}
			}
			else console.error("Unrecognized type in " + args.io + " array. Position: " + i + ", Type: '" + typeof fnArray[i] + "'");
		}
	}
}

/**
 * Propagate key events.
 *
 * @param  type		- event type (up, down, press)
 * @param  code		- key code
 * @param  name		- key name
 * @param  target	- event target
 *
 * @return null
 */
function _getKey(type, code, name, target = null, e = null) {
	let args = {
		io: "key",
		type,
		code,
		name,
		target
	};
	
	_eventPropagation(args, e);
}

/**
 * Propagate mouse events.
 *
 * @param  type	- event type (click, context, dbclick, down, up, enter, leave, move, out, over, scroll)
 * @param  e	- event
 *
 * @return null
 */
function _getMouse(type, e = null) {
	let args = {
		io: "mouse",
		type,
		target: e.target,
		ev: e
	};
	
	_eventPropagation(args);
}

/**
 * Propagate touch events.
 *
 * @param  type	- event type (cancel, end, move, start)
 * @param  e	- event
 *
 * @return null
 */
function _getTouch(type, e = null) {
	let args = {
		io: "touch",
		type,
		target: e.target,
		ev: e
	};
	
	_eventPropagation(args);
}

/*************************************************************/

/* ON KEY DOWN EVENT */
window.onkeydown = function(e) {
	let code = e.which || e.keyCode;
	let name = e.key;
	
	_getKey("down", code, name, e.target, e);
};

/* ON KEY PRESS EVENT */
window.onkeypress = function(e) {
	let code = e.which || e.keyCode;
	let name = e.key;
	
	_getKey("press", code, name, e.target, e);
};

/* ON KEY UP EVENT */
window.onkeyup = function(e) {
	let code = e.which || e.keyCode;
	let name = e.key;
	
	_getKey("up", code, name, e.target, e);
};

/*************************************************************/

/* ON WINDOW CLICK EVENT */
window.onclick = function(e) {
	_getMouse("click", e);
};

/* ON WINDOW CONTEXT MENU EVENT */
window.oncontextmenu = function(e) {
	_getMouse("context", e);
};

/* ON WINDOW DOUBLE-CLICK EVENT */
window.ondblclick = function(e) {
	_getMouse("dbclick", e);
};

/* ON WINDOW MOUSE DOWN EVENT */
window.onmousedown = function(e) {
	_getMouse("down", e);
};

/* ON WINDOW MOUSE UP EVENT */
window.onmouseup = function(e) {
	_getMouse("up", e);
};

/* ON WINDOW MOUSE ENTER EVENT */
window.onmouseenter = function(e) {
	_getMouse("enter", e);
};

/* ON WINDOW MOUSE LEAVE EVENT */
window.onmouseleave = function(e) {
	_getMouse("leave", e);
};

/* ON WINDOW MOUSE MOVE EVENT */
window.onmousemove = function(e) {
	_getMouse("move", e);
};

/* ON WINDOW MOUSE OUT EVENT */
window.onmouseout = function(e) {
	_getMouse("out", e);
};

/* ON WINDOW MOUSE OVER EVENT */
window.onmouseover = function(e) {
	_getMouse("over", e);
};

/* ON WINDOW MOUSE SCROLL EVENT */
window.onscroll = function(e) {
	_getMouse("scroll", e);
};

/*************************************************************/

/* ON WINDOW TOUCH CANCEL EVENT */
window.addEventListener("touchcancel", function(e) {
	_getTouch("cancel", e);
});

/* ON WINDOW TOUCH END EVENT */
window.addEventListener("touchend", function(e) {
	_getTouch("end", e);
});

/* ON WINDOW TOUCH MOVE EVENT */
window.addEventListener("touchmove", function(e) {
	_getTouch("move", e);
});

/* ON WINDOW TOUCH START EVENT */
window.addEventListener("touchstart", function(e) {
	_getTouch("start", e);
});

/*************************************************************/

/* ON WINDOW LOADED EVENT */
window.onload = function() {
	for(let i = 0; i < _onloadFn.length; i++) {
		if(_onloadFn[i].length > 1 && typeof _onloadFn[i][0] === "function") _onloadFn[i][0](_onloadFn[i][1]);
		else if(typeof _onloadFn[i] === "function") _onloadFn[i]();
	}
};
