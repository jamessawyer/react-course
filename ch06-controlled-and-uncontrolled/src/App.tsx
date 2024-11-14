import UncontrolledCalendar from './components/Uncontrolled.tsx'
import ControlledCalendar from './components/Controlled.tsx'
import './App.css'
import { useState } from 'react'
import MixCalendar from './components/Mixed.tsx'
import MixCalendar2 from './components/Mixed2.tsx'
import MixCalendar3 from './components/Mixed3.tsx'


// https://juejin.cn/book/7294082310658326565/section/7363322372784390196
// 受控模式 vs 非受控模式
// value 由用户控制就是非受控模式，由代码控制就是受控模式
// 非受控模式 就是完全用户自己修改 value，我们只是设置个 defaultValue，可以通过 onChange 或者 ref 拿到表单值。
// 受控模式   是代码来控制 value，用户输入之后通过 onChange 拿到值然后 setValue，触发重新渲染。
function App() {
  const [value, setValue] = useState(new Date('2024-12-11'))
  return (
    <>
      <h1>非受控模式 defaultValue + onChange</h1>
      <UncontrolledCalendar 
        defaultValue={new Date('2024-11-11')}
        onChange={ date => console.log(date.toLocaleDateString()) }
      />
      <hr />
      <h1>受控模式 value + onChange + setState</h1>
      <ControlledCalendar
        value={value}
        onChange={ date => {
          console.log(date.toLocaleDateString())
          setValue(date)
        }}
      />
      <hr />
      <hr />
      <h1>混合模式 - 非受控模式</h1>
      <MixCalendar
        defaultValue={new Date('2025-06-11')}
        onChange={date => {
          console.log(date.toLocaleDateString())
        }}
      />
      <hr />
      <h1>混合模式 - 受控模式</h1>
      <MixCalendar
        value={value}
        onChange={date => {
          console.log(date.toLocaleDateString())
          setValue(date)
        }}
      />
      <hr />
      <hr />
      <h1>混合模式with hooks - 非受控模式</h1>
      <MixCalendar2
        defaultValue={new Date('2025-06-11')}
        onChange={date => {
          console.log(date.toLocaleDateString())
        }}
      />
      <hr />
      <h1>混合模式with hooks - 受控模式</h1>
      <MixCalendar2
        value={value}
        onChange={date => {
          console.log(date.toLocaleDateString())
          setValue(date)
        }}
      />
      <hr />
      <hr />
      <h1>混合模式hooks包含onChange - 非受控模式</h1>
      <MixCalendar3
        defaultValue={new Date('2025-06-11')}
        onChange={date => {
          console.log(date.toLocaleDateString())
        }}
      />
      <hr />
      <h1>混合模式hooks包含onChange - 受控模式</h1>
      <MixCalendar3
        value={value}
        onChange={date => {
          console.log(date.toLocaleDateString())
          setValue(date)
        }}
      />
    </>
  )
}

export default App
