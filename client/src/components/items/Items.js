import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ItemItem from './ItemItem';
import ItemContext from '../../context/item/itemContext';


const Items = () => {
    const itemContext = useContext(ItemContext);
    
    const { items, filtered } = itemContext;

    if(items.length === 0) {
        return <h4>Please add an item</h4>
    }

    return (
        <Fragment>
            <TransitionGroup>
                {filtered !== null ? filtered.map(item => (
                <CSSTransition key= {item.id} timeout={500} classNames="item">
                    <ItemItem item={item} />
                </CSSTransition>)) 
                : items.map(item => (
                <CSSTransition key= {item.id} timeout={500} classNames="item">
                    <ItemItem item={item} />
                </CSSTransition>)
                )}
            </TransitionGroup>   
        </Fragment>
    )
}

export default Items
