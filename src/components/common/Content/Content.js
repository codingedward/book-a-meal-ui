import React from 'react';
import menuImg from './assets/menu.png';

const Content = ({ children, target, title, actionBtn }) => (
    <div className="col-12 col-md-8 offset-md-4 col-lg-9 offset-lg-3 container-fluid p-4">
        <div className="row">
            <div className="col-12">
                <img className="d-md-none controls-icon pb-3" 
                     alt="Menu"
                     src={menuImg}/>
            </div>
            <div className="col-12 mb-2 pr-0 pr-sm-2">
                <h5 className="d-inline-block">{title}</h5>
                {actionBtn &&
                    <button className="btn btn-secondary float-right">{actionBtn}</button>
                }
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-3 col-sm-2 col-lg-1 text-right">
                <label className="pt-2">Text:</label>
            </div>
            <div className="col-9 col-sm-7 col-lg-4 col-xl-3 pl-0">
               <input type="text" className="d-inline form-control ml-0 mb-0"  placeholder=" Search text..."/>
            </div>
            <div className="col-12 col-sm-1 col-lg-1 pt-3 pt-sm-0">
                <button className="btn btn-secondary d-block m-auto">Filter </button>
            </div>
        </div>

        <div className="row">
            <div className="col-12">
                {children}
            </div>
        </div>
    </div>
);

export default Content;
