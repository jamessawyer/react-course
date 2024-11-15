import { useEffect, useRef, useState } from 'react'
import Calendar, { CalendarRef } from './Calendar'
import Calendar2 from './Calendar2'

// https://juejin.cn/book/7294082310658326565/section/7298714932726464538

function App() {
  const calendarRef = useRef<CalendarRef>(null)

  useEffect(() => {
    console.log('getDate(): ', calendarRef.current?.getDate().toLocaleDateString())

    setTimeout(() => {
      calendarRef.current?.setDate(new Date('2028-09-18'))
    }, 3000)
  }, [])

  const [time, setTime] = useState(new Date('2021-09-18'))

  return (
    <>
      <Calendar defaultValue={new Date('2023-09-18')} 
        onChange={date => {
          alert(date.toLocaleDateString())
        }} 
      />
      <Calendar ref={calendarRef} defaultValue={new Date('2025-03-18')} />

      <hr />
      <Calendar value={time} onChange={(date) => {
        alert('受控模式: ' + date.toLocaleDateString())
        setTime(date)
      }} />
      <hr />
      <h1>Calendar2</h1>
      <Calendar2 value={time} onChange={(date) => {
        alert('受控模式: ' + date.toLocaleDateString())
        setTime(date)
      }} />
    </>
  )
}

export default App
