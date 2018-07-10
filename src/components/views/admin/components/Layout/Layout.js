import React from 'react';
import { NavLink } from 'react-router-dom';
import Loading from 'react-loading-bar';
import Sidebar from 'src/components/common/Sidebar';
import Content from 'src/components/common/Content';

const Layout = (props) => (
    <main className="container-fluid">
        <Loading show={props.loading} color="orange"/>
         <section className="row">
            <Sidebar {...props}>
                <NavLink className="btn" to="/meals" activeClassName="active">Manage Meals</NavLink>
                <NavLink className="btn" to="/menus">Set Menu</NavLink>
                <NavLink className="btn" to="/orders">Manage Orders</NavLink>
                <NavLink className="btn" to="/users">Users</NavLink>
                <NavLink className="btn" to="/orders-history">Order History</NavLink>
            </Sidebar>
            <Content {...props} />
         </section>
     </main>
);

export default Layout;
