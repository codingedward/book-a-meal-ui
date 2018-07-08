import React from 'react';


const Filter = ({ onFilter }) => {

    return (
        <div className="row mb-3">
            <div className="col-3 col-sm-2 col-lg-1 text-right">
                <label className="pt-2">Text:</label>
            </div>
            <div className="col-9 col-sm-7 col-lg-4 col-xl-3 pl-0">
               <input type="text" className="d-inline form-control ml-0 mb-0"  placeholder=" Search text..."/>
            </div>
            <div className="col-12 col-sm-1 col-lg-1 pt-3 pt-sm-0">
                <button onClick={() => onFilter()} className="btn btn-secondary d-block m-auto">Filter </button>
            </div>
        </div>
    );
}

export default Filter;
