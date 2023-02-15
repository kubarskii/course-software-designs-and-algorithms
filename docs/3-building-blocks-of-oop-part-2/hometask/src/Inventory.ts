import {ItemComparator} from "./ItemComparator";
import {Item} from "./Item";

/**
 * Depends on ItemComparator
 * @see {ItemComparator}
 * */
export class Inventory {

    private items: Item[] = []

    constructor() {    }


    addItem(item: Item): void {
        this.items.push(item)
    }

    sort(): void;
    sort(comparator?: ItemComparator): void {
        if (comparator) {
            this.items.sort(comparator.compare)
            return
        }
        this.items
            .sort((first, second) => first.compareTo(second))
    }

    toString(): string {
        return this.items.map(item => item.toString()).join(', ')
    }


}
