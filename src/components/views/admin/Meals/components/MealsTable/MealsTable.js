import React from 'react';

import Table from '../../../../../common/Table';
import { EntryType } from '../../../../../../constants';

class MealsTable extends React.Component {

    componentWillMount() {
        this.props.fetchMeals();
    }

    render() {

        const { payload, fetchStatus } = this.props.meals;
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
        const { toggleEdit } = this.props;
        return (
            <Table
                loading={fetchStatus}
                data={tableData}
                onEdit={toggleEdit}
                onDelete={() => {}}
            />
        );
    }
}

export default MealsTable;

