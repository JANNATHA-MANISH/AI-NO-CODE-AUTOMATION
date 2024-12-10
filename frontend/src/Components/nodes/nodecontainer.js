

import React, { useState, useEffect, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../../store';
import './nodecontainer.css';

export const NodesContainer = ({ id, type, data }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);

  
  const [name, setName] = useState(data.name || '');
  const [text, setText] = useState(data.text || '');
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const [outputType, setOutputType] = useState(data.outputType || 'Text');
  const [llmInput, setLlmInput] = useState(data.llmInput || '');
  const [fileContent, setFileContent] = useState(data.fileContent || '');
  const [selectedModel, setSelectedModel] = useState(data.selectedModel || 'gemini'); 

  
  const [handles, setHandles] = useState(data.handles || []);

  
  const updateHandlesFromText = useCallback(
    (currentText) => {
      const regex = /\{\{(\s*\w+\s*)\}\}/g;
      const foundVariables = [];
      let match;

      while ((match = regex.exec(currentText)) !== null) {
        const variable = match[1].trim();
        foundVariables.push(variable);
      }

      const newHandles = foundVariables.map((variable, index) => ({
        id: `handle-${id}-${index}`,
        variable,
        position: Position.Right,
        style: { top: `${20 + index * 30}px` },
      }));

      setHandles(newHandles);
      updateNodeData(id, { handles: newHandles });
    },
    [id, updateNodeData]
  );

  
  useEffect(() => {
    if (type === 'text') {
      updateHandlesFromText(text);
    }
  }, [text, type, updateHandlesFromText]);

  
  useEffect(() => {
    console.log(`Updating node ${id} with data:`, { name, text, inputType, outputType, llmInput, fileContent, selectedModel });
    updateNodeData(id, { name, text, inputType, outputType, llmInput, fileContent, selectedModel });
  }, [id, name, text, inputType, outputType, llmInput, fileContent, selectedModel, updateNodeData]);
  
  
  const handleNameChange = (e) => setName(e.target.value);
  const handleTextChange = (e) => setText(e.target.value);
  const handleInputTypeChange = (e) => setInputType(e.target.value);
  const handleOutputTypeChange = (e) => setOutputType(e.target.value);
  const handleLlmInputChange = (e) => setLlmInput(e.target.value);
  
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFileContent(reader.result);
      };
      reader.readAsText(file);
    }
  };
  const handleModelChange = (e) => setSelectedModel(e.target.value); 

  // Handler for submitting LLM request
  const handleSubmit = async () => {
    if (!llmInput.trim()) {
      alert('Please enter some input text for the LLM.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/process_text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_text: llmInput, use_gemini: selectedModel === 'gemini' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to process LLM input.');
      }

      const result = await response.json();
      console.log(`LLM Response for Node ${id}:`, result.processed_text);
      alert(`LLM Response:\n${result.processed_text}`);
    } catch (error) {
      console.error('Error submitting LLM request:', error);
      alert(`Error: ${error.message}`);
    }
  };
                     
                     const [containerHeight, setContainerHeight] = useState(170); 
const [containerWidth, setContainerWidth] = useState(160); 

