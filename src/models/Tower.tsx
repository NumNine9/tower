import { FIELD_SIZE } from "../utils/constants";
export type TowerType = 'regular' | 'ice' | 'fire';

export class Tower {
    constructor(
        public x: number,
        public y: number,
        public type: TowerType
    ) { }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.type === 'regular' ? 'gray' : this.type === 'ice' ? 'blue' : 'red';
        ctx.fillRect(this.x * FIELD_SIZE, this.y * FIELD_SIZE, FIELD_SIZE, FIELD_SIZE);
    }
}
