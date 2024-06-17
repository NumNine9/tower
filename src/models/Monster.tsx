import { MonsterPath } from './MonsterPath';
import { FIELD_SIZE } from '../utils/constants';

export class Monster {
    private pathIndex: number = 0;

    constructor(
        public x: number,
        public y: number,
        public lives: number,
        public path: MonsterPath
    ) {
        this.displayX = x * FIELD_SIZE;
        this.displayY = y * FIELD_SIZE;
    }

    public displayX: number;
    public displayY: number;

    // Getter for the private pathIndex property
    getPathIndex(): number {
        return this.pathIndex;
    }

    update() {
        const nextPosition = this.path.getNextPosition(this.pathIndex);
        if (nextPosition) {
            this.displayX += (nextPosition.x * FIELD_SIZE - this.displayX) * 0.1;
            this.displayY += (nextPosition.y * FIELD_SIZE - this.displayY) * 0.1;

            if (
                Math.abs(this.displayX - nextPosition.x * FIELD_SIZE) < 1 &&
                Math.abs(this.displayY - nextPosition.y * FIELD_SIZE) < 1
            ) {
                this.x = nextPosition.x;
                this.y = nextPosition.y;
                this.pathIndex++;
            }
        }
    }

    display(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.displayX, this.displayY, FIELD_SIZE, FIELD_SIZE);
    }
}
