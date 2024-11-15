import { useControllableValue } from "ahooks"
import { useImperativeHandle, forwardRef } from "react"

interface CalendarProps {
    value?: Date
    defaultValue?: Date
    onChange?: (date: Date) => void
}

export interface CalendarRef {
    getDate: () => Date
    setDate: (date: Date) => void
}


const Calendar = forwardRef<CalendarRef, CalendarProps>((props, ref) => {
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
        // 这里最后的date 1 会导致
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
    // 最后一天星期几
    const lastDayOfMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDay()
    }

    const renderDates = () => {
        const days = []

        const daysCount = daysOfMonth(date.getFullYear(), date.getMonth())
        const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth())

        // 上一个月的天数
        const prevDaysCount = daysOfMonth(date.getFullYear(), date.getMonth() - 1)
        // 当月的最后一天星期几
        const lastDay = lastDayOfMonth(date.getFullYear(), date.getMonth())

        // 假设上个月有31天，这个月的第一天是星期4 则上个月填充的时间为 31 - 4 = 27 ， 28， 29， 30， 31
        for (let i = prevDaysCount - firstDay; i < prevDaysCount; i++) {
            days.push(<div key={`empty-${i}`} className="empty">{i + 1}</div>)
        }

        // 一个月的天数
        for (let i = 1; i <= daysCount; i++) {
            const clickHandler = () => {
                const curDate = new Date(date.getFullYear(), date.getMonth(), i)
                setDate(curDate)
                // onChange?.(curDate)
            }
            // TODO: 这里的判断有问题 切换月份会导致默认选中第一天
            if (date.getDate() === i) {
                days.push(<div key={i} className="day selected" onClick={() => clickHandler()}>{i}</div>)
            } else {
                days.push(<div key={i} className="day" onClick={() => clickHandler()}>{i}</div>)
            }
        }

        // 补充下一个月的天数
        // 7 -> 一个星期7天
        // 假设lastDay 是星期二，由于这里的星期是从星期天开始的（即这里的 `7 - last - 1` 中 `-1`），则剩下需要填充的是
        // 星期3，星期4，星期5，星期6
        for (let i = 0; i < 7 - lastDay - 1; i++) {
            days.push(<div key={`empty-${i}`} className="empty">{i + 1}</div>)
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

export default Calendar
