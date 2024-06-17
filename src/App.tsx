import React, { useState, useEffect, useCallback } from 'react';
import GameInfo from './components/GameInfo';
import TowerSelector from './components/TowerSelector';
import GameCanvas from './components/GameCanvas';
import { Tower, TowerType } from './models/Tower';
import { INITIAL_GOLD, NEXT_WAVE_TIME } from './utils/constants';

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

  useEffect(() => {
    if (gameStarted) {
      const interval = setInterval(() => {
        setNextWave((prev) => prev - 1);
        if (nextWave <= 0) {
          // Logic for starting the next wave
          setNextWave(NEXT_WAVE_TIME);
          setLevel((prev) => prev + 1);
        }
      }, 1000 / 50);
      return () => clearInterval(interval);
    }
  }, [gameStarted, nextWave]);

  return (
    <div>
      <h1>Tower Defense Game</h1>
      <GameInfo
        gold={gold}
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
        selectedTower={selectedTower}
      />
    </div>
  );
};

export default App;
