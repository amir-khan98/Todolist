import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])



  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }



  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }


  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }


  const handleChange = (e) => {

    setTodo(e.target.value)
  }


  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="md:container mx-3 md:mx-auto my-4 rounded-2xl p-4 bg-white min-h-[90vh] md:w-1/2 border border-purple-900">
        <h1 className='font-bold text-center text-xl'>iTask - Manage Your Todos at One Place</h1>
        <div className="addtodo m-4">
          <h2 className='text-xl font-bold '>Add Todo</h2>
          <input onChange={handleChange} value={todo} className='rounded-full py-3 w-[350px] my-3 outline-none border border-purple-900' type="text" />
          <button onClick={handleAdd} disabled={todo.length <= 3}

            className='bg-purple-600 p-3 px-6 mx-3 my-3 rounded-full text-black hover:bg-purple-500 font-bold cursor-pointer'>Save</button>
        </div>
        <input className='accent-purple-600' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <div className="yourtodo">
          <h2 className='text-xl font-bold'>Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className='m-4'>No Todos to display</div>}
            {todos.map(item => {

              return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:justify-between my-3">
                <div className='flex gap-3'>
                  <input className='accent-purple-600' name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>

                <div className="button flex justify-end h-full">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-purple-600 p-2 py-1 mx-1 rounded-2xl text-black hover:bg-purple-500 font-bold'><CiEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-purple-600 p-2 py-1 mx-1 rounded-2xl text-black hover:bg-purple-500 font-bold'><MdDeleteOutline /></button>
                </div>
              </div>
            })}
            <div className="h-[1px] w-full bg-purple-300 my-2"></div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
