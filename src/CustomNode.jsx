import React from 'react'
import { Handle, Position, useEdgesState, useNodes, useNodesState, useReactFlow, } from 'reactflow'
import './App.css'

function CustomNode({id, data}) {
    const {setNodes} = useReactFlow();
    const handleDelete = (e) => {
      e.stopPropagation()
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
    }
    
  return (
    <div className='node' style={{position: 'relative', background: 'transparent', padding: '5px', height: '40px', color:'#1d1d1f', width: '100px', border: '0.4rem solid #05d959', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Handle type="source" position={Position.Bottom} id="b" isConnectable={true} />
        <Handle type="target" position={Position.Top} id="b" isConnectable={true} />
        <p style={{fontSize: '1.4rem', fontWeight: '500'}}>{data.label}</p>
        <button className='deleteNodeBtn' style={{position: 'absolute', right: '-1rem', top: '-1rem', zIndex: 999}}  onClick={handleDelete} 
        >x</button>
    </div>
  )
}

export default CustomNode