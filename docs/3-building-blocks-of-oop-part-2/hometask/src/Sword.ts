import {Weapon} from "./Weapon";

export class Sword extends Weapon {
    constructor(
        baseDamage: number,
        baseDurability: number,
        value: number,
        weight: number
    ) {
        super('sword', baseDamage, baseDurability, value, weight);
    }

    polish(): void {
        const maxDamageModifier = this.baseDamage * 0.25
        if (this.damageModifier + Weapon.MODIFIER_CHANGE_RATE <= maxDamageModifier) {
            this.damageModifier += Weapon.MODIFIER_CHANGE_RATE
        }
    }
}
