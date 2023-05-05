import { useState } from "react"

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticsLine = ({text, value, suffix}) => {
  return (
      <tr><td>{text}</td><td>{value}{suffix}</td></tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good+neutral+bad
  const average = (good + (-1)*bad)/total
  const positive = good/total*100
  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
      <StatisticsLine text="good" value={good} suffix="" />
      <StatisticsLine text="neutral" value={neutral} suffix="" />
      <StatisticsLine text="bad" value={bad} suffix="" />
      <StatisticsLine text="all" value={total} suffix="" />
      <StatisticsLine text="average" value={average.toFixed(1)} suffix="" />
      <StatisticsLine text="postivie" value={positive.toFixed(1)} suffix=" %" />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
    <h1>Give feedback</h1>
    <Button text = 'good' handleClick={() => {setGood(good + 1)}} />
    <Button text = 'neutral' handleClick={() => {setNeutral(neutral + 1)}} />
    <Button text = 'bad' handleClick={() => {setBad(bad + 1)}} />
    <h1>Statistics</h1>
    <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </>
  )
}

export default App