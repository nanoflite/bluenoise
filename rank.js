import { points } from './point.js'

class Rank {

    constructor(dim) {
        this.dim = dim

        this.point = points(this.dim)
        this.map = new Uint32Array(dim.size())
    }

    set(p, v) {
        this.map[p.index()] = v
    }

    toImageData() {
        let max = Number.MIN_VALUE
        this.dim.foreach((p)=>{
            max = Math.max(max, this.map[p.index()])
        })
        const data = new Uint8ClampedArray(this.map.length*4)
        this.dim.foreach((p)=>{
            const v = Math.floor(this.map[p.index()] * 255 / max)
            const idx = 4 * p.index()
            data[idx+0] = v
            data[idx+1] = v
            data[idx+2] = v
            data[idx+3] = 255
        })
        return data
    }
}

function rank(dim) {
    return new Rank(dim)
}

export { rank }