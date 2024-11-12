import { CSSProperties, HTMLAttributes, MouseEventHandler, PropsWithChildren, useEffect, useRef, useState } from 'react'

import './App.css'
import WrappedComp, { CompRef } from './forwardRef'
import Buttons from './useReducerType'

// React.ReactNode
interface AaaProps {
  name: string
  content: React.ReactNode // 注意和 JSX.Element 类型的区别
}
function Aaa(props: AaaProps) {
  return <div>{props.name}{props.content}</div>
}

// React.FC<>
const Bbb: React.FC<AaaProps> = (props) => {
  return <div>{props.name}{props.content}</div>
}

// JSX.Element
const Content: JSX.Element = <div>Content</div>

// useRef
function Ccc() {
  const [num, setNum] = useState(1)
  // React.RefObject<HTMLDivElement>
  const ref = useRef<HTMLDivElement>(null)

  // React.MutableRefObject
  const ref2 = useRef<{num2: number}>()

  useEffect(() => {
    ref2.current = { num2: 30 }
  }, [])

  return <div ref={ref}>ccc</div>
}

// PropsWithChildren<T>
type DddProps = PropsWithChildren<{
  content: React.ReactNode
  color: CSSProperties['color']
  styles?: CSSProperties
}>
function Ddd(props: DddProps) {
  return <div style={{ color: props.color, ...props.styles }}>ddd, {props.content}, {props.children}</div>
}

// HTMLAttributes
type EeeProps = HTMLAttributes<HTMLDivElement>
function Eee(props: EeeProps) {
  return <div {...props}>hh</div>
}


// Event Handlers
interface FffProps {
  clickHandler: MouseEventHandler
  // 或者写成下面方式
  clickHandler2?: (e: MouseEventHandler<HTMLDivElement>) => void
}
function Fff(props: FffProps) {
  return <div onClick={props.clickHandler}>click me FFF</div>
}

function App() {

  const ref = useRef<CompRef>(null)

  useEffect(() => {
    console.log('ref', ref.current)
    ref.current?.aaa()
  }, [])

  return (
    <div>
      aaa, 
      <Aaa name="bbb" content={null} />
      <Aaa name="bbb" content={Content} />
      <WrappedComp ref={ref} name="james" />
      <Buttons />
      <Ddd styles={{backgroundColor: 'pink'}} color="black" content={<div>Content hhh</div>}>
        这里是内容
      </Ddd>
      <Eee onClick={() => console.log('eee click')} />
      <Fff clickHandler={() => console.log('Fff clicked')}/>
    </div>
  )
}

export default App
