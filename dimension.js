import { points } from './point.js'
class Dimension {

    constructor(width, height) {
        this.width = width
        this.height = height

        this.point = points(this)
    }

    size() {
        return this.width * this.height
    }

    foreach(cb) {
        for(let y=0; y<this.height; y++) {
            for(let x=0; x<this.width; x++) {
                cb(this.point(x,y))
            }
        }
    }

}

function dimension(width, height) {
    return new Dimension(width, height)
}

export { dimension }