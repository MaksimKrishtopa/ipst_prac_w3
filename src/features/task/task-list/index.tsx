import { ITask } from "../../../entities/task";
import { Check, Pencil, Trash } from "lucide-react";
import { Button } from "../../../shared/ui/button";

interface TaskListProps {
  tasks: ITask[];
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onRemove: (id: string) => void;
  formatDate: (date: string) => string;
}

export function TaskList({ tasks, onToggleComplete, onEdit, onRemove, formatDate }: TaskListProps) {
  return (
    <ul className="space-y-4 mt-6">
      {tasks.map((task) => (
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
          <span className="text-xs text-gray-500 mt-1">
            {formatDate(task.id.split("T")[0])}
          </span>
          <div className="flex space-x-2 mt-2">
            <Button onClick={() => onToggleComplete(task.id)} className="bg-purple-500 hover:bg-purple-600 flex-1 flex justify-center">
              <Check size={22} />
            </Button>
            <Button onClick={() => onEdit(task.id, prompt("Измените задачу:", task.text) || task.text)} className="bg-purple-400 hover:bg-purple-500 flex-1 flex justify-center">
              <Pencil size={22} />
            </Button>
            <Button onClick={() => onRemove(task.id)} className="bg-purple-300 hover:bg-purple-400 flex-1 flex justify-center">
              <Trash size={22} />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
