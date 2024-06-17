import React, { useEffect, useRef, useCallback } from 'react';
import { FIELD_SIZE } from '../utils/constants';
import { Tower, TowerType } from '../models/Tower';

interface GameCanvasProps {
    towers: Tower[];
    addTower: (tower: Tower) => void;
    gold: number;
    selectedTower: TowerType;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ towers, addTower, gold, selectedTower }) => {
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
            }
        }
    }, [towers]);

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
