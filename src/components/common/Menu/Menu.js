import React from 'react';
import MenuItem from './components/MenuItem';
import './styles.css';

const Menu = ({ items, name }) => (
    <div>
        <h5>{name}</h5>
        <div className="row">
            {items.map(item => <MenuItem item={item} key={item.id} />)}
        </div>
    </div>
);

export default Menu;
