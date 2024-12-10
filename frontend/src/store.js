
import create from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges, MarkerType } from 'reactflow';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      nodeIDs: {}, 

      getNodeID: (type) => {
        const currentIDs = { ...get().nodeIDs };
        if (!currentIDs[type]) currentIDs[type] = 0;
        currentIDs[type] += 1;
        set({ nodeIDs: currentIDs });
        return `${type}-${currentIDs[type]}`;
      },

      addNode: (node) => {
        set((state) => ({
          nodes: [...state.nodes, node],
        }));
      },

      onNodesChange: (changes) => {
        set((state) => ({
          nodes: applyNodeChanges(changes, state.nodes),
        }));
      },

      onEdgesChange: (changes) => {
        set((state) => ({
          edges: applyEdgeChanges(changes, state.edges),
        }));
      },

      onConnect: (connection) => {
        set((state) => ({
          edges: addEdge(
            {
              ...connection,
              id: `edge-${state.edges.length + 1}`,
              type: 'smoothstep',
              animated: true,
              markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 },
            },
            state.edges
          ),
        }));
      },

      updateNodeData: (nodeId, newData) => {
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === nodeId
              ? { ...node, data: { ...node.data, ...newData } }
              : node
          ),
        }));
      },

      
      resetStore: () => {
        set({
          nodes: [],
          edges: [],
          nodeIDs: {},
        });
      },
    }),
    {
      name: 'flow-storage', 
      getStorage: () => localStorage, 
      partialize: (state) => ({
        nodes: state.nodes,
        edges: state.edges,
        nodeIDs: state.nodeIDs,
      }),
    }
  )
);
