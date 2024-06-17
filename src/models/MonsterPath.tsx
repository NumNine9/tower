export class MonsterPath {
    path: { x: number; y: number }[];

    constructor(path: { x: number; y: number }[]) {
        this.path = path;
    }

    getNextPosition(index: number) {
        if (index < this.path.length - 1) {
            return this.path[index + 1];
        }
        return null;
    }
}
