import { Suspense, useEffect, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { Fog } from 'three'
import { Leva } from 'leva'
import { useProgress, Html } from '@react-three/drei'
import { gsap } from 'gsap'

import Header from './Header'
import Popup from './Popup'

function Loader() {
  const { progress } = useProgress()
  return <Html className="loading-screen" fullscreen zIndexRange={[ 10, 0 ]}>
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <img className="w-40" src={ '/images/preloader.gif' } />
      <p className="text-2xl text-[#EFDADD]">Loading { Math.trunc( progress ) }%</p>
    </div>
  </Html>
}

export default function App() {
  const [ popupVisible, setPopupVisible ] = useState(false)
  const popupRef = useRef()
  const [ glRenderer, setGlRenderer ] = useState(null)
  const [ glScene, setGlScene ] = useState(null)

  useEffect(() => 
  {
    console.log('popup changing')
    if (popupVisible) {
      setPopupVisible( true )
      gsap.to(popupRef.current, {
        autoAlpha: 1
      })
    } else {
      setPopupVisible( false )
      gsap.to(popupRef.current, {
        autoAlpha: 0
      })
    }
  }, [ popupVisible ])

  const created = ({ gl, scene }) => 
  {
      scene.fog = new Fog('#fad6a5', 5, 15)
      // scene.fog = new Fog('#000000', 1, 5)
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
        // position: [ - 1.125, 0.5, 2.5 ]
      } }
      onCreated={ created }
    >
      <Suspense
        fallback={ <Loader /> }
      >
      <Experience 
        glRenderer={ glRenderer }
        glScene={ glScene }
        popupVisible={ popupVisible }
        setPopupVisible={ setPopupVisible }
      />
      </Suspense>
    </Canvas>
    {/* { popupVisible && */}
      <div
        ref={ popupRef } 
        className="visibility-hidden opacity-0 rollbar-hide w-screen h-screen absolute bg-[rgba(0,0,0,0.5)] flex items-start overflow-y-scroll justify-center z-50 top-0 right-0 bottom-0 left-0">
      <Popup 
        popupVisible={ popupVisible }
        setPopupVisible={ setPopupVisible }
      />
      </div>
    {/* } */}
    </>)
}