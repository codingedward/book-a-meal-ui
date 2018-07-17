import React from 'react';
import { Alert } from 'reactstrap';
import Filter from 'src/components/common/Filter';
import Content from 'src/components/common/Content';
import OrdersTable from './components/OrdersTable';
import axios from 'src/axios';

import { singleError, paginationInfo } from 'src/utils';

class OrdersHistory extends React.Component {

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
        this.fetchOrdersHistory()
    }

    fetchOrdersHistory = (config = {}) => {
        let { 
            page = this.state.page, 
            perPage = this.state.perPage,
            search = this.state.search, 
        } = config;
        const link = 
            `/orders?related=menu_item|user&page=${page}&search=${search}&per_page=${perPage}&time=history`;
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
                _this.fetchOrdersHistory({
                    page: pageInfo.currentPage - 1
                });
            }
        }).catch(({ response }) => {
            _this.setState({
                ..._this.state,
                error: response,
            })
            _this.props.setLoading(false);
        })
    }

    onFilter = (text) => {
        this.setState({
            ...this.state,
            search: text,
        });
        this.fetchOrdersHistory({search: text});
    }

    onPageChange = (page) => {
        this.setState({
            ...this.state,
            page,
        });

        this.fetchOrdersHistory({
            page: page,
            search: this.state.search
        });
    }

    render() {
        const { 
            data,
            error,
            pageInfo,
        } = this.state;


        const contentTop = (
            <div className="col-12 mb-2 pr-0 pr-sm-2">
                <h5 className="d-inline-block">Orders History</h5>
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
                     <OrdersTable 
                         data={data}
                         pageInfo={pageInfo}
                         onToggle={() => {}}
                         onPrev={this.onPageChange}
                         onNext={this.onPageChange} />
            </Content>
        );
    }
}

export default OrdersHistory;
