**arrayPick** Randomly pick a value from an array

```
arrayPick([1,2,3])
```

**arrayShuffle** Randomly pick a value from an array

```
arrayShuffle([1,2,3])
```

**clamp** Clamps a value between an upper and lower bound.

```
const value = 100;
clamp(value, 0, 10) // 10
```

**damp** Framerate independent lerp

```
const value = 10;
lerpdamp(value, 50, 0.4, deltaTime) // 26
```

**debounce** Will only trigger function when it has not been invoked in given timeframe

```
const onResize = () => { console.log(window.innerWidth) }
document.addEventListener("resize", debounce(onResize, 250))
```

**distance** Distance between two points using pythagoras theorem
```
distance({ x: 0, y: 2 }, { x: 1, y: -2}) // 4.123
```

**finiteStateMachine** 

**fract** Loop a value between 0 and 1
```
fract(10.2) // 2
```

**inertia** 
**intersectionObserver** 

**lerp** Linear interpolation between two known points.

```
const value = 10;
lerp(value, 50, 0.4) // 26
```

**map** Re-maps a number from one range to another.

```
const value = 5;
map(value, 0, 10, 3, 20) // 11.5
```

**objectPool** Declare items once and then reuse them
```
const objects = objectPool([...Array(10)].map(new AnimatedLine))
objects.getNext() // will get the next object in the pool, once at the end, will get the first again
```

**prefetch** Prefectch a page, waits until the main thread is idle

```
prefetch(["/about.html", "/contact.html"])
```

**prng** Generate a pseudo random number between 0 and 1 based on a seed

```
const generator = prng("Your seed")
console.log(generator()) // 0.093 - will be same for every time the seed is called 
```

**raf** Central request animation frame loop, that starts and cancels itself.

```
// Add function to raf
const remove = raf(() => console.log("hello"))

// Remove function again
setTimeout(remove, 1000)
```

**random** Returns a random number in a given range.

```
const value = random(0, 100)
```

**randomGaussian**

**round** Round to given decimal

```
const value = 10.4567890
round(value, 1000) // 10.456
```

**smoothstep** 
**smootherstep**
**spring** 

**weightedList**

```
const list = weightedList([
	{ item: "Option 1", weight: 9 },
	{ item: "Option 2", weight: 1 }
])

list.get() // 9 out of 10 times will return Option 9
```


