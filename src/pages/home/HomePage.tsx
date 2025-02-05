import { useTaskActions } from "../../entities/task/hooks/useTaskActions";
import { Input } from "../../shared/ui/input";
import { TaskForm } from "../../features/task/task-form";
import { TaskList } from "../../features/task/task-list";
import { formatDate } from "../../shared/utils/format-date";

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


  return (
    <div className="p-6 bg-purple-100 rounded-lg shadow-lg max-w-2xl mx-auto mt-10 border border-purple-300">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">ToDo App</h1>
      <div className="flex flex-col items-center space-y-4">
        <Input 
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full max-w-xs"
        />
        <TaskForm selectedDate={selectedDate} onAddTask={handleAddTask} />
      </div>

      <TaskList 
        tasks={tasks[selectedDate] || []} 
        onToggleComplete={handleToggleTaskCompletion} 
        onEdit={handleEditTask} 
        onRemove={handleRemoveTask} 
        formatDate={formatDate}
      />
    </div>
  );
}

export default HomePage;