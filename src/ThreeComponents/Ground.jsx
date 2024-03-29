import React, { useRef, useState, useLayoutEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three'

export default function Ground({ position, scale }) {
  const { nodes, materials } = useGLTF("/models/grass.glb")
  const [ loaded, setLoaded ] = useState(false)
  const grassMaterialRef = useRef()
  const groundRef = useRef()

  const [ colorMap, aoMap, heightMap, normalMap, roughnessMap ] = useLoader(TextureLoader, 
    [
      '/textures/grass-color.jpg',
      '/textures/grass-ao.jpg',
      '/textures/grass-height.png',
      '/textures/grass-normal.jpg',
      '/textures/grass-roughness.jpg'
    ],
    (loaded) => {
      setLoaded(true)
    }
  )

  useLayoutEffect(() => {
    // Color Texture
    colorMap.colorSpace = THREE.SRGBColorSpace
    colorMap.wrapS = THREE.RepeatWrapping
    colorMap.wrapT = THREE.RepeatWrapping
    colorMap.generateMipmaps = false
    colorMap.minFilter = THREE.NearestFilter
    colorMap.magFilter = THREE.NearestFilter

    colorMap.repeat.x = 10
    colorMap.repeat.y = 10

    aoMap.wrapS = THREE.RepeatWrapping
    aoMap.wrapT = THREE.RepeatWrapping
    aoMap.repeat.x = 10
    aoMap.repeat.y = 10

    normalMap.wrapS = THREE.RepeatWrapping
    normalMap.wrapT = THREE.RepeatWrapping
    normalMap.repeat.x = 10
    normalMap.repeat.y = 10

    heightMap.wrapS = THREE.RepeatWrapping
    heightMap.wrapT = THREE.RepeatWrapping
    heightMap.repeat.x = 10
    heightMap.repeat.y = 10

    roughnessMap.wrapS = THREE.RepeatWrapping
    roughnessMap.wrapT = THREE.RepeatWrapping
    roughnessMap.repeat.x = 10
    roughnessMap.repeat.y = 10

    
    grassMaterialRef.current.needsUpdate = true
    groundRef.current.material.needsUpdate = true
  }, [ grassMaterialRef, groundRef ])

  return (<>
    <group dispose={ null } position={ [ position.x, position.y, position.z ] } scale={ scale }>
      <mesh
        castShadow
        receiveShadow
        geometry={ nodes.Plane.geometry }
        ref={ groundRef }
      >
        <meshStandardMaterial 
          ref={ grassMaterialRef }
          color={ '#1b8e4a' }
          map={ colorMap }
          normalMap={ normalMap }
          aoMap={ aoMap }
          heightMap={ heightMap }
          roughnessMap={ roughnessMap }
        />
      </mesh>
    </group>
  </>)
}
