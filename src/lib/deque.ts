export class Deque<T> {
  private items: T[] = [];

  addFront(item: T) {
    this.items.unshift(item);
  }

  addBack(item: T) {
    this.items.push(item);
  }

  removeFront(): T | null {
    return this.items.shift() || null;
  }

  removeBack(): T | null {
    return this.items.pop() || null;
  }

  peekFront(): T | null {
    return this.items[0] || null;
  }

  peekBack(): T | null {
    return this.items[this.items.length - 1] || null;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  getItems(): T[] {
    return [...this.items];
  }
}
