import { animated, useSpring } from '@react-spring/web'
import { useEffect, useRef } from 'react'

export const TransitionCircle = ({ index, isShowing }) => {
  const wasShowing = useRef(false)

  useEffect(() => {
    wasShowing.current = isShowing
  }, [isShowing])

  const style = useSpring({
    config: {
      duration: 1200,
    },
    r: isShowing ? 6 : 0,
    opacity: isShowing ? 1 : 0,
  })

  return (
    <animated.circle
      cx={index * 15 + 10}
      cy="10"
      fill={!isShowing ? 'tomato' : !wasShowing.current ? 'cornflowerblue' : 'lightgrey'}
      {...style}
    />
  )
}
