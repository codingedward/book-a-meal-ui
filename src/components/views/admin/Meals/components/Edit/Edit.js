import React from 'react';
import Modal from 'src/components/common/Modal';
import ImageInput from 'src/components/common/ImageInput';
import { Alert, Input, Button } from 'reactstrap';
import { Status } from 'src/constants';
import { singleError } from 'src/utils';
import './styles.css';


class EditModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.meal
        }
    }

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

    onPrefillRemoved = () => {
        this.setState({
            ...this.state,
            image: null,
            img_url: '#',
        });
    }


    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    onEdit = () => {
        this.props.editMeal({
            ...this.props.meal,
            ...this.state,
        });
    }

    render() {
        const { error, editStatus } = this.props.meals
        const meal = this.props.meal || {}
        const body = (
            <div>
                {editStatus === Status.SUCCESS &&
                        <Alert className="text-center text-small" color="success">
                            Successfully edited meal.
                        </Alert>
                }
                {editStatus === Status.FAIL &&
                        <Alert className="text-center text-small" color="danger">
                            { singleError(error) }
                        </Alert>
                }

                <ImageInput 
                    prefill={meal.img_url}
                    onImageAdded={this.onImageAdded} 
                    onImageRemoved={this.onImageRemoved}
                    onPrefillRemoved={this.onPrefillRemoved}
                />
                <div class="pl-4 pr-4">
                    <label> Name </label>
                    <Input defaultValue={meal.name} name="name" onChange={this.onChange} type="text" />
                    <label> Cost </label>
                    <Input defaultValue={meal.cost} name="cost" onChange={this.onChange} type="number" />
                </div>
            </div>
        );

        const footer = (
            <Button color="primary" className="m-auto"onClick={this.onEdit}>Update Meal</Button>
        )
        const { isOpen, toggle } = this.props;

        return (
            <Modal 
                title="Edit Meal" 
                body={body} 
                footer={footer} 
                isOpen={isOpen}
                toggle={toggle}
            />
        );
    }
}

export default EditModal;
