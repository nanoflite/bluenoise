import { dimension } from "./dimension.js"
import { map } from './map.js'
import { energy } from './energy.js'
import { rank } from "./rank.js"

class Bluenoise {

    constructor(dim, sigma, initialPoints, onPhase) {
        this.dim = dim
        this.sigma = sigma
        this.initialPoints = initialPoints
        this.onPhase = onPhase

        this.map = map(this.dim)
        this.energyMap = energy(this.map, this.dim, this.sigma)
        this.rankMap = rank(this.dim)
    }

    _phase0() {
        this.map.init(this.initialPoints, (p, value) => this.energyMap.write(p, value))
        let pVoid, pCluster
        do {
            pCluster = this.energyMap.find(1)
            this.map.set(pCluster, 0)
            this.energyMap.write(pCluster, 0)
            pVoid = this.energyMap.find(0)
            this.map.set(pVoid, 1)
            this.energyMap.write(pVoid, 1)
        } while (!pVoid.same(pCluster))
    }

    _phase1() {
        this.energyMap.calculate(1)
        const map = this.map.copy()
        let points = map.points(1)
        do {
            const pCluster = this.energyMap.find(1)
            map.set(pCluster, 0)
            this.energyMap.write(pCluster, 0)
            points--
            this.rankMap.set(pCluster, points)
        } while(points>0)

    }
    _phase2() {
        let points = this.map.points(1)
        while(points<=this.dim.size()/2) {
            const pVoid = this.energyMap.find(0)
            this.map.set(pVoid, 1)
            this.energyMap.write(pVoid, 1)
            this.rankMap.set(pVoid, points)
            points++
        }
    }
    _phase3(map) {
        this.energyMap.calculate(0)
        let points = this.map.points(1)
        let pVoid
        while (pVoid = this.energyMap.find(0)) {
            this.energyMap.write(pVoid, 1)
            this.map.set(pVoid, 1)
            this.rankMap.set(pVoid, points)
            points++
        }
    }

    calculate() {
        this._phase0()
        this.onPhase('phase0', this.map.toImageData())
        this._phase1()
        this.onPhase('phase1', this.map.toImageData())
        this._phase2()
        this.onPhase('phase2', this.map.toImageData())
        this._phase3()
        const imageData = this.rankMap.toImageData()
        this.onPhase('phase3', imageData)
    }

    imageData() {
        return this.rankMap.toImageData()
    }

    uint8Data() {
        return this.rankMap.toUint8Array()
    }

}

function bluenoise(width, height, {sigma= 1.5, initialPoints= 0.1, onPhase = () => {}} = {} ) {
    const dim = dimension(width, height)
    const blue = new Bluenoise(dim, sigma, initialPoints, onPhase)
    blue.calculate()
    return blue
}

export { bluenoise }

