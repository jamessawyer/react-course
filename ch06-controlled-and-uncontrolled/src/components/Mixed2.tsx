import useMergeState from '../hooks/useMergeState'

interface CalendarProps {
    value?: Date
    defaultValue?: Date
    onChange?: (date: Date) => void
}
// 使用useMergeState版本
// 同时支持受控模式和非受控模式
export default function MixCalendar2(props: CalendarProps) {
    const {
        value: propsValue,
        defaultValue,
        onChange
    } = props

    const [mergedValue, setValue] = useMergeState(new Date(), {
        value: propsValue,
        defaultValue
    })

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