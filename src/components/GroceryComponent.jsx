import React, { useRef, useState } from 'react'
import GroceryItemComponent from './GroceryItemComponent';
import { v4 as uuid } from 'uuid';

const GroceryComponent = () => {
//! para mafocus yung input
const inputRef = useRef()
// ? state
const [item, setItem] = useState(""); // ! for the input
const [groceryItems, setGroceryItems] = useState([]) //! for our grocery item list
const [error,  setError] = useState(""); // ! for the error

const handleAddItem = () => {

               if(item){
               //! dito i add natin si item sa groceryItem && we need to generate kasi wala tayong id sa item so need install npm i uuid
               setGroceryItems([...groceryItems, {id: uuid(), name: item}]);
               //! after add empty yung input
               setItem("");
               setError("") //!para mawala yung error
               }else{
               setError("Grocery Item cannot ba empty!")  
               inputRef.current.focus()   
               }

};

const handleEditItem = (id, newItem) => {
               //! dito na natin i update si grocery item na list
               //! map
               const updatedGroceryItems = groceryItems.map((item) => {
                              if (item.id === id) {
                                    return {...item, name: newItem}         
                              }else {
                                    return item;
                              }
               });
               setGroceryItems(updatedGroceryItems);
};

const handleItemDelete = (removedId) => {
const filteredItems = groceryItems.filter((item) => item.id !== removedId);
setGroceryItems(filteredItems)
};

const handleClearItems = () => {
  setGroceryItems([])        
};

  return (
    <div className='grocery-buddy'>
        <h1>Grocery Buddy</h1>
        <div className='input-section'>
              <div className='input-container'>
               <input ref={inputRef} type="text" placeholder='Enter item..' value={item}
               onChange={(event) => setItem(event.target.value)}/>
               <button onClick={handleAddItem} className='btn-add'>Add Item</button>
              </div>
              {/* error */}
              <div>{error ? <p className='errors'>{error}</p> : null} </div>
        </div>
        <ul className='grocery-list'>
        {groceryItems.map((item) => (
          <GroceryItemComponent
            key={item.id}
            item={item}//!props
            handleEditItem={handleEditItem}//!props
            handleItemDelete={handleItemDelete}//!props
          />
        ))}
        </ul>
        {/* mag didisplay lang yung button na clear pag may laman ang list */}
        {groceryItems.length > 0 ? <button onClick={handleClearItems} className='btn-add'>Clear All {" "}</button> : null}
    </div>
  )
}

export default GroceryComponent