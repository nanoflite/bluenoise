import { bluenoise } from "./bluenoise.js"
import { createCanvas, createImageData } from "canvas"
import * as fs from 'fs'

for (let size=16; size<=256; size*=2) {
    console.log(`Generating a ${size}x${size} bluenoise png image`)
    const data = bluenoise(size, size, { onPhase: (phase) => {
            console.log(`\t${phase}`)
        }}).imageData()
    const imageData = createImageData(data, size, size)
    const canvas = createCanvas(size, size)
    const ctx = canvas.getContext("2d")
    ctx.putImageData(imageData, 0, 0)
    const filename = new URL(`./bluenoise_${size}x${size}.png`, import.meta.url)
    canvas.createPNGStream().pipe(fs.createWriteStream(filename))
}