import React, { useState, useContext, useEffect } from 'react';
import ItemContext from '../../context/item/itemContext';
import ItemItem from './ItemItem';

const ItemForm = () => {
    const itemContext = useContext(ItemContext);

    const { addItem, updateItem, clearCurrent, current } = itemContext;

    useEffect(()=> {
        if(current !== null) {
            setItem(current);
        } else {
            setItem({
            object: '',
            quantity: '1'
        })
        }
    }, [itemContext, current])

    const [item, setItem] = useState({
        object: '',
        quantity: '1'
    });

    const { object, quantity } = item;

    const onChange = e => setItem({ ...item, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if(current === null) {
            addItem(item);
        } else {
            updateItem(item);
        }
        clearAll();
    }

    const clearAll = () => {
        clearCurrent();
    }

    return (
        
        <form className= {current ? 'current items-form form-container' : 'items-form form-container'}onSubmit ={onSubmit}>
            {/* <h2 className="text-primary">Add Item</h2> */}
            <input type="text" placeholder="Item" name="object" value={object} onChange={onChange}/>
            <input type="number" name="quantity" min="1" value={quantity} onChange={onChange}/>
            <div>
                <input type="submit" value={current ? 'Update' : 'Add'} className={current ? 'btn btn-light' : "btn btn-dark btn-sm"}/>
            </div>
            {current && <button className="btn-dark btn-close" onClick={clearAll}>X</button>
            
            }
        </form>
    )
}

export default ItemForm
