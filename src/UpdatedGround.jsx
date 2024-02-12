import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"

export default function UpdatedGround({ position, scale }) {
  const { nodes, materials } = useGLTF("/models/updated-ground.glb") 
  return (<>
    <group dispose={ null } 
    position={ [ position.x, position.y, position.z ] } 
    scale={ scale }
    rotation-y={ Math.PI * 0.25 }
    >
      {/* <mesh
        castShadow
        receiveShadow
        geometry={ nodes.Plane001.geometry }
        material={ materials.Dirt }
      /> */}
      {/* <mesh
        castShadow
        receiveShadow
        geometry={ nodes.Plane001_1.geometry }
        material={ materials.Grass }
      /> */}
      
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials.Grass}
        // scale={1}
      />
    </group>
  </>)
}
