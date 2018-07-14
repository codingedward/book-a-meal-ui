import React from 'react';
import axios from 'src/axios';
import { Alert, Button, Input } from 'reactstrap';
import Modal from 'src/components/common/Modal';
import { singleError } from 'src/utils';

class Edit extends React.Component {

    state = { name: '' }

    onEdit = () => {
        this.props.setLoading(true);
        const _this = this;
        axios.put(`/menus/${this.props.menu.id}`, {name: this.state.name}).then(() => {
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

    onOpened = () => {
        this.setState({
            ...this.state,
            error: null
        })
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { error } = this.state;
        const { menu = {} } = this.props;
        const body = (
            <div>
                {error &&
                    <Alert className="text-center text-small" color="danger">
                        { singleError(error) }
                    </Alert>
                }
                <p>
                    <label>Name</label>
                    <Input 
                        name="name" 
                        defaultValue={menu.name} 
                        onChange={this.onChange}/>
                </p>
            </div>
        );

        const footer = (
            <Button color="primary" className="m-auto" onClick={this.onEdit}>Update</Button>
        );

        return (
            <Modal
                {...this.props}
                title="Edit Menu"
                body={body}
                footer={footer}
                toggle={this.props.toggle}
                onOpened={this.onOpened}
            />
        );
    }
}

export default Edit;

