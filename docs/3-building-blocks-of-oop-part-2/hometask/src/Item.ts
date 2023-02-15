import {Comparable} from "./Comparable";

export abstract class Item implements Comparable<Item> {
    static idCounter: number = 0

    static resetIdCounter(): void {
        Item.idCounter = 0
    }

    private readonly id: number

    protected constructor(
        public readonly name: string, public value: number, public weight: number) {
        this.id = ++Item.idCounter;
    }

    abstract use(): void

    private compare (a, b): number {
        if (a > b) return 1
        if (a < b) return -1
        return 0
    }

    private compareByName(otherName: string): number {
        const lowerThisName = this.name.toLowerCase()
        const lowerOther = otherName.toLowerCase()
        return this.compare(lowerThisName, lowerOther)
    }

    private compareByValue(otherValue: number): number {
        return this.compare(this.value, otherValue)
    }

    compareTo(other: Item): number {
        let result = this.compareByValue(other.value);
        if (result === 0)
            result = this.compareByName(other.name)
        return result
    }

    getId(){
        return this.id
    }


    toString(): string {
        /**
         * There was an error with "-" character
         * after ${this.name} "-" <------------
         *
         * Please check
         * */
        return `${this.name} − Value: ${this.value.toFixed(2)}, Weight: ${this.weight.toFixed(2)}`
    }

}
