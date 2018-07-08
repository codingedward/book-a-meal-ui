import React from 'react';
import Modal from '../../../../../common/Modal';
import { Alert, Button } from 'reactstrap';
import { Status } from '../../../../../../constants';
import { singleError } from '../../../../../../utils';
import './styles.css';


class DeleteModal extends React.Component {

    onDelete = () => {
        this.props.toggle();
        this.props.deleteMeal(this.props.meal);
    }

    render() {
        const meal = this.props.meal || {}
        const body = (
            <div>
                <p className="text-center">
                    Delete this meal (<b>{meal.name}</b>)?
                </p>
            </div>
        );

        const footer = (
            <Button color="danger" className="m-auto"onClick={this.onDelete}>Delete</Button>
        );

        const { isOpen, toggle } = this.props;
        return (
            <Modal 
                title="Delete Meal" 
                body={body} 
                footer={footer} 
                isOpen={isOpen}
                toggle={toggle}
            />
        );
    }
}

export default DeleteModal;
