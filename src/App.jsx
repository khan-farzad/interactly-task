import React, { useCallback, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import CustomEdge from "./CustomEdge";

import './App.css'
const nodeTypes = { customNode: CustomNode };
const edgeTypes = { customEdge: CustomEdge };

function App() {
  const [input, setInput] = useState("");
  const [activeId, setActiveId] = useState(0);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleCreate = () => {
    setNodes((nodes) => [
      ...nodes,
      {
        id: `${
          nodes.length >= 1
            ? parseInt(nodes[nodes.length - 1].id) + parseInt(1)
            : 1
        }`,
        type: "customNode",
        position: {
          x: nodes.length >= 1 ? nodes[nodes.length - 1].position.x : 150,
          y: nodes.length >= 1 ? nodes[nodes.length - 1].position.y + 150 : 10,
        },
        data: {
          label:
            nodes.length >= 1
              ? `${parseInt(nodes[nodes.length - 1].id) + parseInt(1)}`
              : 1,
        },
      },
    ]);
    if (nodes.length >= 1) {
      setEdges((edges) => [
        ...edges,
        {
          id: `e${nodes[nodes.length - 1].id}-${
            parseInt(nodes[nodes.length - 1].id) + parseInt(1)
          }`,
          type: "customEdge",
          source: `${nodes[nodes.length - 1].id}`,
          target: `${parseInt(nodes[nodes.length - 1].id) + parseInt(1)}`,
        },
      ]);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <button className="newNodeBtn" onClick={handleCreate}>
        +
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={(e, x) => setActiveId(x.id)}
      >
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
      {activeId && (
        <div
          style={{
            width: "150px",
            border: "1px solid #111",
            backgroundColor: "#fff",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            padding: "1rem",
            right: "10px",
          }}
        >
          <input
            value={input}
            style={{
              height: "1.5rem",
              outline: "2px solid #05d959",
              borderRadius: "5px",
              border: "none",
              marginBottom: "1rem",
            }}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="renameBtn" onClick={() => setActiveId(0)}>
            Cancel
          </button>
          <button
            className="renameBtn"
            onClick={() => {
              setNodes((nds) =>
                nds.map((node) => {
                  if (node.id === activeId) {
                    node.data = {
                      label: input,
                    };
                  }
                  return node;
                })
              );
              setActiveId(0);
              setInput("");
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
