import React from 'react';
import axios from 'src/axios';
import { Alert, Button } from 'reactstrap';
import Modal from 'src/components/common/Modal';
import { singleError } from 'src/utils';

class Delete extends React.Component {

    state = {
        menu: {}
    }

    onDelete = () => {
        this.props.setLoading(true);
        const _this = this;
        axios.delete(`/menus/${this.props.menu.id}`).then(() => {
            _this.setState({
                ..._this.state,
                toDelete: null,
                deleteIsOpen: false,
            });
            _this.props.setLoading(false);
            _this.props.toggle();
            _this.props.onChange();
        }).catch(({ response }) => {
            _this.setState({
                ..._this.state,
                error: response,
            });
            _this.props.setLoading(false);
        });
    }

    render() {
        const { menu = {} } = this.props;
        const { error } = this.state;
        const body = (
            <div>
                {error &&
                    <Alert className="text-center text-small" color="danger">
                        { singleError(error) }
                    </Alert>
                }
                <p className="text-center">
                    Delete this menu (<b>{menu.name}</b>)?
                </p>
            </div>
        );

        const footer = (
            <Button color="danger" className="m-auto"onClick={this.onDelete}>Delete</Button>
        );

        return (
            <Modal
                {...this.props}
                title="Delete Menu"
                body={body}
                footer={footer}
                toggle={this.props.toggle}
            />
        );
    }
}

export default Delete;

