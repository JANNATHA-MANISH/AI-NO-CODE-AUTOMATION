import { PipelineToolbar } from './Components/toolbar/toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './Components/submit/submit';
import './App.css';

function App() {
  return (
    <div className='app-container'>
      <PipelineToolbar />
      <div className='button-container'>
        <PipelineUI />
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
