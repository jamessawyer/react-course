interface CalendarProps {
    value: Date
    onChange?: (date: Date) => void
}

export default function ControlledCalendar({ value, onChange }: CalendarProps) {

    function changeValue(date: Date) {
        onChange?.(date)
    }

    return (
        <div>
            {value.toLocaleDateString()}
            <div onClick={ () => changeValue(new Date('2024-12-01')) }>2024-12-01</div>
            <div onClick={ () => changeValue(new Date('2024-12-02')) }>2024-12-02</div>
            <div onClick={ () => changeValue(new Date('2024-12-03')) }>2024-12-03</div>
        </div>
    )
}