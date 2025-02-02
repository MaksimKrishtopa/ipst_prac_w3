import { useState } from "react";
import { useTaskActions } from "../../features/task/useTaskActions";
import { ITask } from "../../entities/task";
import { Check, Pencil, Trash } from "lucide-react";

export function HomePage() {
  const { tasks, selectedDate, setSelectedDate, handleAddTask, handleRemoveTask, handleEditTask, handleToggleTaskCompletion } = useTaskActions();
  const [taskText, setTaskText] = useState("");

  const handleSubmit = () => {
    if (!taskText.trim()) return;
    const newTask: ITask = {
      id: new Date().toISOString(),
      text: taskText,
      date: selectedDate,
      isCompleted: false,
    };
    handleAddTask(newTask);
    setTaskText("");
  };

  return (
    <div className="p-6 bg-purple-100 rounded-lg shadow-lg max-w-2xl mx-auto mt-10 border border-purple-300">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">ToDo App</h1>

      <div className="flex flex-col items-center space-y-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full max-w-xs"
        />

        <div className="flex w-full max-w-md space-x-2">
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Новая задача"
            className="p-2 border border-gray-300 rounded flex-1"
          />
          <button
            onClick={handleSubmit}
            className="p-2 bg-purple-700 text-white rounded hover:bg-purple-600 flex-shrink-0"
          >
            Добавить
          </button>
        </div>
      </div>

      <ul className="space-y-4 mt-6">
        {(tasks[selectedDate] || []).map((task) => (
          <li key={task.id} className="p-4 border border-gray-400 rounded bg-transparent flex flex-col">
          <span
            className={`text-lg ${task.isCompleted ? "line-through text-gray-500" : "text-gray-800"}`}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              wordWrap: "break-word",
            }}
          >
            {task.text}
          </span>
          <span className="text-xs text-gray-500 mt-1">Дата создания: {task.id.split("T")[0]}</span>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={() => handleToggleTaskCompletion(task.id)}
              className="p-2 flex-1 bg-green-500 text-white rounded hover:bg-green-700 flex justify-center"
            >
              <Check size={18} />
            </button>
            <button
              onClick={() => handleEditTask(task.id, prompt("Измените задачу:", task.text) || task.text)}
              className="p-2 flex-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 flex justify-center"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => handleRemoveTask(task.id)}
              className="p-2 flex-1 bg-red-500 text-white rounded hover:bg-red-700 flex justify-center"
            >
              <Trash size={18} />
            </button>
          </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
