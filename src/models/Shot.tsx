import { Monster } from './Monster';
import { FIELD_SIZE } from '../utils/constants';

export class Shot {
    constructor(
        public x: number,
        public y: number,
        public type: string,
        public goal: Monster
    ) { }

    update() {
        this.x += (this.goal.displayX - this.x) * 0.1;
        this.y += (this.goal.displayY - this.y) * 0.1;
    }

    display(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.type === 'regular' ? 'black' : this.type === 'ice' ? 'blue' : 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}
