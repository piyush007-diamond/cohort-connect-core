import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { AddTaskModal } from "../../modals/AddTaskModal";

interface Workspace {
  id: string;
  name: string;
  description: string;
  avatar: string;
  progress: number;
  flowSteps: string[];
}

interface Task {
  id: string;
  name: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  step: string;
  completed: boolean;
}

interface TasksSectionProps {
  selectedWorkspace: Workspace | null;
}

export function TasksSection({ selectedWorkspace }: TasksSectionProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      name: "Design user interface",
      description: "Create wireframes and mockups for the main dashboard",
      assignedTo: "Sarah Johnson",
      dueDate: "2024-01-15",
      step: "Phase 1: Research",
      completed: false
    },
    {
      id: "2",
      name: "Implement authentication",
      description: "Set up user login and registration system",
      assignedTo: "Alex Chen",
      dueDate: "2024-01-20",
      step: "Phase 2: Development",
      completed: true
    },
    {
      id: "3",
      name: "Write API documentation",
      description: "Document all endpoints and their usage",
      assignedTo: "Mike Brown",
      dueDate: "2024-01-25",
      step: "Phase 3: Documentation",
      completed: true
    },
    {
      id: "4",
      name: "Conduct user testing",
      description: "Test the application with real users",
      assignedTo: "Sarah Johnson",
      dueDate: "2024-01-30",
      step: "Phase 4: Testing",
      completed: false
    },
    {
      id: "5",
      name: "Deploy to production",
      description: "Set up production environment and deploy the application",
      assignedTo: "Alex Chen",
      dueDate: "2024-02-05",
      step: "Phase 5: Deployment",
      completed: true
    }
  ]);

  const [openAddTask, setOpenAddTask] = useState(false);

  const todoTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const handleTaskToggle = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const handleAddTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      completed: false
    };
    setTasks(prev => [...prev, task]);
  };

  if (!selectedWorkspace) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <p className="text-sm">Select a workspace to view tasks</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tasks-container p-6 h-full flex flex-col">
      {/* Header */}
      <div className="tasks-header flex justify-between items-center mb-6">
        <h3 className="section-title text-lg font-semibold text-gray-900">Tasks</h3>
        <Button
          onClick={() => setOpenAddTask(true)}
          className="add-task-btn w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Task Sections */}
      <div className="tasks-sections flex flex-col gap-6 flex-1 overflow-hidden">
        {/* To-Do Section */}
        <div className="task-section flex-1 overflow-hidden">
          <h4 className="section-header text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wider">
            To-Do ({todoTasks.length})
          </h4>
          <div className="tasks-list space-y-3 overflow-y-auto h-full pr-2">
            {todoTasks.map((task) => (
              <div
                key={task.id}
                className="task-item bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-500 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                onClick={() => handleTaskToggle(task.id)}
              >
                <div className="flex items-start">
                  <div className="task-checkbox w-5 h-5 border-2 border-gray-300 rounded mt-0.5 mr-4 flex-shrink-0 hover:border-blue-500 transition-colors"></div>
                  <div className="flex-1 min-w-0">
                    <div className="task-text text-sm font-medium text-gray-900 mb-2">
                      {task.name}
                    </div>
                    <div className="task-description text-sm text-gray-600 mb-3 leading-relaxed">
                      {task.description}
                    </div>
                    <div className="task-meta flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <span className="flex items-center">
                        <span className="font-medium">Assigned to:</span>
                        <span className="ml-1">{task.assignedTo}</span>
                      </span>
                      <span className="flex items-center">
                        <span className="font-medium">Due:</span>
                        <span className="ml-1">{task.dueDate}</span>
                      </span>
                    </div>
                    <div className="task-step text-sm text-blue-600 font-medium">
                      {task.step}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {todoTasks.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No tasks to do</p>
              </div>
            )}
          </div>
        </div>

        {/* Completed Section */}
        <div className="task-section flex-1 overflow-hidden">
          <h4 className="section-header text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wider">
            Completed ({completedTasks.length})
          </h4>
          <div className="tasks-list space-y-3 overflow-y-auto h-full pr-2">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="task-item bg-white rounded-lg p-4 border border-gray-200 opacity-75"
              >
                <div className="flex items-start">
                  <div className="task-checkbox w-5 h-5 bg-green-500 border-2 border-green-500 rounded mt-0.5 mr-4 flex-shrink-0 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="task-text text-sm font-medium text-gray-900 mb-2 line-through">
                      {task.name}
                    </div>
                    <div className="task-description text-sm text-gray-600 mb-3 leading-relaxed">
                      {task.description}
                    </div>
                    <div className="task-meta flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <span className="flex items-center">
                        <span className="font-medium">Assigned to:</span>
                        <span className="ml-1">{task.assignedTo}</span>
                      </span>
                      <span className="flex items-center">
                        <span className="font-medium">Due:</span>
                        <span className="ml-1">{task.dueDate}</span>
                      </span>
                    </div>
                    <div className="task-step text-sm text-green-600 font-medium">
                      {task.step}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {completedTasks.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No completed tasks</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AddTaskModal 
        open={openAddTask} 
        onOpenChange={setOpenAddTask}
        onAddTask={handleAddTask}
        availableSteps={selectedWorkspace.flowSteps}
      />
    </div>
  );
}
