import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  )
}




const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const [big,setBig] = useState(0)

  const changeAnectode = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const voteAnectode = () => {
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)
    let biggest=0
    let ind=0
    for(let i=0; i<copy.length; i++){
      if (copy[i]>biggest){
        biggest=copy[i]
        ind=i
      }
    }
    setBig(ind)
  }


  return (
    <div>
      <h2>Anectode of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <br></br>
      <Button onClick={voteAnectode} text='vote' />
      <Button onClick={changeAnectode} text='change anectode' />
      <h2>Anectode with most votes</h2>
      <p>{anecdotes[big]}</p>
    </div>
  )
}

export default App