import React from 'react';
import axios from 'src/axios';
import Modal from 'src/components/common/Modal';
import { Alert, Button, Input } from 'reactstrap';
import { authenticated, singleError } from 'src/utils';


class OrderModal extends React.Component {

    state = {
        quantity: 1
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
        });
    }

    onOrder = () => {
        const user = authenticated();
        const { item } = this.props;
        const order = {
            user_id: user.id,
            menu_item_id: item.id,
            quantity: Number(this.state.quantity)
        }
        this.props.setLoading(true);

        const _this = this;
        axios.post('orders', order).then(({ data }) => {
            _this.props.setLoading(false);
            _this.setState({
                ..._this.state,
                success: true,
            });
            setTimeout(_this.props.toggle, 1000);
        }).catch(({ response }) => {
            _this.setState({
                ..._this.state,
                error: response
            });
            _this.props.setLoading(false);
        });
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { error, success } = this.state;
        const { item = {}, menu = {} } = this.props;
        const { meal = {} } = item;
        const body = (
            <div>
                {error &&
                    <Alert className="text-center text-small" color="danger">
                        { singleError(error) }
                    </Alert>
                }
                {success &&
                    <Alert className="text-center text-small" color="success">
                        Successfully made order.
                    </Alert>
                }
                <p className="text-center">Order for {meal.name} on {menu.name}?</p>
                <label>Quantity</label>
                <Input type="number" 
                    name="quantity"
                    value={this.state.quantity} 
                    onChange={this.onChange} />
            </div>
        );

        const footer = (
            <Button color="primary" className="m-auto" onClick={this.onOrder}>Make Order</Button>
        );

        const { isOpen, toggle } = this.props;
        return (
            <Modal 
                {...this.props}
                title="Make An Order" 
                body={body} 
                footer={footer} 
                isOpen={isOpen}
                toggle={toggle}
                onOpened={this.onOpened}
            />
        );
    }
}

export default OrderModal;
