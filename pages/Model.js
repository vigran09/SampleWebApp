import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model() {
  const model = useGLTF("http://localhost:3000/gltf/source/obj.glb")
  return (
     <primitive object={model.scene} />
  )
}