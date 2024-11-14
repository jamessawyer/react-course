import useMergeState2 from '../hooks/useMergeState2'

interface CalendarProps {
    value?: Date
    defaultValue?: Date
    onChange?: (date: Date) => void
}
// 使用useMergeState版本 包含对onChange部分的封装
// 同时支持受控模式和非受控模式
export default function MixCalendar3(props: CalendarProps) {
    const {
        value: propsValue,
        defaultValue,
        onChange
    } = props

    const [mergedValue, setValue] = useMergeState2(new Date(), {
        value: propsValue,
        defaultValue,
        onChange
    })


    return (
        <div>
            {mergedValue?.toLocaleDateString()}
            <div onClick={ () => setValue(new Date('2026-09-01')) }>2026-09-01</div>
            <div onClick={ () => setValue(new Date('2026-09-02')) }>2026-09-02</div>
            <div onClick={ () => setValue(new Date('2026-09-03')) }>2026-09-03</div>
        </div>
    )

}