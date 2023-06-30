import React from "react";
// import "./App.css";
const todo = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");

  const [isCompleted, setCompleted] = React.useState(false);
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);
  React.useEffect(() => {
    if (todos.length > 0) {
      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
    }
  }, [todos]);
  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0) {
      setTodos([...todos].concat(newTodo));
      setTodo("");
    } else {
      alert("Enter Valid Task");
      setTodo("");
    }
  }
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  const handleClick = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="h-100 w-full flex items-center justify-center bg-gradient-to-r from-slate-100 to-green-100 min-h-screen font-sans">
      <div
        className="bg-gradient-to-r from-slate-100 to-amber-100 rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg"
        id="todo-list"
      >
        <h1 className="text-center p-2 text-xl font-mono">Todo List</h1>
        <form
          className="bordor bordor-1 border-x-orange-950 px-[10px]  flex justify-between mb-[30px]"
          onSubmit={handleSubmit}
        >
          <input
            className="shadow appearance-none border rounded w-[320px] py-2 px-3 mr-4 text-grey-darker font-mono"
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <button
            className="flex-no-shrink p-2 border-2 rounded text-cyan-400 border-cyan-400 hover:text-black hover:bg-cyan-400"
            type="submit"
          >
            Add Todo
          </button>
        </form>
        <hr className=" p-2" />
        <div className="text-center">
          <input
            type="text"
            placeholder="Search todos"
            value={searchTerm}
            onChange={handleSearch}
            className="mb-4 px-2 py-1 border border-gray-300 rounded "
          />
        </div>

        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className="todo bordor bordor-1 border-x-orange-950 px-[10px] mb-[10px] flex flex-col"
          >
            <div className="flex mb-4 items-center">
              <input
                type="checkbox"
                className=""
                id="completed"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              {todo.id === todoEditing ? (
                <input
                  type="text"
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <div
                  className={`w-full text-grey-darkest px-3 font-mono text-sm ${
                    isCompleted ? "line-through text-gray-300" : ""
                  }`}
                >
                  {todo.text}
                </div>
              )}
            </div>
            <div className="todo-actions flex justify-between">
              {todo.id === todoEditing ? (
                <button
                  className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-black text-yellow-300 border-yellow-300 hover:bg-yellow-300"
                  onClick={() => submitEdits(todo.id)}
                >
                  Submit Edits
                </button>
              ) : (
                <button
                  className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-400 border-red-400 hover:text-white hover:bg-red-400"
                  onClick={() => setTodoEditing(todo.id)}
                >
                  Edit
                </button>
              )}
              <button
                className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-black text-green-400 border-green-400 hover:bg-green-500"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
              <button
                className="flex-no-shrink p-2 ml-4  border-2 rounded hover:text-black text-green-400 border-green-400 hover:bg-green-500
                    "
                onClick={handleClick}
              >
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default todo;
