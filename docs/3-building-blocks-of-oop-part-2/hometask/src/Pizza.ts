import {Consumable} from "./Consumable";

export class Pizza extends Consumable {
    private numberOfEatenSlices: number = 0

    /**
     * UML and tests are slightly different
     * switched places for numberOfSlices and isSpoiled
     * */
    constructor(
        value: number,
        weight: number,
        public readonly numberOfSlices: number,
        isSpoiled: boolean,
    ) {
        super('pizza', value, weight, isSpoiled);
    }

    use(): string {
        if (this.isConsumed || !this.numberOfSlices)
            return `There's nothing left of the ${this.name} to consume.`

        let message = `You consumed a slice of the ${this.name}.`
        if (++this.numberOfEatenSlices >= this.numberOfSlices)
            this.isConsumed = true

        if (this.isSpoiled())
            message += '\nYou feel sick.'

        return message
    }

    getNumberOfEatenSlices(): number {
        return this.numberOfEatenSlices
    }
}
