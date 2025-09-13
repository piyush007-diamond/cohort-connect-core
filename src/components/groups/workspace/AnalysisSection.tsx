import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";

interface Workspace {
  id: string;
  name: string;
  description: string;
  avatar: string;
  progress: number;
  flowSteps: string[];
}

interface FlowStep {
  id: string;
  name: string;
  completed: boolean;
  tasks: string[];
  documents: string[];
}

interface AnalysisSectionProps {
  selectedWorkspace: Workspace | null;
}

export function AnalysisSection({ selectedWorkspace }: AnalysisSectionProps) {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  if (!selectedWorkspace) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <p className="text-sm">Select a workspace to view analysis</p>
        </div>
      </div>
    );
  }

  // Convert workspace flow steps to analysis format
  const flowSteps: FlowStep[] = selectedWorkspace.flowSteps.map((step, index) => ({
    id: (index + 1).toString(),
    name: step,
    completed: Math.random() > 0.5, // Random completion for demo
    tasks: [
      `Task 1 for ${step}`,
      `Task 2 for ${step}`,
      `Task 3 for ${step}`
    ],
    documents: index % 2 === 0 ? [`Document for ${step}.pdf`] : []
  }));

  const totalTasks = flowSteps.reduce((sum, step) => sum + step.tasks.length, 0);
  const completedTasks = flowSteps.filter(step => step.completed).reduce((sum, step) => sum + step.tasks.length, 0);
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleStepClick = (stepId: string) => {
    setSelectedStep(selectedStep === stepId ? null : stepId);
  };

  return (
    <div className="analysis-container p-6 h-full flex flex-col">
      {/* Top Metrics */}
      <div className="analysis-metrics grid grid-cols-3 gap-4 mb-6">
        <div className={`metric-box rounded-xl p-4 text-center transition-all duration-200 ${
          completionPercentage >= 80 ? 'completed' : 'pending'
        }`}>
          <div className="metric-number text-2xl font-bold text-gray-900 mb-2">
            {completionPercentage}%
          </div>
          <div className="metric-label text-xs text-gray-500 uppercase tracking-wider">
            Work Completed
          </div>
        </div>
        
        <div className="metric-box bg-green-50 border border-green-200 rounded-xl p-4 text-center transition-all duration-200">
          <div className="metric-number text-2xl font-bold text-green-700 mb-2">
            {completedTasks}
          </div>
          <div className="metric-label text-xs text-green-600 uppercase tracking-wider">
            Completed
          </div>
        </div>
        
        <div className="metric-box bg-amber-50 border border-amber-200 rounded-xl p-4 text-center transition-all duration-200">
          <div className="metric-number text-2xl font-bold text-amber-700 mb-2">
            {pendingTasks}
          </div>
          <div className="metric-label text-xs text-amber-600 uppercase tracking-wider">
            Pending
          </div>
        </div>
      </div>

      {/* Flow Diagram */}
      <div className="flow-diagram bg-gray-50 rounded-xl p-4 flex-1 overflow-hidden">
        <h4 className="section-header text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wider">
          Project Flow
        </h4>
        <div className="flow-steps flex flex-col gap-3 overflow-y-auto h-full pr-2">
          {flowSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                onClick={() => handleStepClick(step.id)}
                className={`flow-step bg-white border-2 rounded-lg p-4 w-full text-left cursor-pointer transition-all duration-300 relative ${
                  step.completed 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-blue-500 hover:shadow-md'
                }`}
              >
                <div className="step-name text-sm font-medium text-gray-900 mb-2">
                  {step.name}
                </div>
                <div className="step-status text-sm text-gray-500 mb-2">
                  {step.completed ? 'Completed' : 'In Progress'}
                </div>
                
                {step.completed && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}

                {/* Step Summary Popup */}
                {selectedStep === step.id && (
                  <div className="step-popup absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg p-4 shadow-lg z-10">
                    <div className="popup-header text-sm font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                      {step.name}
                    </div>
                    
                    <div className="popup-section mb-3">
                      <div className="popup-section-title text-xs text-gray-500 uppercase tracking-wider mb-2">
                        Tasks
                      </div>
                      <ul className="task-list">
                        {step.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="task-list-item text-sm text-gray-700 mb-1">
                            <div className="task-status-dot w-2 h-2 bg-gray-400 rounded-full mr-2 inline-block"></div>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {step.documents.length > 0 && (
                      <div className="popup-section">
                        <div className="popup-section-title text-xs text-gray-500 uppercase tracking-wider mb-2">
                          Documents
                        </div>
                        <div className="space-y-1">
                          {step.documents.map((doc, docIndex) => (
                            <a
                              key={docIndex}
                              href="#"
                              className="doc-link text-sm text-blue-600 hover:text-blue-800 block truncate"
                            >
                              {doc}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Connector Wire */}
              {index < flowSteps.length - 1 && (
                <div className="flow-connector w-6 h-0.5 bg-gray-300 relative mx-2">
                  <ChevronRight className="absolute -right-2 -top-2 w-4 h-4 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
