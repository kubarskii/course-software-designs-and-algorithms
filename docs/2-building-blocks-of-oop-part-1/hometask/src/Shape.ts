import {Point} from "./Point"

export abstract class Shape {

    abstract getType(): string;

    constructor(
        protected points: Point[],
        protected color: string = 'green',
        protected filled = true
    ) {
        if (points.length < 3) {
            throw new Error('There must be at least 3 points')
        }
    }

    private generatePointsString() {
        return this.points.reduce((str, point) => {
            return `${str}${point.toString()}, `
        }, '').slice(0, -2);
    }

    getPerimeter() {
        return this.points.reduce((acc, point, index, list) => {
            return acc + point.distance(list[index + 1] || list[0])
        }, 0)
    }

    toString() {
        const filledStr = (this.filled) ? 'filled' : 'not filled';
        const pointsStr = this.generatePointsString()
        return `A Shape with color of ${this.color} and ${filledStr}. Points: ${pointsStr}.`
    }

}
