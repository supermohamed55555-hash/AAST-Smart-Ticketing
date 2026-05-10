export class BSTNode<T> {
  value: T;
  id: number | string;
  left: BSTNode<T> | null = null;
  right: BSTNode<T> | null = null;

  constructor(id: number | string, value: T) {
    this.id = id;
    this.value = value;
  }
}

export class BinarySearchTree<T> {
  root: BSTNode<T> | null = null;

  insert(id: number | string, value: T) {
    const newNode = new BSTNode(id, value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    this._insertNode(this.root, newNode);
  }

  private _insertNode(node: BSTNode<T>, newNode: BSTNode<T>) {
    if (newNode.id < node.id) {
      if (!node.left) node.left = newNode;
      else this._insertNode(node.left, newNode);
    } else {
      if (!node.right) node.right = newNode;
      else this._insertNode(node.right, newNode);
    }
  }

  search(id: number | string): T | null {
    return this._searchNode(this.root, id);
  }

  private _searchNode(node: BSTNode<T> | null, id: number | string): T | null {
    if (!node) return null;
    if (id === node.id) return node.value;
    if (id < node.id) return this._searchNode(node.left, id);
    return this._searchNode(node.right, id);
  }

  inorderTraversal(): T[] {
    const result: T[] = [];
    this._inorder(this.root, result);
    return result;
  }

  private _inorder(node: BSTNode<T> | null, result: T[]) {
    if (node) {
      this._inorder(node.left, result);
      result.push(node.value);
      this._inorder(node.right, result);
    }
  }

  // Visualization helper: returns the tree structure for rendering
  getTreeStructure() {
    return this.root;
  }
}
