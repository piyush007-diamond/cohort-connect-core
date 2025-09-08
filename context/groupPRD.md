aftercliking on this button users willpost that particular post 
In <group> section the top section will be same as home section 
In left side ssection below top section there will be two buttons <create group> below that <explore group> this two button will be rectangular rounded edges when curson will hver on them they should show effect of 3d shine like maybe 
Below this two buttons thatcsection will contain group to which user is joined interface of that section will be like after upper two buttons in left side action below that after some space there will be —--------------<group (text only)>-------------- 
This will act like argin separating two part below that at group shokasing part of left side section in that at the left most side there will be group profile pic of group and beside it on right side name of group and on same line at right most there will be no. of unread messaged shpcasing unit which will be inside circle round  all this info related to one group will be inside the rectangular box fade border rounded edges if there are many group we will be able to slide doen but only in group showcasing setion not entire left rise section . after clicking ongroups on left side it will open the chat section of group  for that our section beside left side section and below to top section , in chat section it will be like group icon at the top corner in that section limited on the same line as icon there will be place for name of group below this thing will be inside rectangular box stationary , below this there will be actual chat where members of group will chat together chat section below that at message typing box there will other option too inorder to share media buttons will be ther LIke pics , files . video after clicking on this buton it will opn folder in our deshstp above this group chat section n justbelow to top section and just above to the group chat section there will be rwo buttons <groups>{  after somespace       }<worlplace> this button design and effect would be same ad add group and explore group button for fdeafulay group btoon will be sected everything i mentioned aove wil belimited to group  part of same grup secti oand after clicking on workspace and work and ui of workspace will tell you lateabput that
Product Requirements Document: Workspace
<goal> To create a collaborative environment within groups where members can manage shared projects, track progress, communicate effectively, and share resources. The workspace aims to streamline project workflows, enhance team productivity, and provide clear insights into project status for all members.
## Workspace Section ##
This section is activated when a user, from within a specific <group>, clicks on the <workspace> button located just above the group chat interface. The UI will transition to the workspace view, maintaining the overall application's top navigation and general structure.
## Main Layout & Navigation ##
The workspace is divided into three primary areas: the main content area on the left, a small navigation bar below it, and a static action panel on the right.
leftt-Hand Section:
This section's position and style will be identical to the group section's left-hand panel.
<Explore Workspace> button: A rectangular button with rounded edges and a 3D shine hover effect. Clicking this opens an interface to discover other workspaces the user might be eligible to join.
<Add Workspace> button: Styled identically to the "Explore Workspace" button and positioned below it. Its function is to initiate the creation of a new workspace within the current group. (Detailed in its own section below).
Main Content & Sub-Navigation:
This area occupies the space between the far-left group list iy will be below those two buttons.
<Chat Section>: The top portion, consuming roughly 60% of the vertical space in this main block, is dedicated to the workspace chat.
<Feature Navigation Bar>: Positioned at the top right corner of the main content area,d task/docs/analysis sections. It contains three buttons:
<Tasks>: Default selected view. Shows the task management interface.
<Docs>: Shows the shared media and file submission interface.
<Analysis>: Shows the project progress overview and flow diagram.
The selected button will have a distinct color or underline to indicate it's active.
This button will be arranged invertical row at top right corner below the top section / navbar
## Chat Section ##
The chat section is the central communication hub for the workspace, focused on project and task-related discussions.
<Interface>: The UI will be a mirror of the group chat interface.
Header: A stationary rectangular box at the top of the chat area, containing the workspace's icon/logo and its name.
Message Feed: The main scrolling area where messages from members are displayed. Each message shows the sender's profile picture, name, and the message content.
Input Box: Located at the bottom of the chat section. It will contain a text input field for typing messages and icons for sharing media (.jpg, .png), files (.pdf, .docx), and videos (.mp4). Clicking these icons will open the user's native file explorer.
After clicking the any three buttons from top right there will interface open replacing interface of chat section in main block at default the chat section will present
## Tasks Section ##
This is the default view within the workspace's feature area, designed for task management.
<Interface>: The space will be divided into two main columns or lists: "To-Do" and "Completed."
<Add Task> button: A prominent "+" button located at the top right of this section.
Task Item: Each task will be represented by a rounded-edge rectangular item. It will display the task name and a checkbox on the left.
User Flow: When a user clicks the checkbox, the task item will animate (e.g., fade out and reappear) moving from the "To-Do" list to the "Completed" list.
<Add Task Interface>:
Trigger: Clicking the <Add Task> button.
UI: A modal window will appear.
Fields:
Task Name: A text input field.
Description: A larger text area for details.
Assign to Step: A dropdown menu populated with the steps defined during the workspace creation (from the Analysis flow diagram). This links the task to a specific part of the project workflow.
Due Date: A calendar-style date picker.
<Create Task> button: To finalize and add the task to the "To-Do" list.
## Docs Section ##
This area serves as a repository for all project-related files and user submissions.
<Interface>: A grid or list view of files.
File Representation: Each file will be shown as an icon based on its type (e.g., a script icon, a video play icon) with the filename and the name of the user who uploaded it displayed below.
Filters: The workspace admin will have the ability to set filters (e.g., "Scripts," "Videos," "Design Files") to organize the content. These filters will appear as clickable tags at the top of the section.
<Submit Work> Functionality:
User Flow: When a user completes a task in the <Tasks> section, they can navigate here to upload the corresponding deliverable.
UI: A button labeled <+ Submit Your Work> will be present. Clicking it opens a modal.
Submission Modal:
File Upload: A drag-and-drop area or a standard file selection button.
Link to Task: A dropdown menu to select which completed task this submission is for. This creates a direct link between the task and the document for tracking in the Analysis section.
<Submit> button: To upload the file.
## Analysis Section ##
This section provides a high-level, visual overview of the project's health and progress.
<Top Metrics>:
Interface: Three rectangular boxes with rounded edges, arranged horizontally at the top of the section.
Box 1: Work Completed %: Displays a percentage calculated by (Number of Completed Tasks / Total Number of Tasks) * 100.
Box 2: Tasks Completed: A raw count of all tasks marked as complete.
Box 3: Tasks Uncompleted: A raw count of all tasks in the "To-Do" list.
<Flow Diagram>:
Interface: Positioned below the metrics boxes. It visually represents the project steps that were defined when the workspace was created. It will look like a series of connected nodes or boxes.
Step Differentiation:
Completed Step: A step is marked as "completed" (e.g., turns green or has a checkmark) only when all tasks assigned to it in the <Tasks> section are completed.
In-Progress/Uncompleted Step: A step remains in a default state (e.g., grey or blue) if any task assigned to it is still in the "To-Do" list.
Interactivity:
User Flow: Clicking on any single step in the diagram.
Action: A summary pop-up or an expanded view appears next to the clicked step.
Summary Content:
Step Name: The name of the step.
Included Tasks: A list of all tasks assigned to this step.
Task Status: For each task, it shows who completed it and when.
Submitted Docs: A list of clickable links to any documents that were submitted and linked to the tasks within this step.
## Add Workspace Interface ##
This interface is critical for setting up the project workflow correctly.
<Trigger>: Clicking the <Add Workspace> button on the left-hand section.
<Interface>: A full-screen modal will appear, guiding the user through a setup process.
<User Flow & Fields>:
Step 1: Basic Info
Workspace Name: Text input.
Workspace Description: Text area for a brief overview of the project goal.
Step 2: Define Project Flow
Explanation Text: "Define the key steps of your project from start to finish. This will create your analysis flow diagram."
Input Method: A dynamic list input field. The user types the first step (e.g., "Phase 1: Research") and hits Enter or clicks an "Add Step" button. A new input field appears below for the next step. Users can add as many steps as needed.
Step 3: Invite Members
A search bar to find and select members from the parent <group> to add to this specific workspace.
<Create Workspace> button: Finalizes the process, creates the workspace, and makes it accessible from the group page. The steps entered in Step 2 will now populate the <Flow Diagram> in the <Analysis> section.
## UI Element Design & Positioning ##
This section details the specific visual design, style, and on-screen placement of each component within the Workspace.
Main Layout:
Positioning: The entire workspace interface is contained within the application's main content area, replacing the group chat view. It respects the existing top navigation bar and the far-left sidebar containing the the first two buttons list of groups. The layout is a three-column structure: a central, primary content block flanked by a narrow left-hand group list and a right-hand event/action panel.


