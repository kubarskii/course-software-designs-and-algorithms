type KeyValue = number;
type PriorityQueueItem<T> = { value: T; key: KeyValue };

class Heap<T> extends Array<PriorityQueueItem<T>> {
  constructor() {
    super();
  }

  size() {
    return this.length - 1;
  }

  parentIndex(index: number): number {
    if (index === 0) return -1;
    return Math.floor((index - 1) / 2);
  }

  left(index: number){
    return 2 * index + 1
  }

  right(index: number){
    return 2 * index + 2
  }

  hasLeft(index: number) {
    return this.left(index) < this.length;
  }

  hasRight(index: number): boolean {
    return this.right(index) < this.length;
  }

  push(...items: PriorityQueueItem<T>[]): number {
    if (items.length === 1 && this.length === 0) {
      super.push(...items)
      return this.length
    }
    for(let item of items) {
      super.push(item);
      let i = this.length - 1;
      let parentIndex = this.parentIndex(i)
      while (parentIndex >= 0 && this[parentIndex].key < this[i].key) {
        this.swap(parentIndex, i)
        i = parentIndex
        parentIndex = this.parentIndex(i)
      }
    }
    return this.length
  }

  private swap(a: number, b: number) {
    [this[a], this[b]] = [this[b], this[a]]
  }

  extractMax(): PriorityQueueItem<T> | null{
    if (!this.length) return null

    let max = this[0]
    let end = this.pop()
    if (this.length > 0) {
      this[0] = end as any
      this.balance()
    }
    return max
  }

  /**
   * Just a hack
   * can be decreased from O(n log n) -> O(log n)
   * */
  balance(): void {
    const value = this.slice()
    this.length = 0
    this.push(...value)
  }

}

interface IPriorityQueue<T, K = PriorityQueueItem<T>> {
  insert(x: any, priority: number): void;

  maximum(): K | null;

  extractMax(): K | null;

  increaseKey(x: T, k: KeyValue): void;
}

class PriorityQueue<T> implements IPriorityQueue<T> {
  private data: Heap<T> = new Heap<T>();

  extractMax(): PriorityQueueItem<T> | null {
    if (this.data.length === 0) return null;
    return this.data.extractMax()
  }

  increaseKey(x: T, newKey: KeyValue): void {
    const index = this.data.findIndex((el) => el.value === x)
    this.data[index].key = newKey
    this.data.balance()
  }

  insert(x: T, priority: number): void {
    const item: PriorityQueueItem<T> = {
      value: x,
      key: priority,
    };
    const heap = this.data;
    heap.push(item);
  }

  maximum(): PriorityQueueItem<T> | null {
    return this.data[0];
  }
}
