import React from 'react';
import { EntryType } from '../../../constants';

const Table = ({ data, onDelete, onEdit }) => {

    const renderEntry = (value, type) => {
        switch (type) {
            case EntryType.IMAGE:
                return <img src={value} alt="Entry" />;
            case EntryType.DATE:
                return new Date(value).toDateString()
            case EntryType.TEXT:
            case EntryType.NUMBER:
            default:
                return value;
        }
    }

    return (
        <div className="table-holder">
            <table className="table">
                <thead>
                    <tr>
                        {data.columns.map(column => (
                            <th key={column.title}> {column.title} </th>
                        ))}

                        { /* editable? */ }
                        {onEdit && <th> Edit </th> }

                        { /* deletable? */ }
                        {onDelete && <th> Delete </th> }
                    </tr>
                </thead>
                <tbody>
                    {data.rows.map((row, rIndex) => (
                        <tr key={rIndex}>
                            {data.columns.map((column, cIndex) => (
                                <td key={`${rIndex}${cIndex}`}>
                                    { renderEntry(row[column.key], column.type) }
                                </td>
                            ))}

                            { /* editable? */ }
                            {onEdit &&
                                <td>
                                    <button onClick={() => onEdit()} className="edit-act">
                                        Edit 
                                    </button>
                                </td>
                            }

                            { /* deletable? */ }
                            {onDelete &&
                                <td>
                                    <button onClick={() => onDelete()} className="delete-act">
                                        Delete
                                    </button>
                                </td>
                            }
                        </tr> 
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
