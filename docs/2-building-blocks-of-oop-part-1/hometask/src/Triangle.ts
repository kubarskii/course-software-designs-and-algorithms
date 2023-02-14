import {Point} from "./Point";
import {Shape} from "./Shape";

export class Triangle extends Shape {

    private static EQUILATERAL = "equilateral triangle"
    private static SCALENE = "scalene triangle"
    private static ISOSCELES = "isosceles triangle"

    private generateTriangleString(): string {
        return this.points.reduce((str, point, index) => {
            return `${str}v${index + 1}=${point.toString()},`
        }, 'Triangle[').slice(0, -1).concat(']')
    }

    constructor(p1: Point, p2: Point, p3: Point)
    constructor(p1: Point, p2: Point, p3: Point, color: string)
    constructor(p1: Point, p2: Point, p3: Point, color: string, filled: boolean)
    constructor(p1: Point, p2: Point, p3: Point, color?: string, filled?: boolean) {
        super([p1, p2, p3], color, filled)
    }

    private toFixedNumber(v: number, fraction: number = 2): number {
        return parseFloat(v.toFixed(fraction))
    }

    private countEqualSides(): number {
        const A = this.points[0]
        const B = this.points[1]
        const C = this.points[2]

        const a = this.toFixedNumber(A.distance(B))
        const b = this.toFixedNumber(B.distance(C))
        const c = this.toFixedNumber(C.distance(A))

        if ((a === b) && (b === c)) return 3
        if ((a === b) || (a === c) || (b === c)) return 2
        return 1

    }

    getType(): string {
        const eqSidesCount = this.countEqualSides()
        const messages = [Triangle.SCALENE, Triangle.ISOSCELES, Triangle.EQUILATERAL]
        const msg = messages[eqSidesCount - 1]
        return msg
    }

    toString(): string {
        return this.generateTriangleString()
    }
}
