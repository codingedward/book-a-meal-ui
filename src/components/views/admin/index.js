import React from 'react';
import Loading from 'react-loading-bar';
import { NavLink } from 'react-router-dom';
import Sidebar from 'src/components/common/Sidebar';
import Meals from 'src/components/views/admin/Meals';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

class Admin extends React.Component {

    state = {
        loading: false
    }

    setLoading = (loading) => {
        this.setState({
            ...this.state,
            loading,
        });
    }

    render() {
        const { loading } = this.state;
        return (
            <main className="container-fluid">
                <Loading show={loading} color="orange"/>
                 <section className="row">
                    <Sidebar {...this.props}>
                        <NavLink className="btn" to="/admin/meals" activeClassName="active">Manage Meals</NavLink>
                        <NavLink className="btn" to="/admin/menus">Set Menu</NavLink>
                        <NavLink className="btn" to="/admin/orders">Manage Orders</NavLink>
                        <NavLink className="btn" to="/admin/users">Users</NavLink>
                        <NavLink className="btn" to="/admin/orders-history">Order History</NavLink>
                    </Sidebar>
                    <Router>
                        <Switch>
                            <Route exact path="/admin/meals" render={() => <Meals setLoading={this.setLoading} /> } />
                        </Switch>
                    </Router>
                 </section>
             </main>
        );
    }
}

export default Admin;
