

import { Position } from 'reactflow'; 
import React from 'react';


const nodeConfig = {
  llm: {
    label: 'LLM',
    className: 'llm-node-container',
    fields: [
      {
        type: 'textarea',
        label: 'Input Text',
        key: 'llmInput',
        placeholder: 'Enter input text for the LLM...',
      },
      {
        type: 'select',
        label: 'Select Model',
        key: 'selectedModel',
        options: ['Gemini', 'Llama', 'ChatGPT'],
      },
      {
        type: 'file',
        label: 'Upload File',
        key: 'fileContent',
      },
    ],
    handles: {
      source: Position.Right,
      target: Position.Left,
    },
  },
  discord: {
    label: 'Discord',
    className: 'discord-node-container',
    fields: [
      {
        type: 'text',
        label: 'Webhook URL',
        key: 'webhookUrl',
        placeholder: 'Enter Discord Webhook URL...',
      },
      {
        type: 'textarea',
        label: 'Message Template',
        key: 'messageTemplate',
        placeholder: 'Enter message template...',
      },
    ],
    handles: {
      source: Position.Right,
      target: Position.Left,
    },
  },
  notion: {
    label: 'Notion',
    className: 'notion-node-container',
    fields: [
      {
        type: 'text',
        label: 'API Token',
        key: 'apiToken',
        placeholder: 'Enter Notion API Token...',
      },
      {
        type: 'text',
        label: 'Database ID',
        key: 'databaseId',
        placeholder: 'Enter Notion Database ID...',
      },
    ],
    handles: {
      source: Position.Right,
      target: Position.Left,
    },
  },
  customInput: {
    label: 'Custom Input',
    className: 'custom-input-node-container',
    fields: [
      {
        type: 'text',
        label: 'Custom Field',
        key: 'customField',
        placeholder: 'Enter custom input...',
      },
    ],
    handles: {
      source: Position.Right,
      target: Position.Left,
    },
  },
  customOutput: {
    label: 'Custom Output',
    className: 'custom-output-node-container',
    fields: [
      {
        type: 'output', 
        key: 'customOutput',
        placeholder: 'No output yet.',
      },
    ],
    handles: {
      source: Position.Right,
      target: Position.Left,
    },
  },
  text: {
    label: 'Text',
    className: 'text-node-container',
    fields: [
      {
        type: 'textarea',
        label: 'Text',
        key: 'text',
        placeholder: 'Enter text...',
      },
    ],
    handles: {
      source: Position.Right,
      target: Position.Left,
    },
  },
  
};

export default nodeConfig;
