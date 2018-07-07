import React from 'react';

import { Alert } from 'reactstrap';
import Table from '../../../common/Table';
import Content from '../../../common/Content';
import Sidebar from '../../../common/Sidebar';
import { EntryType } from '../../../../constants';
import { singleError } from '../../../../utils';
import CreateModal from './components/Create';

class Meals extends React.Component {

    constructor(props) {
        super(props);
        this.props.getMeals();
    }

    render() {

        const { payload, error, loading } = this.props.response;
        const tableData = {
            columns: [
                { key: 'id', title: 'ID', type: EntryType.NUMBER },
                { key: 'img_url', title: 'Image', type: EntryType.IMAGE },
                { key: 'name', title: 'Name', type: EntryType.TEXT },
                { key: 'cost', title: 'Cost', type: EntryType.NUMBER },
                { key: 'created_at', title: 'Created On', type: EntryType.DATE }
            ],
            rows: (payload && payload.meals) ? payload.meals : []
        };


        return (
            <main className="container-fluid">
                <CreateModal isOpen={true}/>
                 <section className="row">
                     <Sidebar />
                     <Content
                            title="Manage Meals"
                            actionBtn="Add New"
                     >
                        {error && <Alert color="danger"> { singleError(error) }</Alert> }
                        <Table
                            loading={loading}
                            data={tableData}
                            onEdit={() => {}}
                            onDelete={() => {}}
                        />
                     </Content>
                 </section>
             </main>
        );
    }
}

export default Meals;
