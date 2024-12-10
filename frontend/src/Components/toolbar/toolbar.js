// toolbar.js

import { DraggableNode } from './draggableNode';
import './toolbar.css';

export const PipelineToolbar = () => {

    return (
        <div style={{ backgroundColor: '#342870', borderRadius: '10px', borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px',height:'20%' }}>
            <h1 style={{ color: '#ffffff', fontSize: '20px', marginLeft: '10px' }}>Build Your Pipeline</h1>
            <div style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>

                <DraggableNode type='customInput' label='Input' className='customInput' />
                <DraggableNode type='llm' label='LLM' className='llm' />
                <DraggableNode type='customOutput' label='Output' className='customOutput' />
                <DraggableNode type='text' label='Text' className='text' />
                <DraggableNode type='discord' label='Discord' className='discord' />
                <DraggableNode type='notion' label='Notion' className='notion' />

            </div>
        </div>
    );
};
