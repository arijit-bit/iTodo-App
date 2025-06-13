import React, { useState, useEffect } from 'react'
import './navbar.css'

const Navbar = () => {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [addtaskbtn, setaddtaskbtn] = useState(false)
  const [Complete, setComplete] = useState(false)
  const [editMode, seteditMode] = useState(false)

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos")
    if (savedTodos) {
      settodos(JSON.parse(savedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (todo !== "") {
      settodos([...todos, { todo, Complete, editMode }])
      settodo("")
      // console.log(todos)
    }

  }
  const handelEdit = (index) => {
    const edit = todos.map((item, i) =>
      i === index ? { ...item, editMode: !item.editMode } : item
    )
    settodos(edit)

  }

  const handleinput = (e) => {
    if (e.target.value != "") {
      settodo(e.target.value)
    }
  }
  const handleDone = (index) => {
    const markDone_todos = todos.map((item, i) =>
      i === index ? { ...item, Complete: !item.Complete } : item
    )
    settodos(markDone_todos)

  }
  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    settodos(updatedTodos);

  };

  return (
    <div className='bg-[#230f35] pt-[4.5vw] flex justify-center items-center'>
      <div className="body-cont bg-white w-[60vw] min-w-[414px] max-w-[550px] h-[600px] rounded-[9px] p-8 px-15 ">
        <div className="head-cont pb-10">
          <div className="heading text-3xl font-medium " >iTodo App</div>
          <button className="heading text-[11px] bg-amber-100 px-1 rounded-[2px] p-0.5">Do it now.</button>
        </div>
        <div className="add-task-button pb-1.5">
          {addtaskbtn ? <div className='flex items-center justify-start gap-2'>
            <input onChange={handleinput} onKeyDown={(e) => { if (e.key === 'Enter') { handleAdd(); } }} value={todo} type="text" className='border border-black text-[11px] px-1 rounded-[3px] p-0.5 pl-1 w-[250px]' />
            <div className='flex items-center gap-2 pr-1'>
              <button onClick={handleAdd} className="heading text-[11px] px-1 rounded-[2px] p-0.5 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-medium cursor-pointer">Add</button>
              <button onClick={() => setaddtaskbtn(!addtaskbtn)} className="heading text-[11px] px-1 rounded-[2px] p-0.5 border border-red-400 text-red-400  hover:bg-red-400 hover:text-white font-medium cursor-pointer "><svg xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth="2"
                width="15" height="16">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M6 7h12M9 7V4h6v3M10 11v6M14 11v6M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12" />
              </svg></button>
            </div>
          </div> :
            <div className='flex justify-start items-center'>
              <button onClick={() => setaddtaskbtn(!addtaskbtn)} className="heading text-[11px] px-1 rounded-[2px] p-0.5 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-medium cursor-pointer">Add Task</button>
            </div>}
        </div>
        <div className="todo-lists">
          <div className="box-header">
            <ul className='flex items-center justify-between text-[13px] font-bold py-2 border-b border-black '>
              <li>#</li>
              <li className='pr-20 pl-3'>Task Name</li>
              <li>Status</li>
              <li>Edit</li>
              <li>Remove</li>
            </ul>
          </div>
          {todos.length === 0 ? <h2 className='text-xl text-gray-400 flex items-center justify-center h-[250px] font-medium'>No todos to do</h2> : <div className="todo-list h-[350px] overflow-y-auto [&::-webkit-scrollbar]:hidden hover:[&::-webkit-scrollbar]:block hover:[&::-webkit-scrollbar]:w-1 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 hover:[&::-webkit-scrollbar-track]:bg-transparent">
            {todos.map((items, index) => {
              return <ul key={index} className='flex items-center justify-between text-[13px] py-2 border-b border-gray-800 text-gray-800 '>
                <li className='w-[15px]'>{index + 1}</li>
                {items.editMode ? <input
                  type="text"
                  value={items.todo}
                  onChange={(e) => {
                    const updatedTodos = [...todos];
                    updatedTodos[index].todo = e.target.value;
                    settodos(updatedTodos);
                  }}
                  onKeyDown={
                    (e) => {
                      if (e.key === "Enter") {
                        handelEdit(index)
                      }
                    }
                  }
                  className="text-[13px] max-w-[130px] w-[130px] border border-gray-400 rounded-[3px] px-1"
                /> : <li className={`${items.Complete ? "line-through" : ""} max-w-[130px] w-[130px] overflow-hidden`}>{items.todo}</li>}


                {items.Complete ? <li><button value={items.Complete} onClick={() => handleDone(index)} className="heading text-[11px] px-1 rounded-[2px] p-0.5 border border-yellow-300 text-yellow-300  hover:bg-yellow-300 hover:text-white font-medium cursor-pointer">Redo</button></li> : <li><button value={items.Complete} onClick={() => handleDone(index)} className="heading text-[11px] px-1 rounded-[2px] p-0.5 border border-green-500 text-green-500  hover:bg-green-500 hover:text-white font-medium cursor-pointer">Done</button></li>}


                {items.editMode ? <li><button onClick={() => handelEdit(index)} className="heading text-[11px] px-1 rounded-[2px] p-0.5 border border-blue-500 text-blue-500 hover:bg-blue-400 hover:text-white font-medium cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth="2"
                    width="15" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </button></li> : <li><button onClick={(() => { handelEdit(index) })} className="heading text-[11px] px-1 rounded-[2px] p-0.5 border border-blue-500 text-blue-500  hover:bg-blue-400 hover:text-white font-medium cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth="1.5"
                  width="15" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg></button></li>}

                <li className='pr-1'><button onClick={() => handleDelete(index)} className="heading text-[11px] px-1 rounded-[2px] p-0.5 border border-red-400 text-red-400  hover:bg-red-400 hover:text-white font-medium cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth="2"
                  width="15" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M6 7h12M9 7V4h6v3M10 11v6M14 11v6M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12" />
                </svg></button></li>
              </ul>

            })}
          </div>}

        </div>
      </div>
    </div>
  )
}

export default Navbar
