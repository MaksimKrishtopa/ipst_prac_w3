import { useState } from "react";
import { useTaskActions } from "../../entities/task/hooks/useTaskActions";
import { ITask } from "../../entities/task";
import { Check, Pencil, Trash } from "lucide-react";
import { Button } from "../../shared/ui/button";
import { Input } from "../../shared/ui/input";

export function HomePage() {
  const { 
    tasks, 
    selectedDate, 
    setSelectedDate, 
    handleAddTask, 
    handleRemoveTask, 
    handleEditTask, 
    handleToggleTaskCompletion 
  } = useTaskActions();

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
        <Input 
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full max-w-xs"
        />

        <div className="flex w-full max-w-md space-x-2">
          <Input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Новая задача"
            className="p-2 border border-gray-300 rounded flex-1"
          />
          <Button onClick={handleSubmit} className="bg-purple-700 hover:bg-purple-600 flex-shrink-0">
            Добавить
          </Button>
        </div>
      </div>

      <ul className="space-y-4 mt-6">
        {(tasks[selectedDate] || []).map((task) => (
          <li key={task.id} className="p-4 border border-gray-300 rounded bg-transparent flex flex-col">
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
            <span className="text-xs text-gray-500 mt-1">{task.id.split("T")[0]}</span>
            <div className="flex space-x-2 mt-2">
              <Button onClick={() => handleToggleTaskCompletion(task.id)} className="bg-purple-500 hover:bg-purple-600 flex-1 flex justify-center">
                <Check size={22} />
              </Button>
              <Button onClick={() => handleEditTask(task.id, prompt("Измените задачу:", task.text) || task.text)} className="bg-purple-400 hover:bg-purple-500 flex-1 flex justify-center">
                <Pencil size={22} />
              </Button>
              <Button onClick={() => handleRemoveTask(task.id)} className="bg-purple-300 hover:bg-purple-400 flex-1 flex justify-center">
                <Trash size={22} />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
