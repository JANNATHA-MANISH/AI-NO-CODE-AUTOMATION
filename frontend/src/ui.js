import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import NodesContainer from './Components/nodes/nodecontainer';
import Minimap from './Components/Minimap/Minimap';
import './ui.css';


import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: NodesContainer,
  llm: NodesContainer,
  customOutput: NodesContainer,
  text: NodesContainer,
  discord: NodesContainer,      
  notion: NodesContainer, 
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  resetStore: state.resetStore, 
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    resetStore, 
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: `${type}`,
  });

  
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        if (!type) return;

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
        console.log('Node Added:', newNode); 
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  
  const handleClear = () => {
    
    resetStore();

    
    localStorage.removeItem('flow-storage');
    console.log('Data cleared!');
  };

  return (
    <div>
      <div ref={reactFlowWrapper} style={{ width: '100%', height: '60vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
        >
          <Background color="#aaa" gap={gridSize} />
          <Controls />
          <Minimap />
        </ReactFlow>
      </div>
      <div className='button-clear'>
      {}
      <button onClick={handleClear}  className='submitButtonclear' style={{ marginTop: '10px' }}>
        Clear All Data
      </button></div>
    </div>
  );
};
