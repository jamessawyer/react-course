import React, { forwardRef, useImperativeHandle, useRef } from "react"

interface Props {
    name: string
}

export interface CompRef {
    aaa: () => void
}

// React.ForwardRefRenderFunction
// 注意这里的类型不是 React.FC
const Comp: React.ForwardRefRenderFunction<CompRef, Props> = (props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => {
        return {
            aaa() {
                inputRef.current?.focus()
            }
        }
    }, [inputRef])

    return (
        <div>
            <input type="text" ref={inputRef} />
            <div>{props.name}</div>
        </div>
    )
}

const WrappedComp = forwardRef(Comp)

// 第二种写法 直接将类型写在 forwardRef函数的泛型参数上
export const WrappedComp2 = forwardRef<CompRef, Props>((props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)

    // 这里也可以添加额外的类型
    useImperativeHandle<CompRef, {ccc: string} & CompRef>(ref, () => {
        return {
            aaa() {
                inputRef.current?.focus()
            },
            ccc: 'useImperativeHandle 类型'
        }
    }, [inputRef])

    return (
        <div>
            <input type="text" ref={inputRef} />
            <div>{props.name}</div>
        </div>
    )
})

export default WrappedComp
