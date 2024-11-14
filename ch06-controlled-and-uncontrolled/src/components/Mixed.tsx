import { useEffect, useRef, useState } from 'react'

interface CalendarProps {
    value?: Date
    defaultValue?: Date
    onChange?: (date: Date) => void
}

// 同时支持受控模式和非受控模式
export default function MixCalendar(props: CalendarProps) {
    const {
        value: propsValue,
        defaultValue,
        onChange
    } = props

    const [value, setValue] = useState(() => {
        // 通过判断 propsValue 是否为 undefined 来区分受控模式还是非受控模式
        if (propsValue !== undefined) {
            // 受控模式
            // 初始值设置为 propsValue 然后渲染用propsValue
            return propsValue
        }
        return defaultValue
    })

    const isFirstRender = useRef(true)

    useEffect(() => {
        if (propsValue === undefined && !isFirstRender.current) {
            // 当不是首次渲染，但 value 变为 undefined 的情况，
            // 也就是从受控模式切换到了非受控模式，要同步设置 state 为 propsValue。
            setValue(propsValue)
        }
        isFirstRender.current = false
    }, [propsValue])

    const mergedValue = propsValue === undefined ? value : propsValue

    function changeValue(date: Date) {
        if (propsValue === undefined) {
            setValue(date)
        }
        onChange?.(date)
    }

    return (
        <div>
            {mergedValue?.toLocaleDateString()}
            <div onClick={ () => changeValue(new Date('2025-06-01')) }>2025-06-01</div>
            <div onClick={ () => changeValue(new Date('2025-06-02')) }>2025-06-02</div>
            <div onClick={ () => changeValue(new Date('2025-06-03')) }>2025-06-03</div>
        </div>
    )

}