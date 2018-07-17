import React from 'react';
import axios from 'src/axios';
import Filter from 'src/components/common/Filter';
import Content from 'src/components/common/Content';
import MealMenu from 'src/components/common/Menu';
import OrderModal from './components/Order';

class Menu extends React.Component {

    state = {
        data: {}
    }

    componentWillMount() {
        this.fetchMenus();
    }

    fetchMenus = () => {
        this.props.setLoading(true);
        const _this = this;
        axios.get('/menus?time=all').then(({ data }) => {
            _this.setState({
                ..._this.state,
                data
            });
            _this.props.setLoading(false);
        }).catch(({ response }) =>  {
            _this.props.setLoading(false);
        })
    }

    toggleOrder = () => {
        this.setState({
            ...this.state,
            orderIsOpen: !this.state.orderIsOpen
        });
    }

    onOrder = (item, menu) => {
        this.setState({
            ...this.state,
            toOrder: item,
            orderMenu: menu,
            orderIsOpen: !this.state.orderIsOpen
        });
    }

    render() {
        const contentTop = (
            <div className="col-12 mb-2 pr-0 pr-sm-2">
                <h5 className="d-inline-block">Today's Menu</h5>
            </div>
        );

        const contentFilter = (
            <Filter onFilter={this.onFilter} />
        );

        const { menus = [] } = this.state.data;
        const { toOrder, orderMenu, orderIsOpen } = this.state;
        return (
            <Content 
                {...this.props}
                contentTop={contentTop} 
                contentFilter={contentFilter}>
                {menus.map((menu) => 
                    <MealMenu 
                        menu={menu}
                        key={menu.id} 
                        onOrder={this.onOrder}
                        items={menu.menu_items} 
                    />)
                }
                <OrderModal 
                    {...this.props}
                    size="sm"
                    item={toOrder} 
                    menu={orderMenu}
                    isOpen={orderIsOpen} 
                    toggle={this.toggleOrder}/>

            </Content>
        );
    }
}

export default Menu;
