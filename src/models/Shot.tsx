import { Monster } from './Monster'; // Import the Monster class from the specified file
// import { FIELD_SIZE } from '../utils/constants'; // Import the FIELD_SIZE constant from the specified file

export class Shot {
    constructor(
        public x: number, // Initial x-coordinate of the shot
        public y: number, // Initial y-coordinate of the shot
        public type: string, // Type of the shot (e.g., 'regular', 'ice', etc.)
        public goal: Monster // The target monster that the shot is aiming at
    ) { }

    update() {
        // Move the shot towards the goal with a small step
        this.x += (this.goal.displayX - this.x) * 0.1;
        this.y += (this.goal.displayY - this.y) * 0.1;
    }

    display(ctx: CanvasRenderingContext2D) {
        // Set the fill color based on the type of the shot
        ctx.fillStyle = this.type === 'regular' ? 'black' : this.type === 'ice' ? 'blue' : 'red';
        ctx.beginPath(); // Begin a new path for drawing the shot
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2); // Draw a circle representing the shot
        ctx.fill(); // Fill the shot with the specified color
    }
}
