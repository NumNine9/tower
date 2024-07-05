# Tower Defense Game

## Overview
This project is a Tower Defense game implemented in TypeScript using React. The objective of the game is to prevent monsters from reaching the end of the path by strategically placing towers that attack the monsters.

## Features
- **Multiple Tower Types**: Choose from regular, ice, and fire towers, each with unique abilities.
- **Game States**: Tracks game progression, including levels, gold, lives, and waves.
- **Monster Path and Behavior**: Monsters follow a defined path and have distinct behaviors.
- **Towers and Shots**: Towers have cooldowns and shoot at monsters within range.
- **Visual Effects**: Different visual representations for towers and monsters.
- **Additional Features**: Upgrade towers, increase player lives, and more.

## Installation
1. **Clone the repository**:
   ```sh
   git clone https://github.com/NumNine9/tower.git
   cd tower
   ´´´
2. **Install dependencies**:
   ```sh
   npm install
3. **Run the development server**:
   ```sh
   npm run dev
   
## Game Mechanics

### States
- **Game Started**: Tracks whether the game has started.
- **Gold**: The amount of gold the player has.
- **Selected Tower**: The type of tower currently selected by the player.
- **Next Wave**: Time until the next wave of monsters.
- **Level**: The current level of the game.
- **Towers**: Array of placed towers.
- **Monsters**: Array of monsters in the game.
- **Lives**: The number of lives the player has.
- **Shots**: Array of shots fired by towers.

### Tower Types
- **Regular Tower**: Basic tower with standard attack.
- **Ice Tower**: Slows down monsters.
- **Fire Tower**: Deals continuous damage to monsters.

### Monster Behavior
- **Path**: Predefined path that monsters follow.
- **Lives**: Each monster has a certain number of lives.
- **Update Function**: Updates the monster's position along the path.
- **Display Method**: Visual representation of the monster.

### Shots
- **Position**: The position of the shot.
- **Type**: The type of shot, corresponding to the tower.
- **Goal**: The monster the shot is aimed at.
- **Update Function**: Moves the shot towards the goal.
- **Collision Detection**: Checks if the shot hits the monster.

## How to Play
1. **Start the Game**: Click the start button to begin the game.
2. **Select a Tower**: Use the tower selector to choose a tower type.
3. **Place Towers**: Click on the canvas to place towers. Ensure you have enough gold.
4. **Defend Against Waves**: Towers will automatically shoot at monsters within range. Manage your gold and strategically place towers to defend against waves of monsters.

   
