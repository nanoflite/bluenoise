import { points } from './point.js'

class Energy {

    constructor(map, dim, sigma) {
        this.map = map
        this.dim = dim
        this.sigma = sigma

        this.point = points(dim)
        this.sigma2 = 2 * Math.pow(sigma, 2)
        this.energyMap = new Float64Array(dim.size())
    }

    _calculateEnergy(pi) {
        let energy = 0.0
        this.dim.foreach((p) => {
                const value = this.map.get(p) > 0 ? 1.0 : -1.0
                const d2 = pi.distance2(p)
                energy += Math.exp(-d2/this.sigma2) * value
            })
        return energy
    }

    calculate(value) {
        this.energyMap.fill(0.0)
        this.dim.foreach((p) => {
            if (this.map.get(p) == value) {
                this.write(p, value)
            }
        })
    }

    get(p) {
        return this.energyMap[p.index()]
    }

    update(p) {
        this.energyMap[p.index()] = this._calculateEnergy(p)
    }

    write(pi, value) {
        this.dim.foreach((p) => {
            const level = value ? 1.0 : -1.0
            const d2 = pi.distance2(p)
            this.energyMap[p.index()] += Math.exp(-d2/this.sigma2) * level
        })
    }

    find(value) {
        let candidate = value ? Number.MIN_VALUE : Number.MAX_VALUE
        let found = []
        this.dim.foreach((p)=>{
            if (this.map.get(p) == value) {
                const energy = this.get(p)
                if (candidate == energy) {
                    found.push(p)
                } else if (value == 1 && energy > candidate || value == 0 && energy < candidate) {
                    candidate = energy
                    found = [p]
                }
            }
        })
        // return found[Math.floor(Math.random()*found.length)]
        return found[0]
    }

}

function energy(map, dim, sigma) {
    return new Energy(map, dim, sigma)
}

export { energy }