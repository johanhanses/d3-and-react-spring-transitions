import { range } from 'd3'
import { useState } from 'react'
import { TransitionCircle } from './components/TransitionsCircle'
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
        <TransitionCircle key={d} index={d} isShowing={dataset.includes(d)} />
      ))}
    </svg>
  )
}
