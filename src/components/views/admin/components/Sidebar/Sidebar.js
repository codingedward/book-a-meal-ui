import React from 'react';
import { NavLink } from 'react-router-dom';
import DefaultSidebar from 'src/components/common/Sidebar';

const Sidebar = () => (
    <DefaultSidebar>
        <NavLink className="btn" to="/meals" activeClassName="active">Manage Meals</NavLink>
        <NavLink className="btn" to="/menus">Set Menu</NavLink>
        <NavLink className="btn" to="/orders">Manage Orders</NavLink>
        <NavLink className="btn" to="/users">Users</NavLink>
        <NavLink className="btn" to="/orders-history">Order History</NavLink>
    </DefaultSidebar>
);

export default Sidebar;
