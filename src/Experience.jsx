import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { 
    OrbitControls, 
    Environment,
    Sky,
    Clouds,
    Cloud
} from '@react-three/drei'

import Ground from './Ground.jsx'
import UpdatedMailbox from './UpdatedMailbox.jsx'
import BladesOfGrass from './BladesOfGrass.jsx'
import UpdatedGround from './UpdatedGround.jsx'
import Fence from './Fence.jsx'
// import HDREnvironment from './HDREnvironment.jsx'

export default function Experience({ glRenderer, glScene, popupVisible, setPopupVisible })
{
    const { perfVisible, orbitEnabled } = useControls('General', {
        perfVisible: false,
        orbitEnabled: true
    })
    const { position, scale, visible } = useControls('Mailbox', { 
        position:
        {
            value: 
            { 
                x: 0, 
                y: 0.1375
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
    const { sunPosition } = useControls('sky', {
        sunPosition: { value: [ 2, 4, 3 ] }
    })
    
    return <>
        { perfVisible && <Perf position="top-left" /> }
        { orbitEnabled && 
            <OrbitControls 
                enableZoom={ false } 
                enablePan={ false } 
                enableRotate={ false }
                maxPolarAngle={ Math.PI / 2 }
                maxAzimuthAngle={ Math.PI / 2}
            /> 
        }

        <directionalLight 
            castShadow 
            position={ sunPosition }
            intensity={ 1.5 }
            scale={ 5 } 
            color={ '#fbff8c' }
            // color={ '#0f0f0f' }
        />
        <Environment 
            preset="sunset"
            background={ false }
        />
 
        <UpdatedMailbox
            position={ {
                x:   0.175,
                y: - 1.29,
                z:   0.25
            } }
            scale={ 1.25 }
            visible={ true }
            popupVisible={ popupVisible }
            setPopupVisible={ setPopupVisible }
        />
        <BladesOfGrass
            position={ {
                x:   0.175,
                y: - 1.29,
                z:   0.25
            } }
            scale={ 1.25 }
        />

        <Clouds seed material={ THREE.MeshStandardMaterial } scale={ 1.0 } position={[ 0, 0, 0 ]}>
            <Cloud 
                seed={ 2 }
                segments={ 5 } 
                bound={ [ 1, 1, 4 ] } 
                volume={ 5 }
                opacity={ 0.25 }
                speed={ 0.25 } 
                color="#fbff8c" 
            />
        </Clouds>

        <Ground 
            position={ { 
                x: 0,
                y: -0.865,
                z: 0.85
            } }
            scale={ 3.5 }
        />

        <Fence 
            position={ { 
                x: 0.4,
                y: - 0.9,
                z: 0.3
            } }
            scale={ 3.4 }
        />
        {/* <UpdatedGround
            position={ {
                x:  0.00,
                y: -2.0,
                z: -2.10
            } }
            scale={ 5 }
        /> */}
    </>
}