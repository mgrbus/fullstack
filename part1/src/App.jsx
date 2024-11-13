import { useState } from "react"

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Button = ({ name, onClick }) => {
  return (
    <button onClick={onClick} >{name}</button>
  )
}

const Content = ({ onBad, onGood, onNeutral }) => {
  return (
    <div>
      <Button name='good' onClick={onGood} />
      <Button name='neutral' onClick={onNeutral} />
      <Button name='bad' onClick={onBad} />
      <h1>statistics</h1>
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td style={{width:'80px'}}>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ count, good, bad, neutral }) => {
  if (count === 0) {
    return (<p>No feedback given</p>)
  }
  let average = (good - bad) / count
  let positive = good / count * 100

  return (
    <table>
      <tbody>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={count} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={`${positive} %`} />
      </tbody>
    </table>
  )
}

const App = () => {
  const course = 'give feedback'
  const [count, setCount] = useState(0)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveGood = () => {
    setCount(count + 1)
    setGood(good + 1)
  }
  const giveBad = () => {
    setCount(count + 1)
    setBad(bad + 1)
  }
  const giveNeutral = () => {
    setCount(count + 1)
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <Header course={course} />
      <Content onGood={giveGood} onBad={giveBad} onNeutral={giveNeutral} />
      <Statistics count={count} good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