<Explore Workspace> & <Add Workspace> buttons:
Positioning: Stacked vertically at the top of the left-hand panel.
Design: Rectangular buttons with pronounced rounded edges. They will have a solid background color with white text.
Style & Animation: On hover, the buttons will exhibit a "3D shine" effect, where a faint, diagonal light gradient sweeps across the button's surface, giving it a premium feel. This maintains consistency with the button styles defined in the <group> section.
Main Content & Sub-Navigation:
Positioning: This is the largest block, situated in the center of the screen, between the far-left group list and the right-hand panel. It is vertically divided.
<Chat Section>:
Positioning: Occupies the top ~60% of the vertical space within this central block.
Design: Contained within a parent rectangle with very subtle, rounded corners and a faint border to visually separate it from the feature section below.
Header: A non-scrolling, stationary box at the very top of the chat section. It contains the workspace logo/icon on the left and the workspace name in a bold, stylish font to its right.
Input Box: Fixed at the bottom of the chat section. It's a rounded rectangle input field. To its right, within the same container, are three circular, icon-only buttons for sharing media, files, and videos. Hovering over these icons should slightly increase their size and show a tooltip for their function.
<Feature Navigation Bar>:
Positioning: This acts as a small navigation bar at right side top corner It is located at the top-right corner of the feature area (the bottom ~40% of the central block), just below the chat section.
Design: A set of three buttons (<Tasks>, <Docs>, <Analysis>) arranged horizontally. The buttons themselves are text-only with a transparent background.
Style & Animation: The currently active button will be differentiated by having its text in a different, vibrant color and a solid underline. When transitioning between sections, the underline should smoothly slide from the old button to the new one.
This section will came after clicking the top right corner nav bar buttons and this section will replace our chat section
<Tasks> Section:
<Add Task> button:
Positioning: Located at the top-right corner of the "To-Do" column.
Design: A circular button containing only a + icon. It will have a distinct background color to draw attention. On hover, it should perform a "pinch up" animation, slightly scaling up and gaining a soft shadow.
Task Item:
Design: A rectangular item with rounded edges and a soft drop shadow to make it appear lifted from the background. It has a checkbox on the far left. The task name next to it is in a normal, readable font.
Animation: When a checkbox is clicked, the entire task item will fade out from the "To-Do" list and fade back in at the top of the "Completed" list. Completed tasks will have their text styled with a strikethrough.
<Analysis> Section:
<Top Metrics> Boxes:
Positioning: Arranged in a horizontal row at the very top of the Analysis view.
Design: Three distinct rectangular boxes with rounded edges. Each box will have a different pastel background color (e.g., light green for completed, light red for uncompleted) to visually distinguish the metrics. The number inside will be in a large, bold font, with the descriptive text ("Tasks Completed") below it in a smaller, normal font.
<Flow Diagram> Nodes:
Positioning: Displayed below the metric boxes, flowing horizontally with connectors.
Design: Each step is a rectangular box with rounded edges. An uncompleted step has a neutral/faded background color with a solid border. A completed step will change its background color to a vibrant green and its border will also turn green.
Animation: When a step becomes completed, the color change should be a smooth transition, not an instant switch. Clicking a node should make it pulse slightly and open the summary pop-up with a gentle fade-in effect.


