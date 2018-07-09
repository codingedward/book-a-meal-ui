import React from 'react';

import { Alert } from 'reactstrap';
import Content from 'src/components/common/Content';
import Filter from 'src/components/common/Filter';
import Paginator from 'src/components/common/Paginator';
import Table from './components/MealsTable';
import Sidebar from '../components/Sidebar';
import CreateModal from './components/Create';
import EditModal from './components/Edit';
import DeleteModal from './components/Delete';

import { singleError } from 'src/utils';
import { paginationInfo } from 'src/utils';
import { Status } from 'src/constants';

class Meals extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            searchText: '',
            createIsOpen: false,
            editIsOpen: false,
            deleteIsOpen: false,
        }
    }

    componentDidUpdate() {
        if (this.props.meals.requiresFetch) {

            // it is the last item on the page, move back
            let { page } = this.state;
            if (this.props.meals.payload.current_count === 1 && page !== 1) {
                page -= 1;
            }
            this.props.fetchMeals({
                page,
                search: this.state.searchText
            });

            this.setState({
                ...this.state,
                page,
            });
        }
    }

    toggleCreate = (e) => {
        this.setState({
            ...this.state,
            createIsOpen: !this.state.createIsOpen
        });
        this.props.resetCreateStatus();
    }

    toggleEdit = (meal) => {
        this.setState({
            ...this.state,
            toEdit: meal || {},
            editIsOpen: !this.state.editIsOpen
        });
        this.props.resetEditStatus();
    }

    toggleDelete = (meal) => {
        this.setState({
            ...this.state,
            toDelete: meal || {},
            deleteIsOpen: !this.state.deleteIsOpen
        });
        this.props.resetDeleteStatus();
    }

    onFilter = (text) => {
        this.setState({
            ...this.state,
            searchText: text,
        });
        this.props.fetchMeals({ 
            search: text,
            page: this.page
        });
    }

    onPageChange = (page) => {
        this.setState({
            ...this.state,
            page,
        });

        this.props.fetchMeals({
            page: page,
            search: this.state.searchText
        });
    }

    render() {
        const contentTop = (
            <div className="col-12 mb-2 pr-0 pr-sm-2">
                <h5 className="d-inline-block">Manage Meals</h5>
                <button onClick={this.toggleCreate} className="btn btn-secondary float-right">
                    Add New
                </button>
            </div>
        );

        const contentFilter = (
            <Filter onFilter={this.onFilter} />
        );

        const { error, fetchStatus } = this.props.meals;
        const { 
            toEdit,
            editIsOpen,
            createIsOpen,
            toDelete,
            deleteIsOpen,
        } = this.state;

        return (
            <main className="container-fluid">
                <CreateModal 
                    {...this.props}
                    isOpen={createIsOpen} 
                    toggle={this.toggleCreate} />

                <EditModal 
                    {...this.props}
                    meal={toEdit} 
                    isOpen={editIsOpen} 
                    toggle={this.toggleEdit}/>

                <DeleteModal 
                    {...this.props}
                    meal={toDelete} 
                    isOpen={deleteIsOpen} 
                    toggle={this.toggleDelete}/>

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
                                     toggleEdit={this.toggleEdit} 
                                     toggleDelete={this.toggleDelete} />
                                 <Paginator 
                                     onPrev={this.onPageChange}
                                     onNext={this.onPageChange} 
                                     pageInfo={paginationInfo(this.props.meals)} />
                     </Content>
                 </section>
             </main>
        );
    }
}

export default Meals;
