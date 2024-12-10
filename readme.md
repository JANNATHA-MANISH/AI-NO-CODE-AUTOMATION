
# AI-NO-CODE-AUTOMATION

![Project Image](path_to_your_image)

## Project Overview

**AI-NO-CODE-AUTOMATION** is a powerful AI automation platform designed for teams to seamlessly integrate artificial intelligence into their workflows, without needing any coding skills. Through a user-friendly, no-code interface, and SDK support, the platform enables users to interact with and leverage AI to:

- Search through knowledge bases
- Generate documents on-demand
- Deploy chatbots and virtual assistants

The platform provides intuitive, visual tools to create automation pipelines by connecting nodes, and includes advanced functionality to validate and manage the flow of these automated tasks.

## Key Features

### 1. **No-Code Interface**
   - Designed to empower non-technical users to harness the power of AI through a drag-and-drop interface.
   - Users can create workflows and pipelines visually, removing the need for complex programming.
   
### 2. **Customizable Nodes**
   - Supports four primary types of nodes: **Input**, **Output**, **Text**, and **LLM** (Large Language Model). Each node type has flexible settings such as:
     - **Text Inputs** for collecting user input
     - **File Inputs** for file-based interactions
     - **Output Nodes** for returning generated content
     - **Text Nodes** for dynamic content transformation
   - Users can define the properties of nodes (e.g., text, variable names) and customize how they behave within a pipeline.
   
### 3. **Real-Time Pipeline Creation**
   - The platform allows users to create, visualize, and manage automation pipelines by linking different nodes together.
   - Provides an easy-to-use drag-and-drop interface for connecting nodes in a logical sequence.

### 4. **DAG Validation**
   - Once a pipeline is created, the backend validates the connections and ensures that the graph of nodes forms a **Directed Acyclic Graph (DAG)**.
   - This ensures that the workflow does not contain circular references, guaranteeing efficient task execution.

### 5. **AI-Powered Automation**
   - Leverage advanced AI to automate document generation, data processing, and deploy chatbots or virtual assistants.
   - Use built-in integrations to perform complex AI tasks, reducing manual effort and boosting productivity.

### 6. **User-Friendly Alerts**
   - After the pipeline is submitted, users receive alerts with essential information:
     - Number of nodes in the pipeline
     - Number of edges (connections between nodes)
     - Whether the pipeline is a valid Directed Acyclic Graph (DAG)

## Technologies Used

### Frontend:
- **React**: For building the user interface with interactive components.
- **ReactFlow**: For creating and managing node-based pipelines in a visual editor.
- **Axios**: For making API calls between the frontend and backend.
- **JavaScript**: Core language for frontend logic.

### Backend:
- **FastAPI**: A fast and modern Python web framework for building APIs.
- **Python**: Backend logic is implemented in Python, providing robust support for machine learning tasks.
- **Uvicorn**: ASGI server for serving FastAPI applications.

## Installation Guide

### Prerequisites
Ensure you have the following installed before starting:
- **Node.js** (version 14 or higher)
- **Python** (version 3.7 or higher)
- **npm** (version 6 or higher)
- **pip** (Python's package installer)

### Setup Instructions

#### 1. **Clone the repository**:
   Start by cloning the project to your local machine:
   ```bash
   git clone https://github.com/JANNATHA-MANISH/AI-NO-CODE-AUTOMATION
   cd AI-NO-CODE-AUTOMATION
   ```

#### 2. **Frontend Setup**:
   Navigate to the `frontend` directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
   Start the frontend server:
   ```bash
   npm start
   ```

#### 3. **Backend Setup**:
   Navigate to the `backend` directory and install Python dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
   Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```

#### 4. **Access the Application**:
   Once both frontend and backend servers are running:
   - **Frontend**: Open a web browser and navigate to `http://localhost:3000`.
   - **Backend**: The API server will be available at `http://localhost:8000`.

## How to Use

1. **Create Nodes**:
   - Start by adding **Input**, **Output**, **Text**, or **LLM** nodes in the frontend.
   - For each node, you can define properties like variable names, input/output types, and content.
   
2. **Connect Nodes to Form Pipelines**:
   - Use the drag-and-drop functionality to connect nodes and create a pipeline.
   - The connections between nodes form the structure of the pipeline, allowing data to flow from one node to another.

3. **Submit the Pipeline**:
   - Once you’ve completed your pipeline, click the **Submit** button to send the pipeline data to the backend.
   - The backend processes the data and calculates the number of nodes, edges, and checks whether the pipeline is a valid **DAG**.

4. **View Results**:
   - Upon receiving a response from the backend, an alert will display:
     - The number of nodes in the pipeline.
     - The number of edges connecting nodes.
     - Whether the pipeline is a valid Directed Acyclic Graph (DAG).
   - If the graph is valid, you can proceed with automation tasks. Otherwise, modify the pipeline to ensure proper structure.

## Contributing

We welcome contributions to improve the platform! Feel free to fork the repository, make enhancements, and submit pull requests. Here are a few ways you can contribute:
- Report bugs and create issues.
- Suggest new features.
- Contribute code or improvements.

## License

This project is licensed under the **MIT License**. See the LICENSE file for more details.

---
