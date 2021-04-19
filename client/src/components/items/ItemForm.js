import React, { useState, useContext } from 'react';
import ItemContext from '../../context/item/itemContext';
import ItemItem from './ItemItem';

const ItemForm = () => {
    const itemContext = useContext(ItemContext);


    const [item, setItem] = useState({
        object: '',
        quantity: '1'
    });

    const { object, quantity } = item;

    const onChange = e => setItem({ ...item, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        itemContext.addItem(item);
        setItem({
            object: '',
            quantity: '1' 
        })
    }

    return (
        <form onSubmit ={onSubmit}>
            <h2 className="text-primary">Add Item</h2>
            <input type="text" placeholder="Item" name="object" value={object} onChange={onChange}/>
            <h5>Quantity</h5>
            <input type="number" name="quantity" value={quantity} onChange={onChange}/>
            <div>
                <input type="submit" value="Add Item" className="btn btn-primary btn-block"/>
            </div>
        </form>
    )
}

export default ItemForm
