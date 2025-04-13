import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Controller from "../components/common/Controller";

function ToDoApp() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [isSelectAll, setIsSelectAll] = useState(true);

  useEffect(() => {
    //saving every time tasks updates
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks.map((task) => ({ ...task, checked: false })))
    );
  }, [tasks]);

  function handleInputChange(e) {
    setTaskText(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (taskText.trim() !== "") {
      setTasks([...tasks, { text: taskText, id: uuidv4(), selected: false }]);
      setTaskText("");
    }
  }

  function selectAll() {
    setTasks(tasks.map((task) => ({ ...task, checked: isSelectAll })));
    setIsSelectAll(!isSelectAll);
  }

  function copySelected() {
    const selectedTasks = tasks
      .filter((task) => task.checked)
      .map((task) => task.text)
      .join("\n");

    copyTask(selectedTasks);
  }

  function deleteSelected() {
    setTasks(tasks.filter((task) => !task.checked));
  }

  const selectTask = (checked, taskId) => {
    setTasks(
      tasks.map((task) =>
        taskId === task.id ? { ...task, checked: checked } : task
      )
    );
  };

  const copyTask = (text) => {
    navigator.clipboard.writeText(text);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <>
      <form
        name="submittask"
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 min-w-full"
      >
        <input
          type="text"
          id="task"
          placeholder="Task"
          className="border-2 border-sky-500 rounded-md"
          value={taskText}
          onChange={handleInputChange}
        />
        <input
          type="submit"
          id="addtask"
          className="border-2 border-sky-500 rounded-md"
        />
      </form>
      <div className="flex flex-row gap-1">
        <button onClick={selectAll}>
          {isSelectAll ? "Select All" : "Unselect All"}
        </button>
        <button onClick={copySelected}>Copy</button>
        <button onClick={deleteSelected}>Delete</button>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <Controller
            key={task.id}
            task={task}
            copyTask={copyTask}
            deleteTask={deleteTask}
            selectTask={selectTask}
          />
        ))}
      </div>
    </>
  );
}

export default ToDoApp;