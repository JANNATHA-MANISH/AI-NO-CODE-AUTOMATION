// /frontend/src/submit.js

import React from 'react';
import { useStore } from '../../store';
import axios from 'axios';
import './submit.css';

export const SubmitButton = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const handleSubmit = async () => {
    try {
      // First, send nodes and edges to the parse endpoint
      const parseResponse = await axios.post('http://localhost:8000/pipelines/parse', {
        nodes,
        edges,
      });

      const { num_nodes, num_edges, is_dag } = parseResponse.data;
      console.log(`Pipeline Summary for ${num_nodes} nodes and ${num_edges} edges:`, parseResponse.data);

      alert(
        `Pipeline Summary:\nNumber of Nodes: ${num_nodes}\nNumber of Edges: ${num_edges}\nIs DAG: ${is_dag}`
      );

      // Now, find all LLM nodes to process their inputs
      const llmNodes = nodes.filter((node) => node.type === 'llm');

      for (const llmNode of llmNodes) {
        const llmInput = nodeDataValue(llmNode, 'llmInput');
        const fileContent = nodeDataValue(llmNode, 'fileContent') || ""; // Default to empty string
        const selectedModel = nodeDataValue(llmNode, 'selectedModel');

        // Debugging logs
        console.log(`Processing LLM Node ID: ${llmNode.id}`);
        console.log(`llmInput: ${llmInput}`);
        console.log(`fileContent: ${fileContent}`);
        console.log(`selectedModel: ${selectedModel}`);

        // Only process if there is input text
        if (llmInput) {
          try {  
            const geminiResponse = await axios.post('http://localhost:8000/process_text', {
              input_text: llmInput,
              selected_model: selectedModel,
              file_content: fileContent, // Ensure this is a string
            }, {
              headers: {
                'Content-Type': 'application/json',
              },
            });

            console.log(`Gemini AI Response for Node ${llmNode.id}:`, geminiResponse.data.processed_text);
          } catch (llmError) {
            console.error(`Error processing LLM Node ${llmNode.id}:`, llmError);
            // Enhanced error message handling
            let errorMessage = 'Unknown error.';
            if (llmError.response) {
              if (typeof llmError.response.data.detail === 'string') {
                errorMessage = llmError.response.data.detail;
              } else if (typeof llmError.response.data.detail === 'object') {
                errorMessage = JSON.stringify(llmError.response.data.detail);
              }
            } else if (llmError.message) {
              errorMessage = llmError.message;
            }
            alert(`Error processing LLM Node ${llmNode.id}: ${errorMessage}`);
          }
        }

        // Optionally, process file content if needed
        if (fileContent) {
          // Implement file processing if required
          console.log(`File Content for Node ${llmNode.id}:`, fileContent);
        }
      }
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      // Enhanced error message handling
      let errorMessage = 'Failed to submit the pipeline. Please try again.';
      if (error.response) {
        if (typeof error.response.data.detail === 'string') {
          errorMessage = error.response.data.detail;
        } else if (typeof error.response.data.detail === 'object') {
          errorMessage = JSON.stringify(error.response.data.detail);
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      alert(`Error: ${errorMessage}`);
    }
  };

  // Helper function to safely access nested properties
  const nodeDataValue = (node, key) => {
    return node.data && node.data[key] ? node.data[key] : null;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={handleSubmit} type="submit" className="submitButton">
        Submit
      </button>
    </div>
  );
};
