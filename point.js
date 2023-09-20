class Point {

    constructor(x, y, dim) {
        this.x = x
        this.y = y
        this.dim = dim
    }

    same(p) {
        return this.x === p.x && this.y === p.y
    }

    distance2 (p)
    {
        let dx = Math.abs(p.x - this.x)
        let dy = Math.abs(p.y - this.y)

        if (dx > this.dim.width / 2) {
            dx = this.dim.width - dx
        }

        if (dy > this.dim.height / 2) {
            dy = this.dim.height - dy
        }

        return Math.pow(dx,2) + Math.pow(dy, 2)
    }

    index() {
        return this.x + this.y * this.dim.width
    }


}

function point(x, y, dim) {
    return new Point(x, y, dim)
}

function points(dim) {
    return (x, y) => {
        return point(x, y, dim)
    }
}

function pointFromIndex(index, dim) {
    const x = index % dim.width
    const y = Math.floor(index / dim.height)
    return point(x, y, dim)
}

export { points, pointFromIndex }