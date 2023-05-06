import { useState } from 'react'

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  const [best, setBest] = useState(0)

  const randomInt = (x) => {
    let y = selected
    while (y === selected){
      y = Math.floor(Math.random()*(x))
    }
    return y
  }

  const updatePoints = (x) => {
    const copy = [...points]
    copy[x] += 1
    setPoints(copy)
    if (copy[x] > copy[best]) {
      setBest(x)
    }
  }

  return (
    <>
    <div>
    <h1>Anecdote of the day</h1>
    <p>{anecdotes[selected]}</p>
    <p>has {points[selected]} votes</p>
    <Button text = "vote" handleClick={()=>updatePoints(selected)} />
    <Button text = "next anecdote" handleClick={()=>setSelected(randomInt(anecdotes.length))} />
    <h1>Anecdote with most votes</h1>
    <p>{anecdotes[best]}</p>
    <p>has {points[best]} votes</p>
    </div>
    </>
  )
}

export default App