import React, { useEffect, useRef } from "react";

function useMergeState<T>(
    defaultStateValue: T,
    props?: {
        defaultValue?: T,
        value?: T
    }
): [T, React.Dispatch<React.SetStateAction<T>>,] {
    const { defaultValue, value: propsValue } = props || {}

    const isFirstRender = useRef(true)

    const [stateValue, setStateValue] = React.useState(() => {
        if (propsValue !== undefined) {
            return propsValue
        } else if (defaultValue !== undefined) {
            return defaultValue
        } else {
            return defaultStateValue
        }
    })

    useEffect(() => {
        if (propsValue === undefined && !isFirstRender.current) {
            setStateValue(propsValue!)
        }

        isFirstRender.current = false
    }, [propsValue])

    const mergedValue = propsValue === undefined ? stateValue : propsValue

    return [mergedValue, setStateValue]
}

export default useMergeState
