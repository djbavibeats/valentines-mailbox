/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"

export default function Fence({ position, scale }) {
  const { nodes, materials } = useGLTF("/models/fence-large.glb")
  return (
    <group position={[ position.x, position.y, position.z ]} scale={ scale } dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials["Wood 1"]}
        position={[-1.596, 0, -1.773]}
      />
    </group>
  )
}

useGLTF.preload("/models/fence.glb")