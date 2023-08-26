import React, { useCallback, useEffect, useRef } from 'react'
import { useState } from 'react'
import TodoItem from './TodoItem'
const tabs = ['All', 'Active', 'Completed']

const Todolist = () => {
    const [todoItem, setTodoItem] = useState({id: 0, name: '', isCompleted: false})
    const [type, setType] = useState('All')
    const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todoList')) || [])
    const inputRef = useRef()
    const filteredlist = useCallback(( () => {
        let filteringTodoList = [...todoList]
        switch (type) {
            case "All" :
                return filteringTodoList
            case "Active":
                return filteringTodoList.filter((listItem) => listItem.isCompleted === false )
            case "Completed":
                return  filteringTodoList.filter((listItem) => listItem.isCompleted === true )               
            default:
                return filteringTodoList
        }
        
    }), [type, todoList])
    const handleAddTodo = () => {
        const list = [
            ...todoList,
            todoItem
        ]
        localStorage.setItem('todoList', JSON.stringify(list))
        setTodoList(list)
        setTodoItem({id: 0, name: '', isCompleted: false})
        inputRef.current.focus()
        setType('All')
    }
    const handleChangeInput = (event) => {
         setTodoItem({
            id: Date.now(),
            name: event.target.value,
            isCompleted: false
        })
    }
    const handleCheckbox = (id)=> {
        const list = todoList.map((item)=> {               
            if (item.id === id) {
                    return {
                        ...item,
                        isCompleted: !item.isCompleted
                    }
            }    else {
                return item
            }            
        })
        localStorage.setItem('todoList', JSON.stringify(list))
        setTodoList(list)
      }
  const handleDelete = (id) => {
    const list = todoList.filter((item) => {
        return item.id !== id
    })
    localStorage.setItem('todoList', JSON.stringify(list))
    setTodoList(list)
      
  }
  const handleDeleteCompleted = () => {
    const list = todoList.filter((item) => {
        return item.isCompleted === false
    })
    localStorage.setItem('todoList', JSON.stringify(list))
    setTodoList(list)
  }
  return (
    <div className='container'>
        <h2>#Todo</h2>
        <ul className='navigation-bar'>
            {tabs.map((tab) => {
                return <li 
                className={`tab ${tab === type ? 'active' : ''}`} 
                key={tab} 
                onClick={() => setType(tab) }
                >
                {tab}
                </li>
            })}
        </ul>
        <div className='todo-control'>
                <input 
                className='todo-input'
                type='text' 
                placeholder='Enter task...' 
                onChange={handleChangeInput} 
                value={todoItem.name} 
                ref={inputRef} />
                <button className='add-btn' onClick={handleAddTodo}>Add</button>
        </div>
        <ul className='todo-table'>
                {filteredlist().map( (item) => {
                    return (
                    <TodoItem 
                        key={item.id} 
                        data={item} 
                        handleCheckbox={handleCheckbox} 
                        handleDelete={handleDelete}
                    />)
                    
                    
                })}
        </ul>
        {type === 'Completed' && <button onClick={handleDeleteCompleted} className='delete-all-btn'>Delete All</button> }
    </div>
  )
}

export default Todolist