const updateHeight = (textarea) => {
  
  textarea.style.height = 'auto';

  
  const newHeight = Math.min(textarea.scrollHeight, 200); 
  
  textarea.style.height = `${Math.max(50, newHeight)}px`;

  
  setContainerHeight(Math.max(170, newHeight + 30)); 

  
  const newWidth = Math.min(Math.max(textarea.scrollWidth, 160), 270); 
  setContainerWidth(newWidth); 
};


                  

  
  const renderNode = () => {
    switch (type) {
        case 'customInput':
            return (
              <div className="node-content" style={{ height: '170px', width: '280px' }}>
                <div style={{ margin: '10px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#ffffff' }}>Input</span>
                </div>
                <div className='node-input-container'>
                  <label className='input-label' style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ marginRight: '2px' }}>Name:</span>
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      placeholder="Input Field"
                      style={{ color: 'white',background: '#210937',marginLeft: '10px', borderRadius: '5px', padding: '5px', width: '150px', border: 'none', outline: 'none' }}
                    />
                  </label>
                  <label className='input-label' style={{ display: 'flex', color: '#ffffff' }}>
                    <span style={{ marginRight: '7px' }}>Type:</span>
                    <select
                      value={inputType}
                      onChange={handleInputTypeChange}
                      style={{ color: 'white',background: '#210937',marginLeft: '10px', borderRadius: '5px', padding: '5px', width: '180px', outline: 'none' }}
                    >
                      <option value="Text">Text</option>
                      <option value="File">File</option>
                    </select>
                  </label>
                </div>
                <Handle type="source" position={Position.Right} id={`${id}-value`} />
              </div>
            );
          
           case 'discord':
    return (
      <div className="node-content" style={{ height: '170px', width: '280px' }}>
        <div style={{ margin: '10px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#ffffff' }}>Discord</span>
        </div>
        <div className='node-input-container'>
          <label className='input-label' style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ marginRight: '2px' }}>Webhook URL:</span>
            <input
              type="text"
              value={name}
              onChange={handleInputTypeChange}
              placeholder="Enter Discord Webhook"
              style={{ color: 'white', background: '#210937', marginLeft: '10px', borderRadius: '5px', padding: '5px', width: '150px', border: 'none', outline: 'none' }}
            />
          </label>
          <label className='input-label' style={{ display: 'flex', color: '#ffffff' }}>
            <span style={{ marginRight: '7px' }}>Channel:</span>
            <select
              value={name}
              onChange={handleInputTypeChange}
              style={{ color: 'white', background: '#210937', marginLeft: '10px', borderRadius: '5px', padding: '5px', width: '180px', outline: 'none' }}
            >
              <option value="General">General</option>
              <option value="Updates">Updates</option>
              <option value="Alerts">Alerts</option>
            </select>
          </label>
        </div>
        <Handle type="source" position={Position.Right} id={`${id}-discord`} />
      </div>
    );

  case 'notion':
    return (
      <div className="node-content" style={{ height: '170px', width: '280px' }}>
        <div style={{ margin: '10px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#ffffff' }}>Notion</span>
        </div>
        <div className='node-input-container'>
          <label className='input-label' style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ marginRight: '2px' }}>DB ID:</span>
            <input
              type="text"
              value={name}
              onChange={handleInputTypeChange}
              placeholder="Enter Notion Database ID"
              style={{ color: 'white', background: '#210937', marginLeft: '10px', borderRadius: '5px', padding: '5px', width: '150px', border: 'none', outline: 'none' }}
            />
          </label>
          <label className='input-label' style={{ display: 'flex', color: '#ffffff' }}>
            <span style={{ marginRight: '7px' }}> Token:</span>
            <input
              type="text"
              value={name}
              onChange={handleLlmInputChange}
              placeholder="Enter Integration Token"
              style={{ color: 'white', background: '#210937', marginLeft: '10px', borderRadius: '5px', padding: '5px', width: '180px', border: 'none', outline: 'none' }}
            />
          </label>
        </div>
        <Handle type="source" position={Position.Right} id={`${id}-notion`} />
      </div>
    );

    
            case 'customOutput':
                return (
                  <div className="node-content" style={{ height: '170px', width: '280px' }}>
                    <Handle type="target" position={Position.Left} id={`${id}-value`} />
                    <div style={{ margin: '10px' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#ffffff' }}>Output</span>
                    </div>
                    <div className='node-input-container'>
                      <label className='input-label' style={{ display: 'flex', color: '#ffffff', alignItems: 'center', marginBottom: '10px', marginRight: '10px' }}>
                        <span style={{ marginRight: '2px' }}>Name:</span>
                        <input
                          type="text"
                          value={name}
                          onChange={handleNameChange}
                          placeholder="Output Field"
                          style={{ color: 'white',background: '#210937',marginLeft: '10px', borderRadius: '5px', padding: '5px', width: '140px', border: 'none', outline: 'none' }}
                        />
                      </label>
                      <label className='input-label' style={{ display: 'flex', color: '#ffffff', marginRight: '10px' }}>
                        <span style={{ marginRight: '7px' }}>Type:</span>
                        <select
                          value={outputType}
                          onChange={handleOutputTypeChange}
                          style={{ color: 'white',background: '#210937',marginLeft: '10px', borderRadius: '5px', padding: '5px', width: '180px', outline: 'none' }}
                        >
                          <option value="Text">Text</option>
                          <option value="Image">Image</option>
                        </select>
                      </label>
                    </div>
                  </div>
                );
              
                case 'llm':
                    return (
                      <div className="node-content" style={{ height: '380px', width: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Handle type="target" position={Position.Left} id={`${id}-system`} style={{ top: '33%' }} />
                        <Handle type="target" position={Position.Left} id={`${id}-prompt`} style={{ top: '66%' }} />
                        
                        <div style={{ margin: '10px' }}>
                          <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#ffffff' }}>LLM</span>
                        </div>
                  
                        <div className='node-input-container' style={{ flexGrow: 1 }}>
                          {}
                          <label className="input-label" style={{ display: 'flex', color: '#ffffff', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{ marginRight: '7px' }}>Select Model:</span>
                            <select

                              value={data?.selectedModel || ''}
                              onChange={(e) => updateNodeData(id, { selectedModel: e.target.value })}
                              style={{ color: 'white',background: '#210937',marginLeft: '10px', borderRadius: '5px', padding: '5px', width: '230px', outline: 'none' }}
                              className="select-field"
                            >
                              <option value="gemini">Gemini</option>
                              <option value="chatgpt">ChatGPT</option>
                              <option value="llama">Llama</option>
                              {}
                            </select>
                          </label>


                          
                          <label className="input-label" style={{ display: 'flex', color: '#ffffff', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{marginRight: '2px' }}>Input:</span>
                            <textarea
                                    value={text}
                                    onChange={(e) => {
                                      handleTextChange(e);
                                      updateHeight(e.target);
                                    }}
                                    placeholder="Enter text with {{variables}}"
                                    className="custom-scrollbar"
                                    style={{
                                      color: 'white',
                                      backgroundColor: 'rgb(33, 9, 55)', 
                                      marginLeft: '10px',
                                      borderRadius: '5px',
                                      padding: '5px',
                                      width: `${containerWidth}px`, 
                                      height: `${Math.max(50, containerHeight - 30)}px`, 
                                      resize: 'none', 
                                      border: 'none',
                                      outline: 'none',
                                    }}
                                  />
                          </label>


                          {}
                          <label className="input-label" style={{ display: 'flex', color: '#ffffff', alignItems: 'center', marginBottom: '10px' }}>
                                <span style={{ marginRight: '2px' }}>Upload File:</span>
                                <div className="file-input-container">
                                    <input
                                    type="file"
                                    onChange={(e) => {
                                      const file = e.target.files[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                          updateNodeData(id, { fileContent: event.target.result });
                                        };
                                        reader.readAsText(file);
                                      }
                                    }}
                                    className="file-input"
                                    />
                                    <div className="file-input-button">Choose File</div>
                                </div>
                                </label>

                          <br></br><br></br>
                        <button onClick={handleSubmit} className="submit-button" >
                          Submit LLM Request
                        </button> 
                         
                        </div>
                        
                        <Handle type="source" position={Position.Right} id={`${id}-response`} />
                       
                      </div>
                    );
                  
                  
                  

                    case 'text':
                      return (
                        <div
                          style={{
                            height: `${containerHeight}px`, 
                            width: '280px',
                            backgroundColor: 'rgb(70 14 140)',
                            borderRadius: '8px',
                          }}
                        >
                          {}
                          <div style={{ margin: '10px' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#ffffff' }}>Text</span>
                          </div>
              
                          {}
                          <div className="node-input-container">
                            <label className="input-label">
                             
                              <textarea
                                    value={text}
                                    onChange={(e) => {
                                      handleTextChange(e);
                                      updateHeight(e.target);
                                    }}
                                    placeholder="Enter text with {{variables}}"
                                    className="custom-scrollbar"
                                    style={{
                                      color: 'white',
                                      backgroundColor: 'rgb(33, 9, 55)', 
                                      marginLeft: '10px',
                                      borderRadius: '5px',
                                      padding: '5px',
                                      width: `${containerWidth}px`, 
                                      height: `${Math.max(50, containerHeight - 30)}px`, 
                                      resize: 'none', 
                                      border: 'none',
                                      outline: 'none',
                                    }}
                                  />
                            </label>
                          </div>
              
                          {}
                          {handles.map((handle) => (
                            <Handle key={handle.id} type="source" position={handle.position} id={handle.id} style={handle.style} />
                          ))}
                        </div>
                      );
                    default:
                      return <span>Unknown Node</span>;
                  }
                };
  

  return (
    <div className="node-container" style={{ border: '1px solid #ccc', borderRadius: '10px', backgroundColor: 'rgba(67,10,137,0.9)' }}>
      {renderNode()}
    </div>
  );
};

export default NodesContainer;
