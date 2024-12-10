import React from 'react';
import { MiniMap as ReactFlowMiniMap } from 'reactflow';
import './Minimap.css';  




const Minimap = ({ nodes, zoomable = true, pannable = true }) => {
  const nodeColor = (node) => {
    
    if (node.type === 'customInput') return '#1f77b4'; 
    if (node.type === 'llm') return '#ff7f0e'; 
    if (node.type === 'customOutput') return '#2ca02c'; 
    return '#868dbd'; 
  };

  return (
    <ReactFlowMiniMap
      nodeColor={nodeColor}
      nodeBorderRadius={10} 
      zoomable={zoomable} 
      pannable={pannable} 
      style={{
        width: 180,
        height: 140,
        background:' rgba(0, 0, 0, 0.6)',
        boxShadow:' 0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(4.5px)',
        
        border: '1px solid rgba(255, 255, 255, 0.18)',
         
      }}
    />
  );
};

export default Minimap;


