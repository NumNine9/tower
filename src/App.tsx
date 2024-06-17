import React, { useState, useEffect, useCallback } from 'react';
import GameInfo from './components/GameInfo';
import TowerSelector from './components/TowerSelector';
import GameCanvas from './components/GameCanvas';
import { Tower, TowerType } from './models/Tower';
import { INITIAL_GOLD, NEXT_WAVE_TIME } from './utils/constants';
import { Monster } from './models/Monster';
import { MonsterPath } from './models/MonsterPath';





const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gold, setGold] = useState(INITIAL_GOLD);
  const [selectedTower, setSelectedTower] = useState<TowerType>('regular');
  const [nextWave, setNextWave] = useState(NEXT_WAVE_TIME);
  const [level, setLevel] = useState(1);
  const [towers, setTowers] = useState<Tower[]>([]);

  const toggleGameStart = () => setGameStarted((prev) => !prev);

  const addTower = (tower: Tower) => {
    setTowers((prevTowers) => [...prevTowers, tower]);
    setGold((prevGold) => prevGold - 20);
  };
  // Initialize path, towers, monsters, etc.
  const monsterPath = new MonsterPath([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 7, y: 0 },
    { x: 8, y: 0 },
    { x: 9, y: 0 },
    { x: 10, y: 0 }
  ]);

  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [lives, setLives] = useState(20);

  useEffect(() => {
    if (gameStarted) {
      const interval = setInterval(() => {
        setNextWave((prev) => prev - 1);
        if (nextWave <= 0) {
          // Logic for starting the next wave
          setMonsters((prevMonsters) => [
            ...prevMonsters,
            new Monster(monsterPath.path[0].x, monsterPath.path[0].y, 3, monsterPath)
          ]);
          setNextWave(NEXT_WAVE_TIME);
          setLevel((prev) => prev + 1);
        }
        setMonsters((prevMonsters) =>
          prevMonsters.map((monster) => {
            monster.update();
            return monster;
          }).filter((monster) => {
            const currentIndex = monster.getPathIndex();
            // console.log('current index:--->', currentIndex)
            const nextPosition = monster.path.getNextPosition(currentIndex);
            if (!nextPosition) {
              setLives((prevLives) => prevLives - 1);
              return false;
            }
            return true;
          })
        );
      }, 1000 / 50);
      return () => clearInterval(interval);
    }
  }, [gameStarted, nextWave, monsters]);

  return (
    <div>
      <h1>Tower Defense Game</h1>
      <GameInfo
        gold={gold}
        lives={lives}
        level={level}
        nextWave={nextWave}
        gameStarted={gameStarted}
        toggleGameStart={() => toggleGameStart()}
      />
      <TowerSelector
        selectedTower={selectedTower}
        onTowerSelect={setSelectedTower}
      />
      <GameCanvas
        towers={towers}
        addTower={addTower}
        gold={gold}
        monsters={monsters}
        selectedTower={selectedTower}
      />
    </div>
  );
};

export default App;
