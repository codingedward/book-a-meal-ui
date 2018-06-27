import React from 'react';
import './styles.css';


class MenuItem extends React.Component {

    render() {
        return (
            <div className="col-10 offset-1 offset-sm-0 col-sm-6 col-md-4 col-lg-3 text-center">
                <div className="menu-item pt-3 pl-3 pr-3 m-1">
                    <img src={this.props.item.img_url} className="img-fluid" alt="Food"/>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td className="p-2">Ksh. {this.props.item.cost}</td>
                            </tr>
                            <tr>
                                <td className="p-2">{this.props.item.name}</td>
                            </tr>
                            <tr>
                                <td className="pb-0">
                                    <a href="login.html" className="btn btn-primary">Order Now</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default MenuItem;
