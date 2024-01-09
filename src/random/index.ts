export const random = (a = 0, z = 1) => Math.random() * (z - a) + a

export const randomBool = () => Boolean(random() > 0.5)

export const randomInt = (a = 0, z = 1) => Math.round(random(a, z))
