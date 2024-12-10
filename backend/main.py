import logging
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional  
import networkx as nx
from fastapi.middleware.cors import CORSMiddleware
from pipeline import process_pipeline  


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Connection(BaseModel):
    source: str
    sourceHandle: str
    target: str
    targetHandle: str
    

class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Connection]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

class TextInput(BaseModel):
    input_text: str
    selected_model: str
    file_content: Optional[str] = None  

class TextOutput(BaseModel):
    processed_text: str

class ErrorResponse(BaseModel):
    detail: str

@app.post("/pipelines/parse", response_model=PipelineResponse)
def parse_pipeline(pipeline: Pipeline):
    try:
        nodes = pipeline.nodes
        edges = pipeline.edges

        
        node_ids = set()
        for node in nodes:
            if 'id' not in node:
                raise ValueError("Each node must have an 'id' field.")
            node_ids.add(node['id'])

        
        for edge in edges:
            if edge.source not in node_ids:
                raise ValueError(f"Edge source '{edge.source}' does not exist in nodes.")
            if edge.target not in node_ids:
                raise ValueError(f"Edge target '{edge.target}' does not exist in nodes.")

        num_nodes = len(nodes)
        num_edges = len(edges)

        
        G = nx.DiGraph()

        
        for node in nodes:
            G.add_node(node['id'])

        
        for edge in edges:
            G.add_edge(edge.source, edge.target)

        
        is_dag = nx.is_directed_acyclic_graph(G)

        logger.info(f"Parsed pipeline: {num_nodes} nodes, {num_edges} edges, is_dag={is_dag}")

        return PipelineResponse(num_nodes=num_nodes, num_edges=num_edges, is_dag=is_dag)

    except ValueError as ve:
        logger.error(f"Validation error: {ve}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.post("/process_text", response_model=TextOutput, responses={400: {"model": ErrorResponse}})
async def process_text(input_data: TextInput):
    try:
        logger.info(f"Received input_text: {input_data.input_text}")
        logger.info(f"Selected model: {input_data.selected_model}")
        logger.info(f"File content: {input_data.file_content}")

        
        result = process_pipeline(input_data.input_text, input_data.selected_model, input_data.file_content)

        logger.info(f"Processed text: {result}")
        return TextOutput(processed_text=result)
    except Exception as e:
        logger.error(f"Error processing text: {e}")
        raise HTTPException(status_code=400, detail=str(e))
