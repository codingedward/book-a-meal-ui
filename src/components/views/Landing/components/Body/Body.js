import React from 'react';
import Menu from '../../../../common/Menu';


class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menus: [{
                    id: 1,
                    name: 'Breakfast',
                    items: [{
                            id: 1,
                            cost: 30,
                            img_url: 'http://via.placeholder.com/400x400',
                            name: 'Ugali',
                        },
                        {
                            id: 2,
                            cost: 40,
                            img_url: 'http://via.placeholder.com/400x400',
                            name: 'Beef',
                        }
                    ]
                }
            ]
        };
    }

    render() {
        const menus = this.state.menus.map((menu) => 
            <Menu name={menu.name} items={menu.items} key={menu.id} />
        );
        return (
            <main>
                <section className="container text-center mt-4">
                    <header>
                        <h4>On Today's Menu</h4>
                    </header>
                    {menus}
                </section>
            </main>
        );
    }
}


export default Body;
