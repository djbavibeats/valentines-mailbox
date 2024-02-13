import React from "react"
import { useGLTF } from "@react-three/drei"
import * as THREE from 'three'

export default function BladesOfGrass({ position, scale }) {
  const { nodes, materials } = useGLTF("/models/bladesOfGrass.glb")

  const grassMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x00560A
})

  return (
    <group position={ [ position.x, position.y, position.z ] } scale={ scale } dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BladeOfGrass001.geometry}
        material={ grassMaterial }
        position={[-0.257, 0, -0.675]}
        rotation={[0, -0.567, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BladeOfGrass002.geometry}
        material={ grassMaterial }
        position={[-0.119, 0, -0.685]}
        rotation={[0, 1.041, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BladeOfGrass003.geometry}
        material={ grassMaterial }
        position={[-0.243, 0, -0.818]}
        rotation={[Math.PI, -0.404, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BladeOfGrass004.geometry}
        material={ grassMaterial }
        position={[-0.124, 0, -0.809]}
        rotation={[-Math.PI, 1.088, -Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BladeOfGrass005.geometry}
        material={ grassMaterial }
        position={[-0.253, 0, -0.777]}
        rotation={[Math.PI, -1.529, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BladeOfGrass006.geometry}
        material={ grassMaterial }
        position={[-0.214, 0, -0.678]}
        rotation={[0, -0.028, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BladeOfGrass007.geometry}
        material={ grassMaterial }
        position={[-0.273, 0, -0.714]}
        rotation={[0, -1.344, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BladeOfGrass008.geometry}
        material={ grassMaterial }
        position={[-0.142, 0, -0.679]}
        rotation={[0, -0.418, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BladeOfGrass009.geometry}
        material={ grassMaterial }
        position={[-0.124, 0, -0.712]}
        rotation={[-Math.PI, 1.007, -Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BladeOfGrass.geometry}
        material={ grassMaterial }
        position={[-0.193, 0.0, -0.649]}
        rotation={[0, -1.06, 0]}
      />
    </group>
  )
}

useGLTF.preload("/bladesOfGrass.glb")