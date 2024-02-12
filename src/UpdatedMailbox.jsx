import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useControls } from 'leva'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function UpdatedMailbox({ position, scale, visible, setPopupVisible, popupVisible }) 
{
    const { nodes, materials } = useGLTF("/models/updated-mailbox.glb")
    const [ mailboxDoorState, setMailboxDoorState ] = useState('closed')
    const [ cursor, setCursor ] = useState('default')
    const mailbox = useRef()
    const mailboxDoor = useRef()
    const mailboxDoorHinges = useRef()
    const mailboxFlag = useRef()

    useEffect(() => {
        if (cursor === 'hover') {
            document.body.style.cursor = "pointer"
        } else {
            document.body.style.cursor = "default"
        }
    }, [ cursor ])
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
            setTimeout(() => {
                setPopupVisible(true)
            }, 750)
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

            setPopupVisible(false)
            setMailboxDoorState('closed')
        }
    }, [ mailboxDoorState ])

    useEffect(() => {
        if (!popupVisible) {
            setTimeout(() => {
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
                setMailboxDoorState('closed')
            }, 250)
        }
    }, [ popupVisible ])

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
            ref={ mailboxFlag }
            geometry={nodes.mailboxFlag.geometry}
            material={materials["Flag 1"]}
            position={[-0.39, 1.343, -0.146]}
            rotation-x={ - Math.PI / 2 }
        />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.mailboxFlagHinge.geometry}
            material={materials["Metal 1"]}
            position={[-0.377, 1.351, -0.155]}
            rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.mailboxPole.geometry}
            material={materials["Wood 1"]}
            position={[-0.189, 1.139, -0.371]}
        />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.mailboxBody.geometry}
            material={materials["Metal 1"]}
            position={[-0.188, 1.356, -0.364 + 0.00018 ]}
            onClick={ eventHandler }
            onPointerEnter={ () => {
                setCursor('hover')
            }}
            onPointerLeave={ () => {
                setCursor('default')
            }}
        />
        <mesh
            ref={ mailboxDoor }
            castShadow
            receiveShadow
            geometry={nodes.mailboxDoor.geometry}
            material={materials["Metal 1"]}
            position={[0.016, 1.152, -0.038  + 0.00018 ]}
        />
        <mesh
            castShadow
            receiveShadow
            ref={ mailboxDoorHinges }
            geometry={nodes.mailboxDoorHinges.geometry}
            material={materials["Metal 1"]}
            position={[-0.188, 1.152, -0.038 + 0.00018 ]}
        />
        </group>
    </>)
}