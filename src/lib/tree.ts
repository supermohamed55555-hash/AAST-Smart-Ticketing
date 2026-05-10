export class TreeNode<T> {
  value: T;
  children: TreeNode<T>[] = [];

  constructor(value: T) {
    this.value = value;
  }

  addChild(value: T): TreeNode<T> {
    const newNode = new TreeNode(value);
    this.children.push(newNode);
    return newNode;
  }

  // Breadth-First Search (BFS)
  bfs(targetValue: T): { node: TreeNode<T> | null; path: T[] } {
    const queue: TreeNode<T>[] = [this];
    const path: T[] = [];

    while (queue.length > 0) {
      const current = queue.shift()!;
      path.push(current.value);

      if (current.value === targetValue) {
        return { node: current, path };
      }

      queue.push(...current.children);
    }

    return { node: null, path };
  }

  // Depth-First Search (DFS)
  dfs(targetValue: T): { node: TreeNode<T> | null; path: T[] } {
    const path: T[] = [];
    const node = this._dfsRecursive(this, targetValue, path);
    return { node, path };
  }

  private _dfsRecursive(node: TreeNode<T>, targetValue: T, path: T[]): TreeNode<T> | null {
    path.push(node.value);

    if (node.value === targetValue) {
      return node;
    }

    for (const child of node.children) {
      const result = this._dfsRecursive(child, targetValue, path);
      if (result) return result;
    }

    return null;
  }

  // Visualization helper: Get the whole tree as a serializable object
  getTreeData(): any {
    return {
      name: this.value,
      children: this.children.map(child => child.getTreeData())
    };
  }
}

// Initializing the University Tree
export const universityRoot = new TreeNode("AAST University");

const studentAffairs = universityRoot.addChild("Student Affairs");
studentAffairs.addChild("ID Card");
studentAffairs.addChild("Complaints");

const itDept = universityRoot.addChild("IT Department");
itDept.addChild("WiFi Support");
itDept.addChild("System Issues");

const finance = universityRoot.addChild("Finance");
finance.addChild("Tuition Fees");
finance.addChild("Refunds");

const library = universityRoot.addChild("Library");
library.addChild("Book Loan");
library.addChild("Study Room");
library.addChild("Research Assist");
