import { animated, useSpring } from '@react-spring/web'
import { range } from 'd3'
import { useEffect, useRef, useState } from 'react'
import { useInterval } from './components/useInterval'
import { useIsInView } from './components/useIsInView'

const allCircles = range(0, 6)
const generateCircles = () => allCircles.filter(() => Math.random() < 0.5)

export default function App() {
  const [ref, isInView] = useIsInView()
  const [dataset, setDataset] = useState(generateCircles())

  useInterval(
    () => {
      setDataset(generateCircles())
    },
    isInView ? 1000 : null,
  )

  return (
    <svg viewBox="0 0 100 20" width="100%" ref={ref}>
      {allCircles.map((d) => (
        <TransitionsWithReactCircle key={d} index={d} isShowing={dataset.includes(d)} />
      ))}
    </svg>
  )
}

const TransitionsWithReactCircle = ({ index, isShowing }) => {
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
