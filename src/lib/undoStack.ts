رexport interface Action<T = unknown> {
  type: string;
  payload: T;
  undo: () => Promise<void> | void;
}

export class UndoStack {
  private stack: Action<unknown>[] = [];
  private maxSize: number;

  constructor(maxSize = 20) {
    this.maxSize = maxSize;
  }

  push(action: Action) {
    this.stack.push(action);
    if (this.stack.length > this.maxSize) {
      this.stack.shift(); // Remove oldest
    }
  }

  async undo(): Promise<Action | null> {
    const action = this.stack.pop();
    if (action) {
      await action.undo();
      return action;
    }
    return null;
  }

  clear() {
    this.stack = [];
  }

  get canUndo(): boolean {
    return this.stack.length > 0;
  }
}

// Global instance for the session (or can be used per-component)
export const globalUndoStack = new UndoStack();
