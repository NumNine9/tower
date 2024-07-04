import React, { useEffect, useState } from 'react';
import wave from '../assets/wave.svg';
import attempts from '../assets/attempts.svg';
import money from '../assets/gold.svg';
import health from '../assets/health.svg';
interface GameInfoProps {
    gold: number;
    level: number;
    nextWave: number;
    gameStarted: boolean;
    lives: number;
    resetGame: () => void;
    notify: () => void;
    toggleGameStart: () => void;
    addGold: () => void;
    addLife: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({ gold, level, nextWave, gameStarted, resetGame, toggleGameStart, lives, notify, addGold, addLife }) => {
    const [isSpecial, setSpecial] = useState<boolean>(false); // State to track if the button should be special

    useEffect(() => {
        if (level % 5 === 0) {
            notify()
            const timer = setTimeout(() => {
                setSpecial(true);
            }, 5000);

            // Cleanup the timer if the component is unmounted
            return () => clearTimeout(timer);
        }
        setSpecial(false)
        // Set a timer to enable the button after 5 seconds

    }, [isSpecial, level]);

    return (
        <div className='info'>
            <button disabled={!isSpecial} className='special_button' onClick={addLife}>
                +1 <img src={health} />
            </button>
            <button disabled={!isSpecial} className='special_button' onClick={addGold}>
                +20 <img src={money} />
            </button>
            <button className='reset_button' onClick={resetGame}>
                Reset
            </button>
            <button className={gameStarted ? 'stop_button' : 'play_button'} onClick={toggleGameStart}>
                {gameStarted ? 'Stop Game' : 'Start Game'}
            </button>
            <div className='game_info'>Gold:<img src={money}></img>       {gold}</div>
            <div className='game_info'>Level:<img src={wave}></img>       {level}</div>
            <div className='game_info'>Lives:<img src={health}></img>     {lives}</div>
            <div className='game_info'>Next Wave:<img src={attempts}></img>      {Math.floor(nextWave / 50)} seconds</div>
        </div>
    );
};

export default GameInfo;
