import { useState } from 'react'

interface CalendarProps {
    defaultValue?: Date
    onChange?: (date: Date) => void
}

// 非受控模式 可以传入默认值

export default function UncontrolledCalendar({ defaultValue = new Date(), onChange }: CalendarProps) {
    const [value, setValue] = useState(defaultValue)

    function changeValue(date: Date) {
        setValue(date)
        onChange?.(date)
    }

    return (
        <div>
            {value.toLocaleDateString()}
            <div onClick={ () => changeValue(new Date('2024-11-01')) }>2024-11-01</div>
            <div onClick={ () => changeValue(new Date('2024-11-02')) }>2024-11-02</div>
            <div onClick={ () => changeValue(new Date('2024-11-03')) }>2024-11-03</div>
        </div>
    )
}