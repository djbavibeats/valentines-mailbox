import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"

export default function Ground({ position, scale }) {
  const { nodes, materials } = useGLTF("/models/ground.glb") 
  return (<>
    <group dispose={ null } position={ [ position.x, position.y, position.z ] } scale={ scale }>
      <mesh
        castShadow
        receiveShadow
        geometry={ nodes.Plane001.geometry }
        material={ materials.Dirt }
      />
      <mesh
        castShadow
        receiveShadow
        geometry={ nodes.Plane001_1.geometry }
        material={ materials.Grass }
      />
    </group>
  </>)
}
