import React from 'react';
import Modal from '../../../../../common/Modal';
import ImageInput from '../../../../../common/ImageInput';

import './styles.css';

const CreateModal = ({ isOpen, onCreate, toggle }) => {
    const body = (
        <div>
            <ImageInput />
            <label> Name </label>
            <input type="text" />
            <label> Cost </label>
            <input type="text" />
        </div>
    );

    const footer = (
        <button color="primary" className="m-auto" onClick={() => onCreate()}>Save Meal</button>
    )

    return (
        <Modal title="Add New Meal" body={body} footer={footer}/>
    );
}

export default CreateModal;
