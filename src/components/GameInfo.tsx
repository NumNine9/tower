import React from 'react';
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
    toggleGameStart: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({ gold, level, nextWave, gameStarted, toggleGameStart, lives }) => {
    return (
        <div className='info'>
            <button className={gameStarted ? 'stop_button' : 'play_button'} onClick={toggleGameStart}>
                {gameStarted ? 'Stop Game' : 'Start Game'}
            </button>
            {/* <img src={health}></img> */}
            <div className='game_info'>Gold:<img src={money}></img>       {gold}</div>
            <div className='game_info'>Level:<img src={wave}></img>       {level}</div>
            <div className='game_info'>Lives:<img src={health}></img>     {lives}</div>
            <div className='game_info'>Next Wave:<img src={attempts}></img>      {Math.floor(nextWave / 50)} seconds</div>
        </div>
    );
};

export default GameInfo;
