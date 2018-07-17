import React from 'react';
import './styles.css';
import placeholder from './assets/placeholder.png';

const MenuItem = ({  menu, item, onOrder }) => {

    let img_url = item.img_url;
    if (! img_url || img_url === '#')
        img_url = placeholder;
    const { meal = {} } = item;
    return (
        <div className="col-10 offset-1 offset-sm-0 col-sm-6 col-md-4 col-lg-3 text-center">
            <div className="menu-item pt-3 pl-3 pr-3 m-1">
                <img src={img_url} className="img-fluid" alt="Food"/>
                <table className="table">
                    <tbody>
                        <tr>
                            <td className="p-2">Ksh. {meal.cost}</td>
                        </tr>
                        <tr>
                            <td className="p-2">{meal.name}</td>
                        </tr>
                        <tr>
                            <td className="pb-0">
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => onOrder(item, menu)}>
                                    Order Now
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default MenuItem;
