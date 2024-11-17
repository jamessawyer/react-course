import { useContext } from "react"
import { Dayjs } from "dayjs"
import cs from 'classnames'
import { CalendarProps } from "."
import LocaleContext from "./LocaleContext"
import allLocales from "./locale"

interface MonthCalendarProps extends CalendarProps {
    selectHandler?: (date: Dayjs) => void
    curMonth: Dayjs
}

function getAllDays(date: Dayjs) {
    // 当月有多少天
    // const daysInMonth = date.daysInMonth()
    // 当月第一天信息
    const startDate = date.startOf('month')
    // 月份第一天星期几
    const day = startDate.day()

    // console.log(day, startDate, daysInMonth)
    // 固定展示6行 7列（即一周7天）
    const daysInfo: {date: Dayjs, currentMonth: boolean}[] = new Array(6 * 7)

    // 当月上一个月在本月中展示的天数
    for (let i = 0; i < day; i++) {
        daysInfo[i] = {
            // subtract() 计算当前日期的 -1 -2 -3的日期
            // 比如 2024年11月 第一天（2024-11-01）是星期五
            // 5 - 0 即-5天的日期是 2024-10-27
            // 5 - 1 即-4天的日期是 2024-10-28
            date: startDate.subtract(day - i, 'day'),
            // 是否是本月
            currentMonth: false,
        }
    }

    // 剩余的天数
    for (let i = day; i < daysInfo.length; i++) {
        const calcDate = startDate.add(i - day, 'day')
        daysInfo[i] = {
            date: calcDate,
            currentMonth: calcDate.month() === date.month(),
        }
    }
    console.log('daysInfo', daysInfo)

    return daysInfo
}

function MonthCalendar(props: MonthCalendarProps) {
    const localeContext = useContext(LocaleContext)

    const {
        value,
        curMonth,
        dateRender,
        dateInnerContent,
        selectHandler
    } = props

    const CalendarLocale = allLocales[localeContext.locale]

    const weekList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

    const allDays = getAllDays(curMonth)

    function renderDays(
        days: {date: Dayjs, currentMonth: boolean}[],
    ) {
        const rows = []
        // 6行日期数据
        for (let i = 0; i < 6; i++) {
            const row = []
            // 每行有7天
            for (let j = 0; j < 7; j++) {
                const item = days[i * 7 + j]
                row[j] = <div
                    key={`cell-${i}-${j}`}
                    className={`calendar-month-body-cell ${item.currentMonth ? 'calendar-month-body-cell-current' : ''}`}
                    onClick={() => selectHandler?.(item.date)}
                >
                    {dateRender ? dateRender(item.date) : (
                        <div className="calendar-month-body-cell-date">
                            <div className={
                                cs(
                                    "calendar-month-body-cell-date-value",
                                    value?.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD') && 'calendar-month-body-cell-date-selected'
                                )
                            }>{item.date.date()}</div>
                            <div className="calendar-month-body-cell-date-content">{dateInnerContent?.(item.date)}</div>
                        </div>
                    )} 
                </div>
            }
            rows.push(row)
        }
        // console.log('rows', rows)
        return rows.map((row, idx) => <div key={`row-${idx}`} className="calendar-month-body-row">{row}</div>)
    }

    return (
        <div className="calendar-month">
            <div className="calendar-month-week-list">
                {weekList.map(week => (
                    <div className="calendar-month-week-list-item" key={week}>
                        {CalendarLocale.week[week]}
                    </div>
                ))}
            </div>
            <div className="calendar-month-body">
                {renderDays(allDays)}
            </div>
        </div>
    )
}

export default MonthCalendar
