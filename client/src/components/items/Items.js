import React, { Fragment, useContext } from 'react';
import ItemItem from './ItemItem';
import ItemContext from '../../context/item/itemContext';


const Items = () => {
    const itemContext = useContext(ItemContext);
    
    const { items } = itemContext;

    return (
        <Fragment>
            {items.map(item => 
            (<ItemItem key= {item.id} item={item} />)
            )}
            
        </Fragment>
    )
}

export default Items
