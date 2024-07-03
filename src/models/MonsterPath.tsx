export class MonsterPath {
    path: { x: number; y: number }[]; // Array of objects representing the path coordinates

    constructor(path: { x: number; y: number }[]) {
        this.path = path; // Initialize the path with the given coordinates
    }

    getNextPosition(index: number) {
        if (index < this.path.length - 1) {
            // If the index is within bounds of the path array
            return this.path[index + 1]; // Return the next position in the path
        }
        return null; // If the index is out of bounds, return null
    }
}
