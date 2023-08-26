import React, { useState } from 'react'

const TodoItem = ({data, handleCheckbox, handleDelete}) => {


    const {id, name, isCompleted} = data
   
    return (            
                <li className={`todo-item ${isCompleted ? 'completed' : 'uncompleted'}`}>
                    <div>
                        <span className="todo-control-btn">
                                <input 
                                type="checkbox"
                                checked ={isCompleted}
                                onChange={() => handleCheckbox(id)}
                                ></input>                      
                        </span>                       
                        <span className="todo-item-name">{name}</span>
                    </div>
                    <span className="todo-control-btn" onClick={() => handleDelete(id)}>
                            <i className="fa-solid fa-trash"></i>                        
                        </span>
                </li>
            )
}

export default TodoItem