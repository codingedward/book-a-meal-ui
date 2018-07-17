import React from 'react';
import { 
    Modal as BModal, 
    ModalHeader, 
    ModalBody, 
} from 'reactstrap';
import './styles.css';


class MenuModal extends React.Component {

    logout = () => {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        const { onOpened, body, isOpen, toggle } = this.props;
        return (
            <BModal className="menu-modal" isOpen={isOpen} onOpened={onOpened} toggle={toggle} fade={false}>
                <ModalHeader toggle={toggle}>
                    <button onClick={() => toggle()} type="button" className="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h2 className="logo-medium text-flav pt-3">BAM!</h2> 
                </ModalHeader>
                <ModalBody>
                    {body}
                    <button onClick={this.logout} className="btn btn-logout">Logout</button>
                </ModalBody>
            </BModal>
        );
    }
}
export default MenuModal;
