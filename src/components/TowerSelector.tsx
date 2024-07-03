import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { TowerType } from '../models/Tower';

interface TowerSelectorProps {
    selectedTower: TowerType;
    onTowerSelect: (newTower: TowerType) => void;
}

const TowerSelector: React.FC<TowerSelectorProps> = ({ selectedTower, onTowerSelect }) => {
    return (
        <ToggleButtonGroup
            color='standard'
            className='toggle_group'
            value={selectedTower}
            exclusive
            onChange={(event, newTower) => onTowerSelect(newTower)}
        >
            <ToggleButton value="regular">Regular Tower</ToggleButton>
            <ToggleButton value="ice">Ice Tower</ToggleButton>
            <ToggleButton value="fire">Fire Tower</ToggleButton>
        </ToggleButtonGroup>
    );
};

export default TowerSelector;
