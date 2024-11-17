import dayjs from 'dayjs'
import Calendar from './components/Calendar'

function App() {

  return (
    <Calendar value={dayjs('2024-11-16')} />
  )
}

export default App
