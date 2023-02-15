import {Consumable} from "./Consumable";

export class Pizza extends Consumable {
    private numberOfEatenSlices: number = 0

    /**
     * TODO: CHECK!!
     * UML and tests are slightly different
     * switched places for numberOfSlices and isSpoiled
     *
     * Check weather Consumable isSpoiled should be public???
     * @see {Consumable}
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

        /**
         * TODO: Uncomment if isSpoiled is public
         * @see {Consumable}
         */
        if (this.isSpoiled())
            message += '\nYou feel sick.'

        return message
    }

    getNumberOfEatenSlices(): number {
        return this.numberOfEatenSlices
    }
}
