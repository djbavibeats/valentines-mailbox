import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { Fog } from 'three'
import { Leva } from 'leva'
import { useProgress, Html } from '@react-three/drei'

import Header from './Header'

function Loader() {
  const { progress } = useProgress()
  return <Html className="loading-screen" fullscreen zIndexRange={[ 10, 0 ]}>
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <img className="w-40" src={ '/images/preloader.gif' } />
      <p className="text-2xl text-[#fbff8c]">Loading { Math.trunc( progress ) }%</p>
    </div>
  </Html>
}

export default function App() {
    const [ glRenderer, setGlRenderer ] = useState(null)
    const [ glScene, setGlScene ] = useState(null)

    const created = ({ gl, scene }) => 
    {
        scene.fog = new Fog('#fad6a5', 5, 15)
        setGlRenderer(gl)
        setGlScene(scene)
    }

    return (<>
    <Leva collapsed hidden />
    <Header />
    <Canvas
      shadows
      camera={ {
        fov: 45,
        near: 0.1,
        far: 200,
        position: [ - 1.125, 0.0, 2.5 ] 
      } }
      onCreated={ created }
    >
      <Suspense
        fallback={ <Loader /> }
      >
      <Experience 
        glRenderer={ glRenderer }
        glScene={ glScene }
      />
      </Suspense>
    </Canvas>
    </>)
}