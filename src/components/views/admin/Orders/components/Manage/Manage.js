import React from 'react';
import axios from 'src/axios';
import Modal from 'src/components/common/Modal';
import { Alert, Button } from 'reactstrap';
import { ToggleState } from 'src/constants';
import { singleError } from 'src/utils';
import './styles.css';


class DeleteModal extends React.Component {

    state = {}

    onOpened = () => {
        this.setState({
            ...this.state,
            error: null,
        });
    }

    onSetToggleState = (status) => {
        let { order } = this.props;
        console.log(order);
        let newOrder = {
            user_id: order.user_id,
            menu_item_id: order.menu_item_id,
            status,
        }
        this.props.setLoading(true);
        axios.put(`/orders/${order.id}`, newOrder).then(() => {
            this.props.onChange();
            this.props.toggle();
            this.props.setLoading(false);
        }).catch(({ response }) => {
            this.setState({
                ...this.state,
                error: response,
            });
            this.props.setLoading(false);
        });
    }

    render() {
        const { error } = this.state;
        const { order = {} } = this.props;
        const body = (
            <div>
                {error &&
                    <Alert className="text-center text-small" color="danger">
                        { singleError(error) }
                    </Alert>
                }
                <p className="text-center">
                    Accept or reject this order(ID: <b>{order.id}</b>)
                </p>
            </div>
        );

        const footer = (
            <div className="m-auto">
                <Button 
                    onClick={() => this.onSetToggleState(ToggleState.REJECTED)} 
                    className="mr-2" 
                    color="danger">
                    Reject
                </Button>
                <Button 
                    onClick={() => this.onSetToggleState(ToggleState.ACCEPTED)}  
                    color="primary">
                    Accept
                </Button>
            </div>
        );

        const { isOpen, toggle } = this.props;
        return (
            <Modal 
                title="Manage Order Status" 
                body={body} 
                footer={footer} 
                isOpen={isOpen}
                toggle={toggle}
                onOpened={this.onOpened}
            />
        );
    }
}

export default DeleteModal;
