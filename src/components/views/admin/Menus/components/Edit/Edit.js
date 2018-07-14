import React from 'react';
import axios from 'src/axios';
import Modal from 'src/components/common/Modal';
import { Alert, Button, Input } from 'reactstrap';
import { singleError } from 'src/utils';
import { Async } from 'react-select';
import _ from 'lodash';

import 'react-select/dist/react-select.css';
import './styles.css';

class EditModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
        };
    }

    reset = () => {
        setTimeout(() => {
            this.setState({
                ...this.state,
                success: false,
                error: null
            });
        }, 2000);
    }

    onOpened = () => {
        this.setState({
            ...this.state,
            error: null,
            success: false,
            menus: [],
            meals: [],
        });

        if (this.props) {
            const { menuItem = {} } = this.props;
            let defaultValues = {
                meal: null,
                menu: null,
            }
            if (menuItem['meal.id']) {
                defaultValues.meal = {
                    value: menuItem['meal.id'], 
                    label: menuItem['meal.name']
                }
            }

            if (menuItem['menu.id']) {
                defaultValues.menu = {
                    value: menuItem['menu.id'], 
                    label: menuItem['menu.name']
                }
            }

            this.setState({
                ...this.state,
                ...defaultValues,
                quantity: menuItem.quantity,
            });
        }
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    fetchMenus = (input, callback) => {
        const _this = this;
        axios.get(`/menus?search=${input}&per_page=5`).then(({ data }) => {
            const menus = data.menus.map((menu) => {
                return { value: menu.id, label: menu.name }
            });
            callback(null, { options: menus });
        }).catch(({ response }) => {
            _this.setState({
                ..._this.state,
                error: response
            });
            callback(response, null);
        });
    }

    fetchMeals = (input, callback) => {
        const _this = this;
        axios.get(`/meals?search=name:${input}&per_page=5`).then(({ data }) => {
            const meals = data.meals.map((meal) => {
                return { value: meal.id, label: meal.name }
            });
            callback(null, { options: meals });
        }).catch(({ response }) => {
            _this.setState({
                ..._this.state,
                error: response
            });
            callback(response, null);
        });
    }

    setSelectedMenu = (menu) => {
        this.setState({
            ...this.state,
            menu
        });
    }

    setSelectedMeal = (meal) => {
        this.setState({
            ...this.state,
            meal
        })
    }

    onEdit = () => {
        this.props.setLoading(true);
        const { meal = {}, menu = {} } = this.state;
        const menuItem = {
            meal_id: meal.value ? meal.value : '',
            menu_id: menu.value ? menu.value : '',
            quantity: this.state.quantity,
        };

        const _this = this;
        axios.put(`/menu-items/${this.props.menuItem.id}`, menuItem).then(({ data }) => {
            _this.props.onChange();
            _this.setState({
                ..._this.state,
                success: true,
                error: null,
            });
            _this.reset();
            _this.props.setLoading(false);
            setTimeout(_this.props.toggle, 1000);
        }).catch(({ response }) => {
            _this.setState({
                ..._this.state,
                error: response,
                success: false,
            });
            _this.reset();
            _this.props.setLoading(false);
        });
    }

    render() {
        const { isOpen, toggle } = this.props;
        const { error, success, meal, menu } = this.state;
        const body = (
            <div>
                {success &&
                    <Alert className="text-center text-small" color="success">
                        Successfully updated.
                    </Alert>
                }
                {error &&
                    <Alert className="text-center text-small" color="danger">
                        { singleError(error) }
                    </Alert>
                }
                <div className="pl-4 pr-4">
                    <label> Meal Name </label>
                    <Async 
                        name="meal"
                        value={meal}
                        onChange={this.setSelectedMeal}
                        loadOptions={_.throttle(this.fetchMeals, 500)}
                        fitlerOptions={(options) => { return options; }}
                    />
                    <label className="mt-3"> Select Menu </label>
                    <Async 
                        name="menu"
                        value={menu}
                        onChange={this.setSelectedMenu}
                        loadOptions={_.throttle(this.fetchMenus, 500)}
                        fitlerOptions={(options) => { return options; }}
                    />
                    <label className="mt-3">Quantity</label>
                    <Input name="quantity" value={this.state.quantity} onChange={this.onChange} type="text" />
                </div>
            </div>
        );

        const footer = (
            <Button color="primary" className="m-auto"onClick={this.onEdit}>Update Item</Button>
        );
        return (
            <Modal 
                title="Edit Menu Item" 
                body={body} 
                footer={footer} 
                isOpen={isOpen}
                toggle={toggle}
                onOpened={this.onOpened}
            />
        );
    }
}

export default EditModal;