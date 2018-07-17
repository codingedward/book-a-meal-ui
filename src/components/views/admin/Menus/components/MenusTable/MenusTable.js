import React from 'react';
import Paginator from 'src/components/common/Paginator';
import { flattenObject, paginationInfo } from 'src/utils';

import Table from 'src/components/common/Table';
import { EntryType } from 'src/constants';

class MenuItemsTable extends React.Component {

    render() {
        const { menu_items  } = this.props.data;
        let rows = (menu_items) ? menu_items : [];

        rows = rows.map(row => {
            return flattenObject(row);
        });

        const tableData = {
            columns: [
                { key: 'id', title: 'ID', type: EntryType.NUMBER },
                { key: 'meal.img_url', title: 'Meal Image', type: EntryType.IMAGE },
                { key: 'meal.name', title: 'Meal Name', type: EntryType.TEXT },
                { key: 'quantity', title: 'Quantity', type: EntryType.NUMBER },
                { key: 'menu.name', title: 'Menu', type: EntryType.TEXT },
                { key: 'created_at', title: 'Created On', type: EntryType.DATE }
            ],
            rows,
        };
        const pageInfo = paginationInfo(this.props.data);
        const { toggleEdit, toggleDelete } = this.props;
        return (
            <div>
                <Table data={tableData} onEdit={toggleEdit} onDelete={toggleDelete} />
                <Paginator {...this.props} pageInfo={pageInfo} />
            </div>
        );
    }
}

export default MenuItemsTable;
