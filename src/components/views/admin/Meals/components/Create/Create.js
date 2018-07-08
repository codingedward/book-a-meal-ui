import React from 'react';
import Modal from '../../../../../common/Modal';
import ImageInput from '../../../../../common/ImageInput';
import { Alert, Input, Button } from 'reactstrap';
import { Status } from '../../../../../../constants';
import { singleError } from '../../../../../../utils';

import './styles.css';


class CreateModal extends React.Component {

    onImageAdded = (data) => {
        this.setState({
            ...this.state,
            image: data,
        });
    }

    onImageRemoved = () => {
        this.setState({
            ...this.state,
            image: null,
        })
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    onSave = () => {
        this.props.createMeal({
            ...this.state,
        });
    }

    render() {
        const { error, createStatus } = this.props.meals;
        const body = (
            <div>
                {createStatus === Status.SUCCESS &&
                        <Alert className="text-center text-small" color="success">
                            Successfully added
                        </Alert>
                }
                {createStatus === Status.FAIL &&
                        <Alert className="text-center text-small" color="danger">
                            { singleError(error) }
                        </Alert>
                }

                <ImageInput 
                    onImageAdded={this.onImageAdded} 
                    onImageRemoved={this.onImageRemoved}
                />
                <label> Name </label>
                <Input name="name" onChange={this.onChange} type="text" />
                <label> Cost </label>
                <Input name="cost" onChange={this.onChange} type="number" />
            </div>
        );

        const footer = (
            <Button color="primary" className="m-auto"onClick={this.onSave}>Save Meal</Button>
        )
        const { isOpen, toggle } = this.props;

        return (
            <Modal 
                title="Add New Meal" 
                body={body} 
                footer={footer} 
                isOpen={isOpen}
                toggle={toggle}
            />
        );
    }
}

export default CreateModal;
