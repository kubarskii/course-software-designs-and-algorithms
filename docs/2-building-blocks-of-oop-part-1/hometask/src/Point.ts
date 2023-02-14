export class Point {

    private calcDistance(x2: number, y2: number) {
        let y = x2 - this.x;
        let x = y2 - this.y;
        return Math.sqrt(x * x + y * y);
    }

    constructor()
    constructor(private _x: number = 0, private _y: number = 0) {
    }

    get x() {
        return this._x
    }

    get y() {
        return this._y
    }

    distance(): number
    distance(point: Point): number
    distance(x: number, y: number): number
    distance(xOrPoint?: number | Point, y?: number): number {
        let x2 = 0;
        let y2 = 0;
        if (xOrPoint instanceof Point) {
            x2 = xOrPoint.x;
            y2 = xOrPoint.y;
        } else if (typeof xOrPoint === 'number' && typeof y === 'number') {
            x2 = xOrPoint;
            y2 = y;
        }
        return this.calcDistance(x2, y2);
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}
