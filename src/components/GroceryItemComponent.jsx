import React from 'react'

import { useState } from 'react'
                              //! distructure
const GroceryItemComponent = ({item , handleEditItem, handleItemDelete}) => {
//! track if edit
const [isEditing,setIsEditing] = useState(false );
//! track sa input field para sa update (new item)
const [newItem, setNewItem] = useState(item.name);
//! check error
const [error, setError] = useState("");

const onEdit = () => {

                 if(newItem){
                 //!check if may value si new item
                 //! handleEditItem
                 handleEditItem(item.id, newItem);
                 //need ifalse kasi pagkasave mawawala input
                 setIsEditing(false);
                 setNewItem("")
                 setError("");
                 }else{
                  setError("Grocery Item cannot ba empty!")             
                }
               }
              
  return (
   <>
       <li>
               {isEditing ? ( 
               <input 
               type='text' 
               value={newItem} 
               onChange={(event) => setNewItem(event.target.value)}
               /> 
               ) : (
               <span>{item.name}</span>
               )}
          
               <div>
                              {/* button edit */}
                              <button onClick={()=> {isEditing ? onEdit() : setIsEditing(true)}} className='btn-edit'>
                                             {isEditing ? "Save" : "Edit"}
                              </button>
                              {/* button delete */}
                              <button onClick={() => handleItemDelete(item.id)} className='btn-delete'>Delete</button>
               </div>
       </li>
       {/* error flash */}
       {error ? <p className='errors'>{error}</p> : null}
    </>
  )
}

export default GroceryItemComponent