import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useControls } from 'leva'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function Mailbox({ position, scale, visible }) 
{
    const { nodes, materials } = useGLTF("/models/mailbox-nomad.glb")
    const [ mailboxDoorState, setMailboxDoorState ] = useState('closed')
    const mailbox = useRef()
    const mailboxDoor = useRef()
    const mailboxDoorHinges = useRef()
    const mailboxFlag = useRef()

    const { flagRotation } = useControls('Flag', {
        rotation: {
            value: 0,
            min: 0,
            max: 90,
            step: 0.1
        }
    })

    const eventHandler = (event) => {
        if (mailboxDoorState === 'open') {
            setMailboxDoorState('closed')
        } else if (mailboxDoorState === 'closed') {
            setMailboxDoorState('open')
        }
    }
    useEffect(() => {
        if (mailboxDoorState === 'open' ) {
            gsap.to(mailboxDoor.current.rotation, {
                x: Math.PI / 1.125
            })
            gsap.to(mailboxDoorHinges.current.rotation, {
                x: Math.PI / 1.125
            })
            gsap.to(mailboxFlag.current.rotation, {
                x: 0,
                delay: 0.125
            })
        } else {
            gsap.to(mailboxDoor.current.rotation, {
                x: 0,
                delay: 0.125
            })
            gsap.to(mailboxDoorHinges.current.rotation, {
                x: 0,
                delay: 0.125
            })
            gsap.to(mailboxFlag.current.rotation, {
                x: - Math.PI / 2
            })
        }
    }, [ mailboxDoorState ])

    return (<>
        <group
            position-x={ position.x }
            position-y={ position.y }
            position-z={ position.z }
            scale={ scale }
            visible={ visible }
        >
            <mesh
                castShadow
                receiveShadow
                geometry={ nodes.mailboxBody.geometry }
                material={ materials["Metal 1"] }
                position={ [ 0.0, 0.012, - 0.293 ] }
                onClick={ eventHandler }
            />
            <mesh
                ref={ mailboxDoor }
                castShadow
                receiveShadow
                geometry={ nodes.mailboxDoor.geometry }
                material={ materials["Metal 1"] }
                position={ [ 0.0, 0.008, 0.344 ] }
            />
            <mesh
                ref={ mailboxDoorHinges }
                castShadow
                receiveShadow
                geometry={ nodes.mailboxDoorHinges.geometry }
                position={ [ - 0.079, 0.008, 0.344 ] }
                material={ materials["Metal 1"] }
            >
                {/* <meshStandardMaterial color="0x454545" /> */}
            </mesh>
            
            <mesh
                ref={ mailboxFlag }
                castShadow
                receiveShadow
                geometry={ nodes.mailboxFlag.geometry }
                material={ materials["Flag 1"] }
                position={ [ - 0.195, 0.204, 0.225 ] }
                rotation-x={ - Math.PI / 2 }
            />
            <mesh
                castShadow
                receiveShadow
                geometry={ nodes.mailboxPole.geometry }
                material={ materials["Wood 1"] }
                position={ [ 0.0, 0.0, 0.0 ] }
            />
        </group>
    </>)
}