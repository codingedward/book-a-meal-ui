import React from 'react';
import MenuItem from '../MenuItem';
import './styles.css';

class Menu extends React.Component {

    render() {
        const menuItems = this.props.items.map((item) => 
            <MenuItem item={item} key={item.id} />
        );
        return (
            <div>
                <h5>{this.props.name}</h5>
                <div className="row">
                    {menuItems}
                </div>
            </div>
        );
    }
}

export default Menu;
