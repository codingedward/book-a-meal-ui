import React from 'react';
import MenuItem from './components/MenuItem';
import './styles.css';

const Menu = ({ items, menu = {}, onOrder }) => (
    <div>
        <h5 className="text-center mt-2">{menu.name}</h5>
        <div className="row">
            {items.map(item => <MenuItem menu={menu} item={item} key={item.id} onOrder={onOrder} />)}
        </div>
    </div>
);

export default Menu;
