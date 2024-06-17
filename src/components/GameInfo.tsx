import React from 'react';

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
        <div>
            <button onClick={toggleGameStart}>
                {gameStarted ? 'Stop Game' : 'Start Game'}
            </button>
            <div>Gold: {gold}</div>
            <div>Level: {level}</div>
            <div>Lives: {lives}</div>
            <div>Next Wave: {Math.floor(nextWave / 50)} seconds</div>
        </div>
    );
};

export default GameInfo;
