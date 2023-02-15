import {Item} from "./Item";

export abstract class Weapon extends Item {

    static MODIFIER_CHANGE_RATE: number = 0.05

    protected damageModifier: number = 0;
    protected durabilityModifier: number = 0;

    private isBroken: boolean = false;

    constructor(
        name: string,
        protected baseDamage: number,
        private baseDurability: number,
        value: number,
        weight: number
    ) {
        super(name, value, weight);
    }

    abstract polish(): void

    private calcEffectiveDamage(): number {
        return this.baseDamage + this.damageModifier
    }

    use(): string {
        if (this.isBroken) return `You can't use the ${this.name}, it is broken.`

        let message = `You use the ${this.name}, dealing ${Weapon.MODIFIER_CHANGE_RATE} points of damage.`;
        this.durabilityModifier -= Weapon.MODIFIER_CHANGE_RATE;
        const updatedEffectiveDurability = this.getEffectiveDurability()
        if (updatedEffectiveDurability <= 0) {
            message += `\nThe ${this.name} breaks.`
            this.isBroken = true
        }
        return message
    }


    toString(): string {
        const damage = this.getEffectiveDamage().toFixed(2)
        const durability = (this.getEffectiveDurability() * 100).toFixed(2)
        const weight = this.weight.toFixed(2)
        const value = this.value.toFixed(2)
        return `${this.name} − Value: ${value}, Weight: ${weight}, Damage: ${damage}, Durability: ${durability}%`
    }

    getEffectiveDamage(): number {
        return this.calcEffectiveDamage()
    }

    getEffectiveDurability(): number
    getEffectiveDurability(durabilityModifier?: number): number {
        const durability = (arguments.length === 1)
            ? durabilityModifier
            : this.durabilityModifier
        return this.baseDurability + durability
    }
}
