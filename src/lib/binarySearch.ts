export interface Searchable {
  id: string | number;
}

/**
 * Binary search for an item by ID in a sorted array.
 * @param array Sorted array of items
 * @param targetId ID to find
 * @returns The item or null if not found
 */
export function binarySearch<T extends Searchable>(array: T[], targetId: string | number): T | null {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midId = array[mid].id;

    if (midId === targetId) {
      return array[mid];
    }

    if (midId < targetId) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return null;
}

/**
 * Helper to sort items before binary search
 */
export function sortById<T extends Searchable>(array: T[]): T[] {
  return [...array].sort((a, b) => {
    if (typeof a.id === 'number' && typeof b.id === 'number') return a.id - b.id;
    return String(a.id).localeCompare(String(b.id));
  });
}
