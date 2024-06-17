import { FIELD_SIZE } from "../utils/constants";
export type TowerType = 'regular' | 'ice' | 'fire';

export class Tower {
    private cooldown: number = 0;

    constructor(
        public x: number,
        public y: number,
        public type: TowerType
    ) { }
    update() {
        if (this.cooldown > 0) {
            this.cooldown--;
        }
    }

    canShoot() {
        return this.cooldown === 0;
    }

    resetCooldown() {
        this.cooldown = 50; // example cooldown value
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.type === 'regular' ? 'gray' : this.type === 'ice' ? 'blue' : 'red';
        ctx.fillRect(this.x * FIELD_SIZE, this.y * FIELD_SIZE, FIELD_SIZE, FIELD_SIZE);
    }
}
