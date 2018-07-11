import React from 'react';
import { Alert, 
    ButtonDropdown,  
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import Filter from 'src/components/common/Filter';
import Content from 'src/components/common/Content';
import MenuItemsTable from './components/MenuItemsTable';
import CreateModal from './components/Create';
import EditModal from './components/Edit';
import DeleteModal from './components/Delete';
import axios from 'src/axios';
import './styles.css';

import { singleError, paginationInfo } from 'src/utils';

class MenuItems extends React.Component {

    bubbleBlocked = false;

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            data: {},
            search: '',
            perPage: 5,
        }
    }

    componentWillMount() {
        this.fetchMenuItems()
    }

    fetchMenuItems = (config = {}) => {
        let { 
            page = this.state.page, 
            perPage = this.state.perPage,
            search = this.state.search, 
        } = config;
        search = (search) ? `name:${search}` : '';
        const link = `/menu-items?page=${page}&search=${search}&per_page=${perPage}`;

        this.setState({
            ...this.state,
        });
        this.props.setLoading(true);


        const _this = this;
        axios.auth();
        axios.get(link, this.state).then(({ data }) => {

            const pageInfo = paginationInfo(data);
            _this.setState({
                ..._this.state,
                page: pageInfo.currentPage,
                data,
            });
            this.props.setLoading(false);

            if (pageInfo.currentCount === 0 && pageInfo.currentPage !== 1) {
                _this.fetchMenuItems({
                    page: pageInfo.currentPage - 1
                })
            }

        }).catch(({ response }) => {
            _this.setState({
                ..._this.state,
                error: response,
            })
            this.props.setLoading(false);
        })
    }

    toggleManage = (e) => {
        if (this.bubbleBlocked) 
            return;
        this.setState({
            ...this.state,
            manageIsOpen: !this.state.manageIsOpen,
        });
    }
    
    toggleCreate = (e) => {

        /** 
         * workaround e.stopPropagation()
         * @see https://github.com/facebook/react/issues/1691
         */
        this.bubbleBlocked = true;
        setTimeout(() => {
            this.bubbleBlocked = false;
        }, 500);

        this.setState({
            ...this.state,
            manageIsOpen: false,
            createIsOpen: !this.state.createIsOpen,
        });
    }

    toggleEdit = (menuItem) => {
        this.setState({
            ...this.state,
            toEdit: menuItem || {},
            editIsOpen: !this.state.editIsOpen
        });
    }


    toggleDelete = (menuItem) => {
        this.setState({
            ...this.state,
            toDelete: menuItem || {},
            deleteIsOpen: !this.state.deleteIsOpen
        });
    }


    onFilter = (text) => {
        this.setState({
            ...this.state,
            search: text,
        });
        this.fetchMenuItems({search: text});
    }

    blockBubble = () => {
        this.setState({}) 
    }

    onPageChange = (page) => {
        this.setState({
            ...this.state,
            page,
        });

        this.fetchMenuItems({
            page: page,
            search: this.state.search
        });
    }

    render() {
        const { 
            data,
            error,
            pageInfo,
            toEdit,
            editIsOpen,
            createIsOpen,
            toDelete,
            deleteIsOpen,
            manageIsOpen
        } = this.state;

        const contentTop = (
            <div className="col-12 mb-2 pr-0 pr-sm-2">
                <h5 className="d-inline-block">Today's Menu</h5>
                <ButtonDropdown className="float-right" isOpen={manageIsOpen} toggle={this.toggleManage}>
                    <DropdownToggle className="btn-secondary" caret>
                        Manage
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={this.toggleCreate}>Add Menu Item</DropdownItem>
                        <DropdownItem>Edit Categories</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>

            </div>
        );

        const contentFilter = (
            <Filter onFilter={this.onFilter} />
        );

        return (
            <Content 
                {...this.props}
                contentTop={contentTop} 
                contentFilter={contentFilter}>
            
                { error && <Alert color="danger"> { singleError(error) }</Alert> }
                     <MenuItemsTable 
                         data={data}
                         pageInfo={pageInfo}
                         onPrev={this.onPageChange}
                         onNext={this.onPageChange}
                         toggleEdit={this.toggleEdit} 
                         toggleDelete={this.toggleDelete} />

                    <CreateModal 
                        {...this.props}
                        onChange={this.fetchMenuItems}
                        isOpen={createIsOpen} 
                        toggle={this.toggleCreate} />

                    <EditModal 
                        {...this.props}
                        menuItem={toEdit} 
                        onChange={this.fetchMenuItems}
                        isOpen={editIsOpen} 
                        toggle={this.toggleEdit}/>

                    <DeleteModal 
                        {...this.props}
                        menuItem={toDelete} 
                        onChange={this.fetchMenuItems}
                        isOpen={deleteIsOpen} 
                        toggle={this.toggleDelete}/>
            </Content>
        );
    }
}

export default MenuItems;
