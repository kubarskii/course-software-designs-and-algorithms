import {Item} from "./Item";

export abstract class Consumable extends Item {
    public isConsumed: boolean = false

    constructor(
        name: string,
        value: number,
        weight: number,
        private _isSpoiled: boolean = false
    ) {
        super(name, value, weight)
    }

    /**
     * getter for isSpoiled
     * */
    isSpoiled(){
        return this._isSpoiled
    }

    /**
     * should return void based on UML
     * */
    use(): string {
        if (this.isConsumed)
            return `There's nothing left of the ${this.name} to consume.`

        let message = `You consumed the ${this.name}.`
        if (this._isSpoiled)
            message += '\nYou feel sick.'

        return message
    }
}
