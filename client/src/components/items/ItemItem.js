import React, { useContext }from 'react';
import PropTypes from 'prop-types';
import ItemContext from '../../context/item/itemContext';

const ItemItem = ({ item }) => {
    const itemContext = useContext(ItemContext);

    const { deleteItem } = itemContext;

    const { id, object, quantity } = item;

    const onDelete = () => {
        deleteItem(id);
    }
    return (
        <div className="card bg-light">
            <h3 className="text-dark text-left">
            {object}{' '} <span style={{ float: 'right'}}>{quantity}</span>
            </h3>
            <p>
                <button className="btn btn-dark btn-sm"><i className="fas fa-edit"></i></button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}><i className="fas fa-trash"></i></button>
            </p>
            
        </div>
    )
}

ItemItem.propTypes = {
    item: PropTypes.object.isRequired,
    
}
export default ItemItem;