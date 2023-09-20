import {points, pointFromIndex} from "./point.js";

class Map {

    constructor(dim) {
        this.dim = dim

        this.point = points(this.dim)
        this.map = new Uint8Array(this.dim.size())
    }

    init(initialPointsPercentage, cb) {
        const initialPoints = Math.floor(this.map.length * initialPointsPercentage)
        let i = 0
        for(let i=0; i<initialPoints; i++) {
            const index = Math.floor(Math.random() * this.map.length)
            this.map[index] = 1
            cb(pointFromIndex(index, this.dim), 1)
        }
    }

    get(p) {
        return this.map[p.index()]
    }

    set(p, v) {
        this.map[p.index()] = v
    }

    copy() {
        const copyMap = new Map(this.dim)
        copyMap.map = this.map.slice()
        return copyMap
    }

    points(value) {
        let count = 0
        this.map.forEach((e)=>{
            if (e === value) count++
        })
        return count
    }
    toImageData() {
        const data = new Uint8ClampedArray(this.map.length*4)
        this.dim.foreach((p)=>{
            const v = this.map[p.index()]*255
            const idx = 4 * p.index()
            data[idx+0] = v
            data[idx+1] = v
            data[idx+2] = v
            data[idx+3] = 255
        })
        return data
    }


}

function map (dim) {
    return new Map(dim)
}

export { map }