import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { 
    Environment,
    Clouds,
    Cloud
} from '@react-three/drei'

import Ground from './ThreeComponents/Ground.jsx'
import UpdatedMailbox from './ThreeComponents/UpdatedMailbox.jsx'
import BladesOfGrass from './ThreeComponents/BladesOfGrass.jsx'
import Fence from './ThreeComponents/Fence.jsx'

export default function Experience({ glRenderer, glScene, popupVisible, setPopupVisible })
{
    const { perfVisible } = useControls('General', {
        perfVisible: false
    })
    
    return <>
        { perfVisible && <Perf position="top-left" /> }

        <directionalLight 
            castShadow 
            position={ [ 2, 4, 3 ] }
            intensity={ 1.5 }
            scale={ 5 } 
            color={ '#fbff8c' }
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

        <Clouds material={ THREE.MeshStandardMaterial } scale={ 1.0 } position={[ 0, 0, 0 ]}>
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
    </>
}