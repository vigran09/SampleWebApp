import { lazy, Suspense } from 'react'
import { Canvas, } from '@react-three/fiber'

const ModelComponent = lazy(() => import("./model"));

export default function Spinner({ ...props }) {
  return (
    <Suspense fallback={"loading please wait...."}>
      <Canvas
        camera={{ position: [1, 1, 1] }}
      >
        <ModelComponent />
        <color attach="background" args={["hotpink"]} />
      </Canvas>
    </Suspense>
  )
}