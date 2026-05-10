export interface UrgentTicket {
  id: string;
  studentName: string;
  severity: number; // 1-10, higher is more urgent
  description: string;
  timestamp: number;
}

export class MaxHeapPriorityQueue {
  private heap: UrgentTicket[] = [];

  enqueue(ticket: UrgentTicket) {
    this.heap.push(ticket);
    this._bubbleUp(this.heap.length - 1);
  }

  dequeue(): UrgentTicket | null {
    if (this.heap.length === 0) return null;
    const top = this.heap[0];
    const bottom = this.heap.pop()!;
    
    if (this.heap.length > 0) {
      this.heap[0] = bottom;
      this._bubbleDown(0);
    }
    return top;
  }

  peek(): UrgentTicket | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  private _bubbleUp(index: number) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index].severity > this.heap[parentIndex].severity) {
        this._swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  private _bubbleDown(index: number) {
    while (true) {
      let largest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (left < this.heap.length && this.heap[left].severity > this.heap[largest].severity) {
        largest = left;
      }
      if (right < this.heap.length && this.heap[right].severity > this.heap[largest].severity) {
        largest = right;
      }

      if (largest !== index) {
        this._swap(index, largest);
        index = largest;
      } else {
        break;
      }
    }
  }

  private _swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  getHeap(): UrgentTicket[] {
    return [...this.heap];
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  size(): number {
    return this.heap.length;
  }
}
