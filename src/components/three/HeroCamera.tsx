import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { gsap, ScrollTrigger } from '~/lib/gsap'

/**
 * HeroCamera (3D) — scroll-driven camera choreography.
 * 
 * Wires the R3F camera to a GSAP timeline with ScrollTrigger.
 * As the user scrolls down the page, the camera moves around the capsule.
 */
export function HeroCamera() {
  const { camera } = useThree()

  useEffect(() => {
    // Initial camera position (desktop vs mobile handling could go here)
    camera.position.set(0, 0, 8)
    camera.lookAt(0, 0, 0)

    // The scroll proxy element is defined in HeroSection.tsx
    // It's a tall invisible div that we scrub against
    const triggerEl = document.querySelector('#hero-scroll-proxy')
    if (!triggerEl) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // 1 second smoothing
      },
    })

    // Keyframe 1: Move close and right
    tl.to(camera.position, {
      x: 3,
      y: 1,
      z: 5,
      ease: 'power1.inOut',
    }, 0)

    // Keyframe 2: Sweep left and up
    tl.to(camera.position, {
      x: -2,
      y: 2,
      z: 4,
      ease: 'power1.inOut',
    }, 1)

    // Keyframe 3: Pull back to see full product array
    tl.to(camera.position, {
      x: 0,
      y: 0,
      z: 10,
      ease: 'power2.inOut',
    }, 2)

    // Keep camera looking at origin during all movements
    tl.eventCallback('onUpdate', () => {
      camera.lookAt(0, 0, 0)
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === triggerEl) t.kill()
      })
    }
  }, [camera])

  return null // This component just controls the camera, no visible output
}
