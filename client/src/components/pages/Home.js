import React from 'react';
import Items from '../items/Items';
import ItemForm from '../items/ItemForm';

const Home = () => {
    return (
        <div className="grid-2">
            <div>
                <ItemForm />
            </div>
            <div>
                <Items />
            </div>
        </div>
    )
}

export default Home
