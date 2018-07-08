import React from 'react';
import { 
    Modal as BModal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter 
} from 'reactstrap';
import './styles.css';

const Modal = ({ title, body, footer, isOpen, toggle }) => (
    <BModal isOpen={isOpen} toggle={toggle} fade={false}>
        <ModalHeader toggle={toggle}>
            {title}
            <button onClick={() => toggle()} type="button" className="close">
                <span aria-hidden="true">&times;</span>
            </button>
        </ModalHeader>
        <ModalBody>
            {body}
        </ModalBody>
        <ModalFooter>
            {footer}
        </ModalFooter>
    </BModal>
);

export default Modal;