import { useState } from "react";
import { Button } from "../../../shared/ui/button";
import { Input } from "../../../shared/ui/input";
import { ITask } from "../../../entities/task";

interface TaskFormProps {
  selectedDate: string;
  onAddTask: (task: ITask) => void;
}

export function TaskForm({ selectedDate, onAddTask }: TaskFormProps) {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = () => {
    if (!taskText.trim()) return;
    const newTask: ITask = {
      id: new Date().toISOString(),
      text: taskText,
      date: selectedDate,
      isCompleted: false,
    };
    onAddTask(newTask);
    setTaskText("");
  };

  return (
    <div className="flex w-full max-w-md space-x-2 justify-between">
        <Input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Новая задача"
        className="w-full"
        />
      <Button onClick={handleSubmit} className="bg-purple-700 hover:bg-purple-600 flex-shrink-0">
        Добавить
      </Button>
    </div>
  );
}
