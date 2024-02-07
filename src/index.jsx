import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { Fog } from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

const created = ({ gl, scene }) => 
{
  scene.fog = new Fog('#fad6a5', 0.5, 15)
  console.log('WebGL Renderer', gl)
}
root.render(
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
    <Experience />
  </Canvas>
)