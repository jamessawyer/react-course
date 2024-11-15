import { useControllableValue } from "ahooks"
import { useImperativeHandle, forwardRef } from "react"

// 和Calendar.tsx 唯一的区别在于如何填充上一个月的天数和下一个月的天数 算法
// 这里的算法更好
interface CalendarProps {
    value?: Date
    defaultValue?: Date
    onChange?: (date: Date) => void
}

export interface CalendarRef {
    getDate: () => Date
    setDate: (date: Date) => void
}


const Calendar2 = forwardRef<CalendarRef, CalendarProps>((props, ref) => {
    // const { value, defaultValue, onChange } = props

    // 使用 useControllableValue 处理受控和非受控 自动onChange
    const [date, setDate] = useControllableValue(props, {
        defaultValue: new Date()
    })

    useImperativeHandle(ref, () => ({
        getDate: () => date,
        setDate: (date: Date) => {
            setDate(date)
        }
    }))

    const handlePrevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
    }
    const handleNextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
    }

    const monthNames = [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
    ]

    // 获取一个月有多少天
    const daysOfMonth = (year: number, month: number) => {
        // 0 表示最后一天
        return new Date(year, month + 1, 0).getDate()
    }
    // 获取一个月第一天是星期几
    const firstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay()
    }

    const renderDates = () => {
        const days = []

        const daysCount = daysOfMonth(date.getFullYear(), date.getMonth())
        const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth())
        const year = date.getFullYear()
        const month = date.getMonth()

        // 假设上个月有31天，这个月的第一天是星期4 则上个月填充的时间为 31 - 4 = 27 ， 28， 29， 30， 31
        for (let i = 0; i < firstDay; i++) {
            days.push(
                <div key={`empty-${i}`} className="empty">
                    {new Date(year,  month, i - firstDay + 1).getDate()}
                </div>
            )
        }

        // 一个月的天数
        for (let i = 1; i <= daysCount; i++) {
            const clickHandler = () => {
                const curDate = new Date(date.getFullYear(), date.getMonth(), i)
                setDate(curDate)
                // onChange?.(curDate)
            }
            if (date.getDate() === i) {
                days.push(<div key={i} className="day selected" onClick={() => clickHandler()}>{i}</div>)
            } else {
                days.push(<div key={i} className="day" onClick={() => clickHandler()}>{i}</div>)
            }
        }

        // 下一个月的天数
        const currRow = Math.ceil(days.length / 7) // 向上取整
        const nextDays = currRow * 7 - days.length
        if (nextDays > 0) {
            for (let i = 0; i < nextDays; i++) {
                days.push(
                    <div key={`empty-${i}-next`} className="empty">
                        {new Date(year, month + 1, i + 1).getDate()}
                    </div>
                )
            }
        }

        return days
    }

    return (
        <div className="calendar">
            <div className="header">
                <button onClick={handlePrevMonth}>&lt;</button>
                <div>{date.getFullYear()}年{monthNames[date.getMonth()]}</div>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="days">
                <div className="day">日</div>
                <div className="day">一</div>
                <div className="day">二</div>
                <div className="day">三</div>
                <div className="day">四</div>
                <div className="day">五</div>
                <div className="day">六</div>
                {renderDates()}
            </div>
        </div>
    )
})

export default Calendar2
