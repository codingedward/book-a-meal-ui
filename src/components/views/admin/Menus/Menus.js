import React from 'react';
import { Alert, 
    ButtonDropdown,  
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import Filter from 'src/components/common/Filter';
import Content from 'src/components/common/Content';
import MenusTable from './components/MenusTable';
import CreateModal from './components/Create';
import EditModal from './components/Edit';
import DeleteModal from './components/Delete';
import MenuTypes from './components/MenuTypes';
import axios from 'src/axios';
import './styles.css';

import { singleError, paginationInfo } from 'src/utils';

class Menus extends React.Component {

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
        this.fetchMenus()
    }

    fetchMenus = (config = {}) => {
        let { 
            page = this.state.page, 
            perPage = this.state.perPage,
            search = this.state.search, 
        } = config;
        search = (search) ? `name:${search}` : '';
        const link = `/menu-items?page=${page}&search=${search}&per_page=${perPage}`;
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
            _this.props.setLoading(false);

            if (pageInfo.currentCount === 0 && pageInfo.currentPage !== 1) {
                _this.fetchMenus({
                    page: pageInfo.currentPage - 1
                })
            }
        }).catch(({ response }) => {
            _this.setState({
                ..._this.state,
                error: response,
            })
            _this.props.setLoading(false);
        })
    }

    blockBubbling = () => {
        /** 
         * workaround e.stopPropagation()
         * @see https://github.com/facebook/react/issues/1691
         */
        this.bubbleBlocked = true;
        setTimeout(() => {
            this.bubbleBlocked = false;
        }, 500);

    }

    toggleMenuTypes = (e) => {
        this.blockBubbling();
        this.setState({
            ...this.state,
            manageIsOpen: false,
            menuTypesIsOpen: !this.state.menuTypesIsOpen
        });
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
        this.blockBubbling();
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
        this.fetchMenus({search: text});
    }

    blockBubble = () => {
        this.setState({}) 
    }

    onPageChange = (page) => {
        this.setState({
            ...this.state,
            page,
        });

        this.fetchMenus({
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
            manageIsOpen,
            menuTypesIsOpen,
        } = this.state;

        const contentTop = (
            <div className="col-12 mb-2 pr-0 pr-sm-2">
                <h5 className="d-inline-block">Today's Menu</h5>
                <ButtonDropdown className="float-right" isOpen={manageIsOpen} toggle={this.toggleManage}>
                    <DropdownToggle className="btn-secondary" caret>
                        Manage
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={this.toggleMenuTypes}>Manage Menus</DropdownItem>
                        <DropdownItem onClick={this.toggleCreate}>Add Meal To Menu</DropdownItem>
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
                     <MenusTable 
                         data={data}
                         pageInfo={pageInfo}
                         onPrev={this.onPageChange}
                         onNext={this.onPageChange}
                         toggleEdit={this.toggleEdit} 
                         toggleDelete={this.toggleDelete} />

                    <CreateModal 
                        {...this.props}
                        onChange={this.fetchMenus}
                        isOpen={createIsOpen} 
                        toggle={this.toggleCreate} />

                    <EditModal 
                        {...this.props}
                        menuItem={toEdit} 
                        onChange={this.fetchMenus}
                        isOpen={editIsOpen} 
                        toggle={this.toggleEdit}/>

                    <DeleteModal 
                        {...this.props}
                        menuItem={toDelete} 
                        onChange={this.fetchMenus}
                        isOpen={deleteIsOpen} 
                        toggle={this.toggleDelete}/>

                    <MenuTypes
                        {...this.props}
                        isOpen={menuTypesIsOpen}
                        toggle={this.toggleMenuTypes}/>
            </Content>
        );
    }
}

export default Menus;
