import React, { useState, useEffect } from 'react'; // Import necessary React hooks
import GameInfo from './components/GameInfo'; // Import the GameInfo component
import TowerSelector from './components/TowerSelector'; // Import the TowerSelector component
import GameCanvas from './components/GameCanvas'; // Import the GameCanvas component
import { Tower, TowerType } from './models/Tower'; // Import the Tower class and TowerType type
import { INITIAL_GOLD, NEXT_WAVE_TIME, FIELD_SIZE } from './utils/constants'; // Import constants
import { Monster } from './models/Monster'; // Import the Monster class
import { MonsterPath } from './models/MonsterPath'; // Import the MonsterPath class
import { Shot } from './models/Shot'; // Import the Shot class
import './App.css'; // Import the CSS file

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false); // State to track if the game has started
  const [gold, setGold] = useState(INITIAL_GOLD); // State to track the player's gold
  const [selectedTower, setSelectedTower] = useState<TowerType>('regular'); // State to track the selected tower type
  const [nextWave, setNextWave] = useState(NEXT_WAVE_TIME); // State to track time until the next wave
  const [level, setLevel] = useState(1); // State to track the current level
  const [towers, setTowers] = useState<Tower[]>([]); // State to track the placed towers
  const toggleGameStart = () => setGameStarted((prev) => !prev); // Function to toggle game start


  const addTower = (tower: Tower) => {
    setTowers((prevTowers) => [...prevTowers, tower]); // Add a new tower to the towers array
    setGold((prevGold) => prevGold - 20); // Deduct gold for placing a tower
  };
  const increseGold = () => {
    setGold((gold) => gold + 5); // Add gold for eliminating a monster
  }
  // Initialize the monster path with a series of coordinates
  const monsterPath = new MonsterPath([
    { x: 0, y: 6 },
    { x: 1, y: 6 },
    { x: 2, y: 6 },
    { x: 3, y: 6 },
    { x: 4, y: 6 },
    { x: 5, y: 6 },
    { x: 6, y: 6 },
    { x: 7, y: 6 },
    { x: 8, y: 6 },
    { x: 9, y: 6 },
    { x: 10, y: 6 },
    { x: 11, y: 6 },
    { x: 12, y: 6 },
    { x: 13, y: 6 },
    { x: 14, y: 6 },
    { x: 15, y: 6 },
    { x: 16, y: 6 },
    { x: 17, y: 6 },
    { x: 18, y: 6 },
    { x: 19, y: 6 },
    { x: 20, y: 6 }
  ]);

  const [monsters, setMonsters] = useState<Monster[]>([]); // State to track the monsters
  const [lives, setLives] = useState(3); // State to track the player's lives
  const [shots, setShots] = useState<Shot[]>([]); // State to track the shots

  useEffect(() => {
    if (gameStarted && (lives > 0)) {
      const interval = setInterval(() => {
        setNextWave((prev) => prev - 1); // Decrement the next wave timer

        if (nextWave <= 0) {
          // If the next wave timer reaches 0, add a new monster
          setMonsters((prevMonsters) => [
            ...prevMonsters,
            new Monster(monsterPath.path[0].x, monsterPath.path[0].y, 3, monsterPath)
          ]);
          setNextWave(NEXT_WAVE_TIME); // Reset the next wave timer
          setLevel((prev) => prev + 1); // Increment the level
        }

        // Update the monsters' positions
        setMonsters((prevMonsters) =>
          prevMonsters.map((monster) => {
            monster.update();
            return monster;
          }).filter((monster) => {
            const currentIndex = monster.getPathIndex();
            const nextPosition = monster.path.getNextPosition(currentIndex);
            if (!nextPosition) {
              setLives(lives - 1); // Deduct a life if a monster reaches the end
              return false; // Remove the monster
            }
            return true; // Keep the monster
          })
        );

        // Update the towers' cooldowns
        towers.forEach((tower) => tower.update());
        const newShots: Shot[] = [];

        // Check if towers can shoot and create new shots
        towers.forEach((tower) => {
          if (tower.canShoot()) {
            monsters.forEach((monster) => {
              const distance = Math.hypot(
                tower.x * FIELD_SIZE - monster.displayX,
                tower.y * FIELD_SIZE - monster.displayY
              );
              if (distance < 100) { // If the monster is within range
                newShots.push(new Shot(tower.x * FIELD_SIZE, tower.y * FIELD_SIZE, tower.type, monster));
                tower.resetCooldown(); // Reset the tower's cooldown
              }
            });
          }
        });

        setShots((prevShots) => [...prevShots, ...newShots]); // Add the new shots

        // Update the shots' positions and check for hits
        setShots((prevShots) =>
          prevShots.map((shot) => {
            shot.update();
            return shot;
          }).filter((shot) => {
            const distance = Math.hypot(
              shot.x - shot.goal.displayX,
              shot.y - shot.goal.displayY
            );
            if (distance < 5) { // If the shot hits the monster
              shot.goal.lives--; // Reduce the monster's lives
              increseGold()
              return false; // Remove the shot
            }
            return true; // Keep the shot
          })
        );
      }, 1000 / 50); // Run the game logic 50 times per second
      return () => clearInterval(interval); // Clear the interval when the component unmounts or game stops
    }
  }, [gameStarted, nextWave, monsters, shots, towers]); // Dependencies for the useEffect
  const resetGame = () => {
    setGameStarted(false);
    setGold(INITIAL_GOLD);
    setSelectedTower('regular');
    setNextWave(NEXT_WAVE_TIME);
    setLevel(1);
    setTowers([]);
    setMonsters([])
    setLives(3)
    setShots([])
  };
  return (
    <div>
      <h1 className='title'>{(gameStarted && (lives < 0)) ? 'Game Over!' : 'Tower Defence'}</h1>
      <div className='main_container'>
        <GameInfo
          gold={gold}
          lives={lives}
          level={level}
          nextWave={nextWave}
          gameStarted={gameStarted}
          resetGame={() => resetGame()}
          toggleGameStart={() => toggleGameStart()}
        />
        <div className='game_container'>
          <div>
            <GameCanvas
              towers={towers}
              addTower={addTower}
              gold={gold}
              monsters={monsters}
              shots={shots}
              selectedTower={selectedTower}
            />
          </div>
          <div>
            <TowerSelector
              selectedTower={selectedTower}
              onTowerSelect={setSelectedTower}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App; // Export the App component
