type Point = {
  x: number
  y: number
}

const distance = (p1: Point, p2: Point) =>
  Math.hypot(p2.x - p1.x, p2.y - p1.y)

export default distance
