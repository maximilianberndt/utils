# utils

Collection of utility functions

**raf:** Central request animation frame loop, that starts and cancels itself.

```
// Add function to raf

const remove = raf(() => console.log("hello"))

// Remove function again
setTimeout(remove, 1000)
```

**debounce:** Will only trigger function when it has not been invoked in given timeframe

```
const onResize = () => { console.log(window.innerWidth) }
document.addEventListener("resize", debounce(onResize, 250))
```

**prefetch:** Prefectch a page, waits until the main thread is idle

```
prefetch(["/about.html", "/contact.html"])
```

**clamp:** Clamps a value between an upper and lower bound.

```
const value = 100;
clamp(value, 0, 10) // 10
```

**dist:** Distance between two points.

```
const p1 = { x: 10, y: 10	};
const p2 = { x: 20, y: 20 };

dist(pos1, pos2) // 10
```

**lerp:** Linear interpolation between two known points.

```
const value = 10;

const newValue = lerp(value, 50, 0.4) // 26
```

**map:** Re-maps a number from one range to another.

```
const value = 5;

map(value, 0, 10, 3, 20) // 11.5
```

**round:** Round to given decimal

```
const value = 10.4567890

round(value, 1000) // 10.456
```

**random:** Returns a random number in a given range.

```
const value = random(0, 100)
```
