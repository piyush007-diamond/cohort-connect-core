
<group section> 
CampusConnect: Group & Workspace Complete Implementation Guide
Project Overview
Build a seamless group collaboration platform that combines social networking with project management, maintaining the established clean, minimalistic design language while enabling powerful team collaboration features.
Design Philosophy & Continuity
Visual Consistency: Maintain exact color palette, typography, and interaction patterns from existing home/friends sections
Contextual Flow: Group chat naturally extends into workspace functionality without jarring transitions
Academic Focus: Professional yet approachable interface suitable for educational collaboration
Micro-Interactions: Subtle animations that enhance usability without distraction
Color Palette (Maintained from Current Design)
css
/* Primary Colors */
--primary-blue: #2563EB;
--secondary-blue: #3B82F6;
--accent-green: #10B981;
--background-white: #FFFFFF;
--light-gray: #F8FAFC;
--border-gray: #E2E8F0;
--text-gray: #64748B;
--dark-gray: #1E293B;
--faded-text: #94A3B8;

/* Status Colors */
--success-green: #10B981;
--warning-amber: #F59E0B;
--error-red: #EF4444;
--info-blue: #3B82F6;
Typography Scale (Consistent with Current)
css
/* Font Hierarchy */
.logo-brand { font-size: 24px; font-weight: 700; }
.page-headers { font-size: 20px; font-weight: 600; }
.section-titles { font-size: 16px; font-weight: 600; }
.user-names { font-size: 14px; font-weight: 600; }
.body-text { font-size: 14px; font-weight: 400; }
.secondary-info { font-size: 12px; font-weight: 400; }
.faded-text { font-size: 12px; font-weight: 400; color: #94A3B8; }

SECTION 1: GROUP INTERFACE IMPLEMENTATION
Top Section Layout
Positioning: Identical to home section - maintains header, navigation, and search bar
Navigation State: "Groups" tab active with blue background (#2563EB) and white text
Consistency: Exact same spacing, shadows, and layout as established pattern
Left Sidebar - Group Management (280px width)
Action Buttons Section
css
.group-action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  padding: 0 16px;
}

.action-button {
  width: 248px;
  height: 44px;
  background: linear-gradient(145deg, #2563EB, #3B82F6);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* 3D Shine Hover Effect */
.action-button::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.action-button:hover::before {
  transform: translateX(100%);
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
}
Button Layout:
Create Group - Top button with "+" icon
Explore Groups - Below create, with "🔍" icon
Group Separator Design
css
.group-separator {
  display: flex;
  align-items: center;
  margin: 24px 16px 16px;
  color: #64748B;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.group-separator::before,
.group-separator::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #E2E8F0;
}

.group-separator::before {
  margin-right: 12px;
}

.group-separator::after {
  margin-left: 12px;
}
Groups List Interface
css
.groups-container {
  max-height: calc(100vh - 400px);
  overflow-y: auto;
  padding: 0 16px;
}

.group-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.group-item:hover {
  border-color: #3B82F6;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
  transform: translateY(-1px);
}

.group-avatar {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(145deg, #3B82F6, #2563EB);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
  margin-right: 12px;
}

.group-info {
  flex: 1;
  min-width: 0;
}

.group-name {
  font-size: 14px;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.group-preview {
  font-size: 12px;
  color: #64748B;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.unread-badge {
  width: 20px;
  height: 20px;
  background: #EF4444;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 11px;
  font-weight: 600;
}
Main Content Area - Group Chat Interface
Chat Header (Stationary)
css
.chat-header {
  height: 60px;
  background: white;
  border-bottom: 1px solid #E2E8F0;
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.group-chat-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.group-chat-avatar {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(145deg, #3B82F6, #2563EB);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 12px;
  margin-right: 12px;
}

.group-chat-name {
  font-size: 16px;
  font-weight: 600;
  color: #1E293B;
}
Mode Toggle Buttons (Group/Workspace)
css
.mode-toggle-container {
  display: flex;
  background: #F8FAFC;
  border-radius: 8px;
  padding: 4px;
  position: absolute;
  top: 16px;
  right: 20px;
}

.mode-toggle-button {
  padding: 8px 16px;
  background: transparent;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mode-toggle-button.active {
  background: white;
  color: #2563EB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.mode-toggle-button:hover:not(.active) {
  color: #1E293B;
  background: rgba(255, 255, 255, 0.5);
}
Chat Messages Area
css
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #FFFFFF;
}

.message-item {
  display: flex;
  margin-bottom: 16px;
  animation: messageSlideIn 0.3s ease-out;
}

@keyframes messageSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
}

.message-content {
  flex: 1;
}

.message-header {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.sender-name {
  font-size: 13px;
  font-weight: 600;
  color: #1E293B;
  margin-right: 8px;
}

.message-time {
  font-size: 11px;
  color: #94A3B8;
}

.message-text {
  font-size: 14px;
  color: #1E293B;
  line-height: 1.4;
}
Message Input Area
css
.message-input-container {
  padding: 16px 20px;
  background: white;
  border-top: 1px solid #E2E8F0;
}

.message-input-wrapper {
  display: flex;
  align-items: center;
  background: #F8FAFC;
  border-radius: 24px;
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  transition: all 0.2s ease;
}

.message-input-wrapper:focus-within {
  border-color: #3B82F6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.message-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #1E293B;
  outline: none;
  resize: none;
  max-height: 100px;
}

.message-input::placeholder {
  color: #94A3B8;
}

.media-buttons {
  display: flex;
  gap: 8px;
  margin-left: 12px;
}

.media-button {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #64748B;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.media-button:hover {
  background: #E2E8F0;
  color: #2563EB;
  transform: scale(1.1);
}

SECTION 2: WORKSPACE INTERFACE IMPLEMENTATION
Workspace Mode Activation
When user clicks "Workspace" toggle, the interface transforms smoothly:
css
.workspace-transition {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.workspace-active .chat-messages {
  opacity: 0;
  transform: translateX(-20px);
}

.workspace-content {
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}

.workspace-active .workspace-content {
  opacity: 1;
  transform: translateX(0);
}
Left Sidebar - Workspace Actions
Workspace Action Buttons
css
.workspace-actions {
  padding: 0 16px;
  margin-bottom: 24px;
}

.workspace-action-button {
  width: 248px;
  height: 44px;
  background: linear-gradient(145deg, #10B981, #059669);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-bottom: 12px;
}

/* Same 3D shine effect as group buttons */
.workspace-action-button::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.workspace-action-button:hover::before {
  transform: translateX(100%);
}

.workspace-action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}
Buttons:
Add Workspace - Create new workspace
Explore Workspace - Discover existing workspaces
Main Workspace Interface
Feature Navigation (Top Right Corner)
css
.feature-navigation {
  position: absolute;
  top: 16px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 5;
}

.feature-nav-button {
  padding: 8px 12px;
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.feature-nav-button.active {
  background: #2563EB;
  color: white;
  border-color: #2563EB;
  transform: scale(1.05);
}

.feature-nav-button:hover:not(.active) {
  border-color: #3B82F6;
  color: #2563EB;
  transform: translateX(-2px);
}
Chat Section (Default View - 60% height)
Maintains exact same styling as group chat but with workspace context:
css
.workspace-chat {
  height: 60%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
  overflow: hidden;
}
Feature Content Area (40% height)
css
.feature-content {
  height: 40%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}
Feature Sections
1. TASKS SECTION (Default Active)
Layout Structure
css
.tasks-container {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tasks-header {
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #1E293B;
}

.add-task-btn {
  width: 36px;
  height: 36px;
  background: #2563EB;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-task-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
}
Task Columns
css
.tasks-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  flex: 1;
}

.task-column {
  background: #F8FAFC;
  border-radius: 12px;
  padding: 16px;
}

.column-header {
  font-size: 14px;
  font-weight: 600;
  color: #64748B;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
Task Items
css
.task-item {
  background: white;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid #E2E8F0;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.task-item:hover {
  border-color: #3B82F6;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.task-checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid #E2E8F0;
  border-radius: 4px;
  margin-right: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.task-checkbox:hover {
  border-color: #3B82F6;
}

.task-checkbox.checked {
  background: #10B981;
  border-color: #10B981;
}

.task-checkbox.checked::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 12px;
  font-weight: bold;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.task-text {
  font-size: 14px;
  color: #1E293B;
  flex: 1;
}

.task-item.completed .task-text {
  text-decoration: line-through;
  color: #94A3B8;
}

/* Task Movement Animation */
.task-move-animation {
  animation: taskMove 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes taskMove {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  50% {
    opacity: 0;
    transform: translateX(-100px);
  }
  51% {
    transform: translateX(100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
Add Task Modal
css
.task-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.task-modal-content {
  background: white;
  border-radius: 16px;
  padding: 24px;
  width: 480px;
  max-width: 90vw;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
  font-size: 18px;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  min-height: 80px;
  resize: vertical;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23666' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.btn-secondary {
  padding: 10px 20px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  padding: 10px 20px;
  background: #2563EB;
  border: 1px solid #2563EB;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #1D4ED8;
  transform: translateY(-1px);
}
2. DOCS SECTION
Layout Structure
css
.docs-container {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.docs-header {
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 16px;
}

.submit-work-btn {
  background: #10B981;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-work-btn:hover {
  background: #059669;
  transform: translateY(-1px);
}
Filter Tags
css
.filter-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filter-tag {
  padding: 6px 12px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  font-size: 12px;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-tag.active {
  background: #2563EB;
  color: white;
  border-color: #2563EB;
}

.filter-tag:hover:not(.active) {
  border-color: #3B82F6;
  color: #2563EB;
}
Files Grid
css
.files-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  overflow-y: auto;
}

.file-item {
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.file-item:hover {
  border-color: #3B82F6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.file-icon {
  width: 32px;
  height: 32px;
  margin: 0 auto 8px;
  background: #3B82F6;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
}

.file-name {
  font-size: 11px;
  color: #1E293B;
  font-weight: 500;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-uploader {
  font-size: 10px;
  color: #94A3B8;
}
3. ANALYSIS SECTION
Metrics Boxes
css
.analysis-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.metric-box {
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  transition: all 0.2s ease;
}

.metric-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.metric-box.completed {
  background: linear-gradient(145deg, #D1FAE5, #A7F3D0);
  border-color: #10B981;
}

.metric-box.pending {
  background: linear-gradient(145deg, #FEF3C7, #FDE68A);
  border-color: #F59E0B;
}

.metric-number {
  font-size: 24px;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 4px;
}

.metric-label {
  font-size: 11px;
  color: #64748B;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
Flow Diagram
css
.flow-diagram {
  background: #F8FAFC;
  border-radius: 12px;
  padding: 16px;
  flex: 1;
  overflow-x: auto;
}

.flow-steps {
  display: flex;
  gap: 16px;
  align-items: center;
  min-width: max-content;
}

.flow-step {
  background: white;
  border: 2px solid #E2E8F0;
  border-radius: 8px;
  padding: 12px 16px;
  min-width: 120px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.flow-step:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.flow-step.completed {
  background: #10B981;
  border-color: #059669;
  color: white;
}

.flow-step.completed::after {
  content: '✓';
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  background: #059669;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  font-weight: bold;
}

.flow-connector {
  width: 24px;
  height: 2px;
  background: #E2E8F0;
  position: relative;
}

.flow-connector::after {
  content: '→';
  position: absolute;
  right: -8px;
  top: -8px;
  color: #94A3B8;
  font-size: 16px;
}

.step-name {
  font-size: 12px;
  font-weight: 500;
  color: #1E293B;
}

.flow-step.completed .step-name {
  color: white;
}
Step Summary Popup
css
.step-popup {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 16px;
  min-width: 280px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 100;
  margin-top: 8px;
  opacity: 0;
  transform: translateX(-50%) translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.step-popup.visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.popup-header {
  font-size: 14px;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 12px;
  border-bottom: 1px solid #E2E8F0;
  padding-bottom: 8px;
}

.popup-section {
  margin-bottom: 12px;
}

.popup-section-title {
  font-size: 11px;
  font-weight: 500;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-list-item {
  display: flex;
  align-items: center;
  padding: 4px 0;
  font-size: 12px;
}

.task-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 8px;
  background: #94A3B8;
}

.task-status-dot.completed {
  background: #10B981;
}

.doc-link {
  color: #2563EB;
  text-decoration: none;
  font-size: 12px;
  padding: 2px 0;
  display: block;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.doc-link:hover {
  background: #F0F7FF;
  padding-left: 4px;
}
Add Workspace Modal Implementation
Modal Structure
css
.workspace-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: 0;
  animation: modalFadeIn 0.3s ease-out forwards;
}

@keyframes modalFadeIn {
  to {
    opacity: 1;
  }
}

.workspace-modal-content {
  background: white;
  border-radius: 20px;
  width: 600px;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  transform: scale(0.95);
  animation: modalScaleIn 0.3s ease-out 0.1s forwards;
}

@keyframes modalScaleIn {
  to {
    transform: scale(1);
  }
}
Step-by-Step Wizard
css
.modal-header {
  background: linear-gradient(145deg, #2563EB, #3B82F6);
  color: white;
  padding: 24px;
  border-radius: 20px 20px 0 0;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}

.step-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
}

.step-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.step-dot.active {
  background: white;
  transform: scale(1.25);
}

.step-dot.completed {
  background: #10B981;
}

.modal-body {
  padding: 24px;
}

.step-content {
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.step-content.active {
  opacity: 1;
  transform: translateX(0);
}

.step-title {
  font-size: 18px;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 8px;
}

.step-description {
  color: #64748B;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
}
Dynamic Flow Steps Input
css
.flow-steps-builder {
  background: #F8FAFC;
  border-radius: 12px;
  padding: 16px;
}

.flow-step-input-container {
  margin-bottom: 12px;
  position: relative;
}

.flow-step-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.flow-step-input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.add-step-btn {
  width: 100%;
  padding: 10px;
  background: transparent;
  border: 2px dashed #E2E8F0;
  border-radius: 8px;
  color: #64748B;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-step-btn:hover {
  border-color: #3B82F6;
  color: #3B82F6;
  background: #F0F7FF;
}

.step-item {
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  animation: stepSlideIn 0.3s ease-out;
}

@keyframes stepSlideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.step-number {
  width: 24px;
  height: 24px;
  background: #3B82F6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  margin-right: 12px;
  flex-shrink: 0;
}

.step-text {
  flex: 1;
  font-size: 14px;
  color: #1E293B;
}

.remove-step-btn {
  width: 24px;
  height: 24px;
  background: #FEE2E2;
  color: #EF4444;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.remove-step-btn:hover {
  background: #FEE2E2;
  transform: scale(1.1);
}
Member Selection Interface
css
.member-selection {
  max-height: 300px;
  overflow-y: auto;
}

.member-search {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
  transition: all 0.2s ease;
}

.member-search:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.member-list {
  display: grid;
  gap: 8px;
}

.member-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.member-item:hover {
  border-color: #3B82F6;
  background: #F0F7FF;
}

.member-item.selected {
  background: #EBF8FF;
  border-color: #2563EB;
}

.member-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
  background: linear-gradient(145deg, #3B82F6, #2563EB);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 12px;
}

.member-info {
  flex: 1;
}

.member-name {
  font-size: 14px;
  font-weight: 500;
  color: #1E293B;
  margin-bottom: 2px;
}

.member-role {
  font-size: 12px;
  color: #64748B;
}

.member-checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid #E2E8F0;
  border-radius: 4px;
  position: relative;
  transition: all 0.2s ease;
}

.member-item.selected .member-checkbox {
  background: #2563EB;
  border-color: #2563EB;
}

.member-item.selected .member-checkbox::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 11px;
  font-weight: bold;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
Modal Navigation
css
.modal-footer {
  padding: 20px 24px;
  border-top: 1px solid #E2E8F0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-nav-btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.btn-back {
  background: transparent;
  color: #64748B;
  border-color: #E2E8F0;
}

.btn-back:hover {
  background: #F8FAFC;
  color: #1E293B;
}

.btn-next {
  background: #2563EB;
  color: white;
  border-color: #2563EB;
}

.btn-next:hover {
  background: #1D4ED8;
  transform: translateY(-1px);
}

.btn-create {
  background: #10B981;
  color: white;
  border-color: #10B981;
}

.btn-create:hover {
  background: #059669;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}
Responsive Design & Breakpoints
Desktop (1200px+)
css
@media (min-width: 1200px) {
  .main-layout {
    display: grid;
    grid-template-columns: 280px 1fr 280px;
    gap: 20px;
  }
  
  .feature-navigation {
    display: flex;
    flex-direction: column;
  }
}
Tablet (768px - 1199px)
css
@media (max-width: 1199px) and (min-width: 768px) {
  .main-layout {
    grid-template-columns: 280px 1fr;
  }
  
  .right-sidebar {
    display: none;
  }
  
  .feature-navigation {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin-bottom: 16px;
  }
}
Mobile (< 768px)
css
@media (max-width: 767px) {
  .main-layout {
    display: flex;
    flex-direction: column;
  }
  
  .left-sidebar {
    position: fixed;
    top: 112px;
    left: -280px;
    width: 280px;
    height: calc(100vh - 112px);
    background: white;
    border-right: 1px solid #E2E8F0;
    z-index: 100;
    transition: transform 0.3s ease;
  }
  
  .left-sidebar.open {
    transform: translateX(280px);
  }
  
  .mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  
  .mobile-overlay.visible {
    opacity: 1;
    pointer-events: all;
  }
  
  .tasks-columns {
    grid-template-columns: 1fr;
  }
  
  .analysis-metrics {
    grid-template-columns: 1fr;
  }
  
  .flow-steps {
    flex-direction: column;
    align-items: stretch;
  }
  
  .flow-connector {
    width: 2px;
    height: 20px;
    align-self: center;
  }
  
  .flow-connector::after {
    content: '↓';
    top: 2px;
    right: -8px;
  }
}
Animation & Interaction Details
Smooth Transitions
css
.smooth-transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.bounce-in {
  animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bounceIn {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.slide-up {
  animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
Loading States
css
.skeleton-loader {
  background: linear-gradient(
    90deg,
    #F8FAFC 25%,
    #E2E8F0 50%,
    #F8FAFC 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #E2E8F0;
  border-top: 2px solid #2563EB;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
Accessibility & Keyboard Navigation
Focus Management
css
.focus-visible {
  outline: 2px solid #2563EB;
  outline-offset: 2px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .task-item,
  .group-item,
  .file-item {
    border-width: 2px;
  }
  
  .btn-primary {
    border: 2px solid currentColor;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
Implementation Priority & User Flow
Phase 1: Core Group Functionality
Left sidebar with group list and action buttons
Group chat interface with real-time messaging
Mode toggle between Group and Workspace
Basic group creation and exploration
Phase 2: Workspace Foundation
Workspace creation modal with step-by-step wizard
Basic task management (Tasks section)
File sharing interface (Docs section)
Project flow visualization (Analysis section)
Phase 3: Advanced Features
Real-time collaboration indicators
Advanced file filtering and organization
Detailed progress analytics
Member role management
Notification system
Phase 4: Polish & Optimization
Advanced animations and micro-interactions
Comprehensive mobile optimization
Accessibility enhancements
Performance optimizations
Technical Implementation Notes
State Management Structure
javascript
// Recommended state structure
const groupState = {
  activeGroup: null,
  groupMode: 'chat', // 'chat' | 'workspace'
  groups: [],
  workspaces: [],
  activeWorkspace: null,
  currentView: 'chat', // 'chat' | 'tasks' | 'docs' | 'analysis'
  messages: [],
  tasks: { todo: [], completed: [] },
  documents: [],
  flowSteps: [],
  members: []
};
Key Interaction Handlers
javascript
// Mode switching with smooth transitions
const handleModeSwitch = (mode) => {
  setTransitioning(true);
  setTimeout(() => {
    setGroupMode(mode);
    setTransitioning(false);
  }, 200);
};

// Task completion with animation
const handleTaskComplete = (taskId) => {
  const task = tasks.todo.find(t => t.id === taskId);
  task.element.classList.add('task-move-animation');
  
  setTimeout(() => {
    updateTaskStatus(taskId, 'completed');
  }, 300);
};

// File upload with progress
const handleFileUpload = async (file, taskId) => {
  const progressElement = showProgress();
  try {
    await uploadFile(file, taskId, (progress) => {
      updateProgress(progressElement, progress);
    });
    refreshDocuments();
  } catch (error) {
    showError('Upload failed');
  } finally {
    hideProgress(progressElement);
  }
};
This comprehensive style guide ensures seamless integration with your existing CampusConnect platform while providing all the sophisticated group and workspace functionality you've outlined. The design maintains visual consistency, prioritizes user experience, and includes all the detailed features specified in your requirements.


CampusConnect: Group & Workspace Complete Implementation Guide
Project Overview
Build a seamless group collaboration platform that combines social networking with project management, maintaining the established clean, minimalistic design language while enabling powerful team collaboration features.
Design Philosophy & Continuity
Visual Consistency: Maintain exact color palette, typography, and interaction patterns from existing home/friends sections
Contextual Flow: Group chat naturally extends into workspace functionality without jarring transitions
Academic Focus: Professional yet approachable interface suitable for educational collaboration
Micro-Interactions: Subtle animations that enhance usability without distraction
Color Palette (Maintained from Current Design)
css
/* Primary Colors */
--primary-blue: #2563EB;
--secondary-blue: #3B82F6;
--accent-green: #10B981;
--background-white: #FFFFFF;
--light-gray: #F8FAFC;
--border-gray: #E2E8F0;
--text-gray: #64748B;
--dark-gray: #1E293B;
--faded-text: #94A3B8;

/* Status Colors */
--success-green: #10B981;
--warning-amber: #F59E0B;
--error-red: #EF4444;
--info-blue: #3B82F6;
Typography Scale (Consistent with Current)
css
/* Font Hierarchy */
.logo-brand { font-size: 24px; font-weight: 700; }
.page-headers { font-size: 20px; font-weight: 600; }
.section-titles { font-size: 16px; font-weight: 600; }
.user-names { font-size: 14px; font-weight: 600; }
.body-text { font-size: 14px; font-weight: 400; }
.secondary-info { font-size: 12px; font-weight: 400; }
.faded-text { font-size: 12px; font-weight: 400; color: #94A3B8; }

SECTION 1: GROUP INTERFACE IMPLEMENTATION
Top Section Layout
Positioning: Identical to home section - maintains header, navigation, and search bar
Navigation State: "Groups" tab active with blue background (#2563EB) and white text
Consistency: Exact same spacing, shadows, and layout as established pattern
Left Sidebar - Group Management (280px width)
Action Buttons Section
css
.group-action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  padding: 0 16px;
}

.action-button {
  width: 248px;
  height: 44px;
  background: linear-gradient(145deg, #2563EB, #3B82F6);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* 3D Shine Hover Effect */
.action-button::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.action-button:hover::before {
  transform: translateX(100%);
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
}
Button Layout:
Create Group - Top button with "+" icon
Explore Groups - Below create, with "🔍" icon
Group Separator Design
css
.group-separator {
  display: flex;
  align-items: center;
  margin: 24px 16px 16px;
  color: #64748B;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.group-separator::before,
.group-separator::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #E2E8F0;
}

.group-separator::before {
  margin-right: 12px;
}

.group-separator::after {
  margin-left: 12px;
}
Groups List Interface
css
.groups-container {
  max-height: calc(100vh - 400px);
  overflow-y: auto;
  padding: 0 16px;
}

.group-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.group-item:hover {
  border-color: #3B82F6;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
  transform: translateY(-1px);
}

.group-avatar {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(145deg, #3B82F6, #2563EB);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
  margin-right: 12px;
}

.group-info {
  flex: 1;
  min-width: 0;
}

.group-name {
  font-size: 14px;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.group-preview {
  font-size: 12px;
  color: #64748B;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.unread-badge {
  width: 20px;
  height: 20px;
  background: #EF4444;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 11px;
  font-weight: 600;
}
Main Content Area - Group Chat Interface
Chat Header (Stationary)
css
.chat-header {
  height: 60px;
  background: white;
  border-bottom: 1px solid #E2E8F0;
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.group-chat-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.group-chat-avatar {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(145deg, #3B82F6, #2563EB);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 12px;
  margin-right: 12px;
}

.group-chat-name {
  font-size: 16px;
  font-weight: 600;
  color: #1E293B;
}
Mode Toggle Buttons (Group/Workspace)
css
.mode-toggle-container {
  display: flex;
  background: #F8FAFC;
  border-radius: 8px;
  padding: 4px;
  position: absolute;
  top: 16px;
  right: 20px;
}

.mode-toggle-button {
  padding: 8px 16px;
  background: transparent;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mode-toggle-button.active {
  background: white;
  color: #2563EB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.mode-toggle-button:hover:not(.active) {
  color: #1E293B;
  background: rgba(255, 255, 255, 0.5);
}
Chat Messages Area
css
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #FFFFFF;
}

.message-item {
  display: flex;
  margin-bottom: 16px;
  animation: messageSlideIn 0.3s ease-out;
}

@keyframes messageSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
}

.message-content {
  flex: 1;
}

.message-header {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.sender-name {
  font-size: 13px;
  font-weight: 600;
  color: #1E293B;
  margin-right: 8px;
}

.message-time {
  font-size: 11px;
  color: #94A3B8;
}

.message-text {
  font-size: 14px;
  color: #1E293B;
  line-height: 1.4;
}
Message Input Area
css
.message-input-container {
  padding: 16px 20px;
  background: white;
  border-top: 1px solid #E2E8F0;
}

.message-input-wrapper {
  display: flex;
  align-items: center;
  background: #F8FAFC;
  border-radius: 24px;
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  transition: all 0.2s ease;
}

.message-input-wrapper:focus-within {
  border-color: #3B82F6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.message-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #1E293B;
  outline: none;
  resize: none;
  max-height: 100px;
}

.message-input::placeholder {
  color: #94A3B8;
}

.media-buttons {
  display: flex;
  gap: 8px;
  margin-left: 12px;
}

.media-button {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #64748B;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.media-button:hover {
  background: #E2E8F0;
  color: #2563EB;
  transform: scale(1.1);
}

SECTION 2: WORKSPACE INTERFACE IMPLEMENTATION
Workspace Mode Activation
When user clicks "Workspace" toggle, the interface transforms smoothly:
css
.workspace-transition {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.workspace-active .chat-messages {
  opacity: 0;
  transform: translateX(-20px);
}

.workspace-content {
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}

.workspace-active .workspace-content {
  opacity: 1;
  transform: translateX(0);
}
Left Sidebar - Workspace Actions
Workspace Action Buttons
css
.workspace-actions {
  padding: 0 16px;
  margin-bottom: 24px;
}

.workspace-action-button {
  width: 248px;
  height: 44px;
  background: linear-gradient(145deg, #10B981, #059669);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-bottom: 12px;
}

/* Same 3D shine effect as group buttons */
.workspace-action-button::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.workspace-action-button:hover::before {
  transform: translateX(100%);
}

.workspace-action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}
Buttons:
Add Workspace - Create new workspace
Explore Workspace - Discover existing workspaces
Main Workspace Interface
Feature Navigation (Top Right Corner)
css
.feature-navigation {
  position: absolute;
  top: 16px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 5;
}

.feature-nav-button {
  padding: 8px 12px;
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.feature-nav-button.active {
  background: #2563EB;
  color: white;
  border-color: #2563EB;
  transform: scale(1.05);
}

.feature-nav-button:hover:not(.active) {
  border-color: #3B82F6;
  color: #2563EB;
  transform: translateX(-2px);
}
Chat Section (Default View - 60% height)
Maintains exact same styling as group chat but with workspace context:
css
.workspace-chat {
  height: 60%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
  overflow: hidden;
}
Feature Content Area (40% height)
css
.feature-content {
  height: 40%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}
Feature Sections
1. TASKS SECTION (Default Active)
Layout Structure
css
.tasks-container {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tasks-header {
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #1E293B;
}

.add-task-btn {
  width: 36px;
  height: 36px;
  background: #2563EB;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-task-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
}
Task Columns
css
.tasks-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  flex: 1;
}

.task-column {
  background: #F8FAFC;
  border-radius: 12px;
  padding: 16px;
}

.column-header {
  font-size: 14px;
  font-weight: 600;
  color: #64748B;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
Task Items
css
.task-item {
  background: white;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid #E2E8F0;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.task-item:hover {
  border-color: #3B82F6;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.task-checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid #E2E8F0;
  border-radius: 4px;
  margin-right: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.task-checkbox:hover {
  border-color: #3B82F6;
}

.task-checkbox.checked {
  background: #10B981;
  border-color: #10B981;
}

.task-checkbox.checked::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 12px;
  font-weight: bold;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.task-text {
  font-size: 14px;
  color: #1E293B;
  flex: 1;
}

.task-item.completed .task-text {
  text-decoration: line-through;
  color: #94A3B8;
}

/* Task Movement Animation */
.task-move-animation {
  animation: taskMove 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes taskMove {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  50% {
    opacity: 0;
    transform: translateX(-100px);
  }
  51% {
    transform: translateX(100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
Add Task Modal
css
.task-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.task-modal-content {
  background: white;
  border-radius: 16px;
  padding: 24px;
  width: 480px;
  max-width: 90vw;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
  font-size: 18px;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  min-height: 80px;
  resize: vertical;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23666' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.btn-secondary {
  padding: 10px 20px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  padding: 10px 20px;
  background: #2563EB;
  border: 1px solid #2563EB;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #1D4ED8;
  transform: translateY(-1px);
}
2. DOCS SECTION
Layout Structure
css
.docs-container {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.docs-header {
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 16px;
}

.submit-work-btn {
  background: #10B981;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-work-btn:hover {
  background: #059669;
  transform: translateY(-1px);
}
Filter Tags
css
.filter-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filter-tag {
  padding: 6px 12px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  font-size: 12px;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-tag.active {
  background: #2563EB;
  color: white;
  border-color: #2563EB;
}

.filter-tag:hover:not(.active) {
  border-color: #3B82F6;
  color: #2563EB;
}
Files Grid
css
.files-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  overflow-y: auto;
}

.file-item {
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.file-item:hover {
  border-color: #3B82F6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.file-icon {
  width: 32px;
  height: 32px;
  margin: 0 auto 8px;
  background: #3B82F6;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
}

.file-name {
  font-size: 11px;
  color: #1E293B;
  font-weight: 500;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-uploader {
  font-size: 10px;
  color: #94A3B8;
}
3. ANALYSIS SECTION
Metrics Boxes
css
.analysis-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.metric-box {
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  transition: all 0.2s ease;
}

.metric-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.metric-box.completed {
  background: linear-gradient(145deg, #D1FAE5, #A7F3D0);
  border-color: #10B981;
}

.metric-box.pending {
  background: linear-gradient(145deg, #FEF3C7, #FDE68A);
  border-color: #F59E0B;
}

.metric-number {
  font-size: 24px;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 4px;
}

.metric-label {
  font-size: 11px;
  color: #64748B;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
Flow Diagram
css
.flow-diagram {
  background: #F8FAFC;
  border-radius: 12px;
  padding: 16px;
  flex: 1;
  overflow-x: auto;
}

.flow-steps {
  display: flex;
  gap: 16px;
  align-items: center;
  min-width: max-content;
}

.flow-step {
  background: white;
  border: 2px solid #E2E8F0;
  border-radius: 8px;
  padding: 12px 16px;
  min-width: 120px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.flow-step:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.flow-step.completed {
  background: #10B981;
  border-color: #059669;
  color: white;
}

.flow-step.completed::after {
  content: '✓';
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  background: #059669;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  font-weight: bold;
}

.flow-connector {
  width: 24px;
  height: 2px;
  background: #E2E8F0;
  position: relative;
}

.flow-connector::after {
  content: '→';
  position: absolute;
  right: -8px;
  top: -8px;
  color: #94A3B8;
  font-size: 16px;
}

.step-name {
  font-size: 12px;
  font-weight: 500;
  color: #1E293B;
}

.flow-step.completed .step-name {
  color: white;
}
Step Summary Popup
css
.step-popup {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 16px;
  min-width: 280px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 100;
  margin-top: 8px;
  opacity: 0;
  transform: translateX(-50%) translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.step-popup.visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.popup-header {
  font-size: 14px;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 12px;
  border-bottom: 1px solid #E2E8F0;
  padding-bottom: 8px;
}

.popup-section {
  margin-bottom: 12px;
}

.popup-section-title {
  font-size: 11px;
  font-weight: 500;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-list-item {
  display: flex;
  align-items: center;
  padding: 4px 0;
  font-size: 12px;
}

.task-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 8px;
  background: #94A3B8;
}

.task-status-dot.completed {
  background: #10B981;
}

.doc-link {
  color: #2563EB;
  text-decoration: none;
  font-size: 12px;
  padding: 2px 0;
  display: block;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.doc-link:hover {
  background: #F0F7FF;
  padding-left: 4px;
}
Add Workspace Modal Implementation
Modal Structure
css
.workspace-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: 0;
  animation: modalFadeIn 0.3s ease-out forwards;
}

@keyframes modalFadeIn {
  to {
    opacity: 1;
  }
}

.workspace-modal-content {
  background: white;
  border-radius: 20px;
  width: 600px;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  transform: scale(0.95);
  animation: modalScaleIn 0.3s ease-out 0.1s forwards;
}

@keyframes modalScaleIn {
  to {
    transform: scale(1);
  }
}
Step-by-Step Wizard
css
.modal-header {
  background: linear-gradient(145deg, #2563EB, #3B82F6);
  color: white;
  padding: 24px;
  border-radius: 20px 20px 0 0;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}

.step-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
}

.step-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.step-dot.active {
  background: white;
  transform: scale(1.25);
}

.step-dot.completed {
  background: #10B981;
}

.modal-body {
  padding: 24px;
}

.step-content {
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.step-content.active {
  opacity: 1;
  transform: translateX(0);
}

.step-title {
  font-size: 18px;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 8px;
}

.step-description {
  color: #64748B;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
}
Dynamic Flow Steps Input
css
.flow-steps-builder {
  background: #F8FAFC;
  border-radius: 12px;
  padding: 16px;
}

.flow-step-input-container {
  margin-bottom: 12px;
  position: relative;
}

.flow-step-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.flow-step-input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.add-step-btn {
  width: 100%;
  padding: 10px;
  background: transparent;
  border: 2px dashed #E2E8F0;
  border-radius: 8px;
  color: #64748B;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-step-btn:hover {
  border-color: #3B82F6;
  color: #3B82F6;
  background: #F0F7FF;
}

.step-item {
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  animation: stepSlideIn 0.3s ease-out;
}

@keyframes stepSlideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.step-number {
  width: 24px;
  height: 24px;
  background: #3B82F6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  margin-right: 12px;
  flex-shrink: 0;
}

.step-text {
  flex: 1;
  font-size: 14px;
  color: #1E293B;
}

.remove-step-btn {
  width: 24px;
  height: 24px;
  background: #FEE2E2;
  color: #EF4444;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.remove-step-btn:hover {
  background: #FEE2E2;
  transform: scale(1.1);
}
Member Selection Interface
css
.member-selection {
  max-height: 300px;
  overflow-y: auto;
}

.member-search {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
  transition: all 0.2s ease;
}

.member-search:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.member-list {
  display: grid;
  gap: 8px;
}

.member-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.member-item:hover {
  border-color: #3B82F6;
  background: #F0F7FF;
}

.member-item.selected {
  background: #EBF8FF;
  border-color: #2563EB;
}

.member-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
  background: linear-gradient(145deg, #3B82F6, #2563EB);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 12px;
}

.member-info {
  flex: 1;
}

.member-name {
  font-size: 14px;
  font-weight: 500;
  color: #1E293B;
  margin-bottom: 2px;
}

.member-role {
  font-size: 12px;
  color: #64748B;
}

.member-checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid #E2E8F0;
  border-radius: 4px;
  position: relative;
  transition: all 0.2s ease;
}

.member-item.selected .member-checkbox {
  background: #2563EB;
  border-color: #2563EB;
}

.member-item.selected .member-checkbox::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 11px;
  font-weight: bold;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
Modal Navigation
css
.modal-footer {
  padding: 20px 24px;
  border-top: 1px solid #E2E8F0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-nav-btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.btn-back {
  background: transparent;
  color: #64748B;
  border-color: #E2E8F0;
}

.btn-back:hover {
  background: #F8FAFC;
  color: #1E293B;
}

.btn-next {
  background: #2563EB;
  color: white;
  border-color: #2563EB;
}

.btn-next:hover {
  background: #1D4ED8;
  transform: translateY(-1px);
}

.btn-create {
  background: #10B981;
  color: white;
  border-color: #10B981;
}

.btn-create:hover {
  background: #059669;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}
Responsive Design & Breakpoints
Desktop (1200px+)
css
@media (min-width: 1200px) {
  .main-layout {
    display: grid;
    grid-template-columns: 280px 1fr 280px;
    gap: 20px;
  }
  
  .feature-navigation {
    display: flex;
    flex-direction: column;
  }
}
Tablet (768px - 1199px)
css
@media (max-width: 1199px) and (min-width: 768px) {
  .main-layout {
    grid-template-columns: 280px 1fr;
  }
  
  .right-sidebar {
    display: none;
  }
  
  .feature-navigation {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin-bottom: 16px;
  }
}
Mobile (< 768px)
css
@media (max-width: 767px) {
  .main-layout {
    display: flex;
    flex-direction: column;
  }
  
  .left-sidebar {
    position: fixed;
    top: 112px;
    left: -280px;
    width: 280px;
    height: calc(100vh - 112px);
    background: white;
    border-right: 1px solid #E2E8F0;
    z-index: 100;
    transition: transform 0.3s ease;
  }
  
  .left-sidebar.open {
    transform: translateX(280px);
  }
  
  .mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  
  .mobile-overlay.visible {
    opacity: 1;
    pointer-events: all;
  }
  
  .tasks-columns {
    grid-template-columns: 1fr;
  }
  
  .analysis-metrics {
    grid-template-columns: 1fr;
  }
  
  .flow-steps {
    flex-direction: column;
    align-items: stretch;
  }
  
  .flow-connector {
    width: 2px;
    height: 20px;
    align-self: center;
  }
  
  .flow-connector::after {
    content: '↓';
    top: 2px;
    right: -8px;
  }
}
Animation & Interaction Details
Smooth Transitions
css
.smooth-transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.bounce-in {
  animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bounceIn {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.slide-up {
  animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
Loading States
css
.skeleton-loader {
  background: linear-gradient(
    90deg,
    #F8FAFC 25%,
    #E2E8F0 50%,
    #F8FAFC 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #E2E8F0;
  border-top: 2px solid #2563EB;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
Accessibility & Keyboard Navigation
Focus Management
css
.focus-visible {
  outline: 2px solid #2563EB;
  outline-offset: 2px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .task-item,
  .group-item,
  .file-item {
    border-width: 2px;
  }
  
  .btn-primary {
    border: 2px solid currentColor;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
Implementation Priority & User Flow
Phase 1: Core Group Functionality
Left sidebar with group list and action buttons
Group chat interface with real-time messaging
Mode toggle between Group and Workspace
Basic group creation and exploration
Phase 2: Workspace Foundation
Workspace creation modal with step-by-step wizard
Basic task management (Tasks section)
File sharing interface (Docs section)
Project flow visualization (Analysis section)
Phase 3: Advanced Features
Real-time collaboration indicators
Advanced file filtering and organization
Detailed progress analytics
Member role management
Notification system
Phase 4: Polish & Optimization
Advanced animations and micro-interactions
Comprehensive mobile optimization
Accessibility enhancements
Performance optimizations
Technical Implementation Notes
State Management Structure
javascript
// Recommended state structure
const groupState = {
  activeGroup: null,
  groupMode: 'chat', // 'chat' | 'workspace'
  groups: [],
  workspaces: [],
  activeWorkspace: null,
  currentView: 'chat', // 'chat' | 'tasks' | 'docs' | 'analysis'
  messages: [],
  tasks: { todo: [], completed: [] },
  documents: [],
  flowSteps: [],
  members: []
};
Key Interaction Handlers
javascript
// Mode switching with smooth transitions
const handleModeSwitch = (mode) => {
  setTransitioning(true);
  setTimeout(() => {
    setGroupMode(mode);
    setTransitioning(false);
  }, 200);
};

// Task completion with animation
const handleTaskComplete = (taskId) => {
  const task = tasks.todo.find(t => t.id === taskId);
  task.element.classList.add('task-move-animation');
  
  setTimeout(() => {
    updateTaskStatus(taskId, 'completed');
  }, 300);
};

// File upload with progress
const handleFileUpload = async (file, taskId) => {
  const progressElement = showProgress();
  try {
    await uploadFile(file, taskId, (progress) => {
      updateProgress(progressElement, progress);
    });
    refreshDocuments();
  } catch (error) {
    showError('Upload failed');
  } finally {
    hideProgress(progressElement);
  }
};
This comprehensive style guide ensures seamless integration with your existing CampusConnect platform while providing all the sophisticated group and workspace functionality you've outlined. The design maintains visual consistency, prioritizes user experience, and includes all the detailed features specified in your requirements.



