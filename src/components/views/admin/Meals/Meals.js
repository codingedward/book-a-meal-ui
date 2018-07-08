import React from 'react';

import { Alert } from 'reactstrap';
import Content from '../../../common/Content';
import Sidebar from '../../../common/Sidebar';
import Filter from '../../../common/Filter';
import Table from './components/MealsTable';
import CreateModal from './components/Create';
import EditModal from './components/Edit';
import DeleteModal from './components/Delete';

import { singleError } from '../../../../utils';
import { Status } from '../../../../constants';

class Meals extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            createStatus: Status.DEFAULT,
            createIsOpen: false,
            editStatus: Status.DEFAULT,
            editIsOpen: false,
            deleteStatus: Status.DEFAULT,
            deleteIsOpen: false,
        }
    }

    componentDidUpdate(prevProps) {
        const statusNames = ['editStatus', 'fetchStatus', 'createStatus'];
        for (const name of statusNames) {
            if (prevProps.meals[name] !== this.props.meals[name]) {
                this.setState({
                    ...this.state,
                    [name] : this.props.meals[name]
                })
            }
        }
    }

    toggleAddMeal = (e) => {
        this.setState({
            ...this.state,
            createIsOpen: !this.state.createIsOpen
        });
    }

    toggleEditMeal = (meal) => {
        this.setState({
            ...this.state,
            editMeal: meal || {},
            editStatus: Status.STARTED,
            editIsOpen: !this.state.editIsOpen
        });
    }

    toggleDeleteMeal = (meal) => {
        this.setState({
            ...this.state,
            deleteMeal: meal || {},
            deleteStatus: Status.STARTED,
            deleteIsOpen: !this.state.deleteIsOpen
        });
    }

    render() {
        const contentTop = (
            <div className="col-12 mb-2 pr-0 pr-sm-2">
                <h5 className="d-inline-block">Manage Meals</h5>
                <button onClick={() => this.toggleAddMeal()} className="btn btn-secondary float-right">
                    Add New
                </button>
            </div>
        );

        const contentFilter = (
            <Filter />
        );

        const { error, fetchStatus } = this.props.meals;
        const { 
            editMeal,
            editIsOpen,
            editStatus,
            createIsOpen,
            createStatus,
            deleteMeal,
            deleteIsOpen,
            deleteStatus
        } = this.state;

        return (
            <main className="container-fluid">
                <CreateModal 
                    {...this.props}
                    error={error}
                    isOpen={createIsOpen} 
                    createStatus={createStatus}
                    toggle={this.toggleAddMeal} />

                <EditModal 
                    {...this.props}
                    error={error}
                    meal={editMeal} 
                    isOpen={editIsOpen} 
                    editStatus={editStatus}
                    toggle={this.toggleEditMeal}/>

                <DeleteModal 
                    {...this.props}
                    error={error}
                    meal={deleteMeal} 
                    isOpen={deleteIsOpen} 
                    deleteStatus={deleteStatus}
                    toggle={this.toggleDeleteMeal}/>

                 <section className="row">
                     <Sidebar />
                     <Content 
                         contentTop={contentTop}
                         contentFilter={contentFilter}
                     >
                         {fetchStatus === Status.FAIL &&
                                 <Alert color="danger"> { singleError(error) }</Alert> }
                                 <Table 
                                     {...this.props} 
                                     toggleEdit={this.toggleEditMeal} 
                                     toggleDelete={this.toggleDeleteMeal} />
                     </Content>
                 </section>
             </main>
        );
    }
}

export default Meals;
