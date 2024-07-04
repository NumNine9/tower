import { MonsterPath } from './MonsterPath'; // Import the MonsterPath class from the specified file
import { FIELD_SIZE } from '../utils/constants'; // Import the FIELD_SIZE constant from the specified file

export class Monster {
    private pathIndex: number = 0; // Private property to keep track of the current index in the path

    constructor(
        public x: number, // Initial x-coordinate of the monster
        public y: number, // Initial y-coordinate of the monster
        public lives: number, // Number of lives the monster has
        public path: MonsterPath // Path object that the monster will follow
    ) {
        // Calculate display coordinates based on field size
        this.displayX = x * FIELD_SIZE;
        this.displayY = y * FIELD_SIZE;
    }

    public displayX: number; // Public property to track the monster's display x-coordinate
    public displayY: number; // Public property to track the monster's display y-coordinate

    // Getter for the private pathIndex property
    getPathIndex(): number {
        return this.pathIndex;
    }
    setPathIndex(): number {
        this.pathIndex = 0;
        return this.pathIndex
    }

    update() {
        const nextPosition = this.path.getNextPosition(this.pathIndex); // Get the next position from the path
        if (nextPosition) {
            // Move the display coordinates towards the next position with a small step
            this.displayX += (nextPosition.x * FIELD_SIZE - this.displayX) * 0.1;
            this.displayY += (nextPosition.y * FIELD_SIZE - this.displayY) * 0.1;

            // Check if the monster is close enough to the next position
            if (
                Math.abs(this.displayX - nextPosition.x * FIELD_SIZE) < 1 &&
                Math.abs(this.displayY - nextPosition.y * FIELD_SIZE) < 1
            ) {
                // Update the monster's actual coordinates
                this.x = nextPosition.x;
                this.y = nextPosition.y;
                this.pathIndex++; // Move to the next index in the path
            }
        }
    }

    display(ctx: CanvasRenderingContext2D) {

        ctx.fillStyle = 'black'; // Set the fill color to black
        ctx.fillRect(this.displayX, this.displayY, FIELD_SIZE, FIELD_SIZE); // Draw the monster as a black rectangle
    }
}
