import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Task {
  name: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  step: string;
}

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (task: Task) => void;
  availableSteps?: string[];
}

const mockMembers = [
  "Sarah Johnson",
  "Alex Chen", 
  "Mike Brown",
  "Emily Davis",
  "David Wilson"
];

export function AddTaskModal({ open, onOpenChange, onAddTask, availableSteps = [] }: AddTaskModalProps) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [step, setStep] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim() || !assignedTo || !dueDate || !step) return;

    setIsLoading(true);
    
    const newTask: Task = {
      name: taskName,
      description,
      assignedTo,
      dueDate,
      step
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onAddTask(newTask);
    
    // Reset form
    setTaskName("");
    setDescription("");
    setAssignedTo("");
    setDueDate("");
    setStep("");
    setIsLoading(false);
    onOpenChange(false);
  };

  const handleClose = () => {
    if (!isLoading) {
      setTaskName("");
      setDescription("");
      setAssignedTo("");
      setDueDate("");
      setStep("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Add New Task
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task-name" className="text-sm font-medium text-gray-700">
              Task Name *
            </Label>
            <Input
              id="task-name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
              className="w-full"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the task details..."
              className="w-full min-h-[80px] resize-none"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assigned-to" className="text-sm font-medium text-gray-700">
                Assign to *
              </Label>
              <Select value={assignedTo} onValueChange={setAssignedTo} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select member" />
                </SelectTrigger>
                <SelectContent>
                  {mockMembers.map((member) => (
                    <SelectItem key={member} value={member}>
                      {member}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="due-date" className="text-sm font-medium text-gray-700">
                Due Date *
              </Label>
              <Input
                id="due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="step" className="text-sm font-medium text-gray-700">
              Assign to Step *
            </Label>
            <Select value={step} onValueChange={setStep} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select project step" />
              </SelectTrigger>
              <SelectContent>
                {availableSteps.length > 0 ? (
                  availableSteps.map((stepName) => (
                    <SelectItem key={stepName} value={stepName}>
                      {stepName}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="default" disabled>
                    No steps available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 py-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!taskName.trim() || !assignedTo || !dueDate || !step || isLoading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
