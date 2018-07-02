import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const MenuItem = ({ item }) => (
    <div className="col-10 offset-1 offset-sm-0 col-sm-6 col-md-4 col-lg-3 text-center">
        <div className="menu-item pt-3 pl-3 pr-3 m-1">
            <img src={item.img_url} className="img-fluid" alt="Food"/>
            <table className="table">
                <tbody>
                    <tr>
                        <td className="p-2">Ksh. {item.cost}</td>
                    </tr>
                    <tr>
                        <td className="p-2">{item.name}</td>
                    </tr>
                    <tr>
                        <td className="pb-0">
                            <Link to="/login" className="btn btn-primary"> Order Now</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

export default MenuItem;
