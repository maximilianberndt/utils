# utils

Collection of utility functions

## Core

**io:** Create an intersection observer to detect when an element comes in the viewport and leaves it again and execute a function.
```
const fnIn = ()=>{ console.log("hello") }
const fnOut = ()=>{ console.log("bye") }
const el = document.querySelector("#main")

utils.io({el, fnIn, fnOut})
```

**mouse:**
```
utils.mouse.start(true); // Start observing mouse position and calculate movement speed

// Get mouse position 
utils.mouse.getPos(); // {x: 100, y: 315}

// Get mouse movement speed 
utils.mouse.getSpeed(); // 1.7

utils.mouse.stop(); // Stop observing mouse position again
```

**raf:** Central request animation frame loop, that starts and cancels itself.

```
// Add function to raf
let fn = () => {console.log("hello")};
let rafId = utils.raf.add(fn)

// Remove function again
utils.raf.remove(rafId)

// Stop raf
utils.raf.stop();
```

**scroll:**

**storage:** Global storage for variables, holds current broweser, isMobile, window width and window height by default
```
utils.storage = {
	browser,
	isMobile,
	width, 	// window width
	height,	// window height
}
```


## Functions

**bind**: Sets scope of functions

```
let fn1 = () => { console.log("hello") }
let fn2 = () => { console.log("sup") }

utils.bind(this, ["fn1", "fn2"])
```

**debounce:** Will only trigger function when it has not been invoked in given timeframe

```
let onResize = () => { console.log(window.innerWidth) }
document.addEventListener("resize", utils.debounce(onResize, 250))
```

**getPerformance:** Returns a value between 0 and 3 that represents the performance (higher is better)

```
let perf = utils.getPerformance // 0, 1 , 2 or 3
```

**prefetch:** Prefectch a page, waits until the main thread is idle

```
utils.prefetch(["/about.html", "/contact.html"])
```

**sniffBrowser:** Returns object with booleans for browsers

```
utils.sniffBrowser()
```

**sniffMobile:** Returns true or false when on mobile device

```
utils.sniffMobile() // true or false
```

## Math

**clamp:** Clamps a value between an upper and lower bound.

```
let value = 100;
clamp(value, 0, 10) // 10
```

**dist:** Distance between two points.

```
let pos1 = {
	x: 10,
	y: 10	
};

let pos2 = {
	x: 20,
	y: 20	
};

dist(pos1.x, pos2.x, pos1.x, pos2.x) // 10
```

**lerp:** Linear interpolation between two known points.

```
let value = 10;

const newValue = lerp(value, 50, 0.4) // 26
```

**map:** Re-maps a number from one range to another.

```
let value = 5;

map(value, 0, 10, 3, 20) // 11.5
```

**round:** Round to given decimal

```
let value = 10.4567890

utils.round(value, 1000) // 10.456
```

**rand:** Returns a random number in a given range.

```
let value = utils.rand(0, 100)
```