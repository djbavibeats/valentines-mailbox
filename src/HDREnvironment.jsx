import { Environment } from '@react-three/drei'
import * as THREE from 'three'
import { useState, useEffect } from 'react'
import { HDRJPGLoader } from '@monogrid/gainmap-js'

export default function HDREnvironment({ glRenderer, glScene }) {
    useEffect(() => {
        if (glScene) {
            const loader = new HDRJPGLoader( glRenderer ) 
            loader.loadAsync( '/hdris/sunset_774kb.jpg' )
            // loader.loadAsync( '/hdris/try/spruit_sunrise_4k.jpg' )
            // loader.loadAsync( '/hdris/try/hillside_4k.jpg')
            // loader.loadAsync( '/hdris/ehingen_hillside_4k.jpg' )
                .then(res => {
                    console.log(res)
                    let tex = res.renderTarget.texture
                    // tex.rotation = Math.PI / 2
                    tex.generateMipmaps = false
                    tex.minFilter = THREE.LinearFilter
                    tex.magFilter = THREE.LinearFilter
                    tex.needsUpdate = true
                    if (glScene) {
                        glScene.background = tex
                        glScene.background.mapping = THREE.EquirectangularReflectionMapping
                        glScene.environment = tex
                    }
                })
        } else {
            console.log('scene is not ready')
        }
    }, [ glScene ])

    return(<>
    {/* <Environment files={ '/hdris/lonely_road_Afternoon_4k.hdr' } background={ true } /> */}
    </>)
}