import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { OrbitControls } from '@react-three/drei'

import Mailbox from './Mailbox.jsx'

export default function Experience()
{
    const { perfVisible, orbitEnabled } = useControls('General', {
        perfVisible: true,
        orbitEnabled: true
    })
    const { position, scale, visible } = useControls('Mailbox', { 
        position:
        {
            value: 
            { 
                x: 0, 
                y: 0 
            },
            step: 0.01,
            joystick: 'invertY'
        },
        scale:
        {
            value:  1.00,
            min:    0.01,
            max:    5.00,
            step:   0.01,
        },
        visible: true
    })
    
    return <>
        { perfVisible && <Perf position="top-left" /> }
        { orbitEnabled && <OrbitControls /> }

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />
        <mesh 
            castShadow
            position-x={ position.x } position-y={ position.y }
            scale={ scale }
            visible={ visible }
        >
            <torusKnotGeometry />
            <meshNormalMaterial />
        </mesh>
        <Mailbox 
            position={ { 
                x: position.x,
                y: position.y 
            } }
            scale={ scale }
            visible={ visible }
        />

        {/* Ground */}
        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>
    </>
}