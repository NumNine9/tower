import { FIELD_SIZE } from "../utils/constants"; // Import the FIELD_SIZE constant from the specified file
export type TowerType = 'regular' | 'ice' | 'fire'; // Define a type for the different tower types

export class Tower {
    private cooldown: number = 0; // Private property to keep track of the cooldown time

    constructor(
        public x: number, // Initial x-coordinate of the tower
        public y: number, // Initial y-coordinate of the tower
        public type: TowerType // Type of the tower (e.g., 'regular', 'ice', 'fire')
    ) { }

    update() {
        if (this.cooldown > 0) {
            this.cooldown--; // Decrement the cooldown if it is greater than 0
        }
    }

    canShoot() {
        return this.cooldown === 0; // Return true if the cooldown is 0, meaning the tower can shoot
    }

    resetCooldown() {
        this.cooldown = 50; // Reset the cooldown to 50 (example value) when the tower shoots
    }

    draw(ctx: CanvasRenderingContext2D) {
        // Set the fill color based on the type of the tower
        ctx.fillStyle = this.type === 'regular' ? 'gray' : this.type === 'ice' ? 'blue' : 'red';
        // Draw a rectangle representing the tower at the specified coordinates
        ctx.fillRect(this.x * FIELD_SIZE, this.y * FIELD_SIZE, FIELD_SIZE, FIELD_SIZE);
    }
}
