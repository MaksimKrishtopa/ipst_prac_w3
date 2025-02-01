import { useState } from "react";
import { useTaskActions } from "../../features/task/useTaskActions";
import { ITask } from "../../entities/task";

export function HomePage() {
  const { tasks, handleAddTask, handleRemoveTask, handleEditTask, handleToggleTaskCompletion } = useTaskActions();
  const [taskText, setTaskText] = useState("");

  const handleSubmit = () => {
    const newTask: ITask = {
      id: new Date().toISOString(),
      text: taskText,
      date: new Date().toISOString().split("T")[0],
      isCompleted: false,
    };
    handleAddTask(newTask);
    setTaskText("");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Todo App</h1>
      <div className="mb-4">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Новая задача"
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <button
          onClick={handleSubmit}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Добавить задачу
        </button>
      </div>
      
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center space-x-2">
            <span className={task.isCompleted ? "line-through" : ""}>
              {task.text}
            </span>
            <button
              onClick={() => handleToggleTaskCompletion(task.id)}
              className="p-1 bg-green-500 text-white rounded hover:bg-green-700"
            >
              {task.isCompleted ? "Отменить выполнение" : "Пометить как выполненную"}
            </button>
            <button
              onClick={() => handleEditTask(task.id, prompt("Измените задачу:") || task.text)}
              className="p-1 bg-yellow-500 text-white rounded hover:bg-yellow-700"
            >
              Редактировать
            </button>
            <button
              onClick={() => handleRemoveTask(task.id)}
              className="p-1 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
