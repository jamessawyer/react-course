import dayjs from 'dayjs'
import Calendar from './components/Calendar'

function App() {

  return (
    <>
      <Calendar
        value={dayjs('2024-12-16')}
        onChange={date => {
          alert('选中了 ' + date.format('YYYY-MM-DD'))
        }}
      />
      <hr />
      <h1>自定义样式</h1>
      <Calendar
        value={dayjs('2023-11-08')}
        className={'aaa'}
        style={{background: 'yellow'}}
      />
      <hr />
      <h1>自定义渲染dateRender</h1>
      <Calendar
        value={dayjs('2025-12-16')}
        dateRender={(value) => {
          return (
            <div>
              <span>{value.format('YYYY/MM/DD')}</span>
            </div>
          )
        }}
      />
      
      <hr />
      <h1>自定义渲染dateInnerContent</h1>
      <Calendar
        value={dayjs('2024-11-16')}
        locale='en-US'
        onChange={date => {
          alert('选中了 ' + date.format('YYYY-MM-DD'))
        }}
        dateInnerContent={(value) => {
          return (
            <div>
              <p style={{background: 'yellowgreen', height: '30px'}}>
                {value.format('YYYY/MM/DD')}
              </p>
            </div>
          )
        }}
      />
      <hr />
      <h1>非受控模式</h1>
      <Calendar
        defaultValue={dayjs('2024-12-16')}
      />
    </>
  )
}

export default App
