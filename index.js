import { bluenoise } from "./bluenoise.js"

const width = 256
const height = 256
function setImage(id, data) {
    const canvas = document.getElementById(id)
    const ctx = canvas.getContext("2d")
    const imageData = new ImageData(data, width, height)
    ctx.putImageData(imageData, 0, 0)
}

const data = bluenoise(width, height, {
    onPhase: (name, data) => {
        setImage(name, data)
    }
})

setImage('phase3', data)
