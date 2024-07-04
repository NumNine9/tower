import React, { useEffect, useRef, useCallback } from 'react';
import { FIELD_SIZE } from '../utils/constants';
import { Tower, TowerType } from '../models/Tower';
import { Monster } from '../models/Monster';
import { Shot } from '../models/Shot';

interface GameCanvasProps {
    towers: Tower[];
    addTower: (tower: Tower) => void;
    gold: number;
    selectedTower: TowerType;
    monsters: Monster[];
    shots: Shot[];
}

const GameCanvas: React.FC<GameCanvasProps> = ({ towers, addTower, gold, selectedTower, monsters, shots }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleCanvasClick = useCallback(
        (event: React.MouseEvent<HTMLCanvasElement>) => {
            if (!canvasRef.current || gold < 20) return;

            const rect = canvasRef.current.getBoundingClientRect();
            const x = Math.floor((event.clientX - rect.left) / FIELD_SIZE);
            const y = Math.floor((event.clientY - rect.top) / FIELD_SIZE);

            const newTower = new Tower(x, y, selectedTower);
            addTower(newTower);
        },
        [gold, selectedTower, addTower]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = 'lightgreen';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                towers.forEach((tower) => tower.draw(ctx));
                monsters.forEach((monster) => {
                    if (monster.lives > 0) {
                        monster.display(ctx)
                    } else {
                        monster.setPathIndex()
                    }
                });
                shots.forEach((shot) => shot.display(ctx));
            }
        }
    }, [towers, monsters]);

    return (
        <canvas
            ref={canvasRef}
            width="600"
            height="400"
            onClick={handleCanvasClick}
        ></canvas>
    );
};

export default GameCanvas;
