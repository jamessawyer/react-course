import { useReducer } from "react"

interface Data {
    result: number
}

interface Action {
    type: 'add' | 'minus'
    num: number
}

function reducer(state: Data, action: Action) {
    switch (action.type) {
        case 'add':
            return {
                result: state.result + action.num
            }
        case 'minus':
            return {
                result: state.result - action.num
            }
        default:
            return state
    }
}


function Buttons() {
    const [res, dispatch] = useReducer(reducer, {
        result: 1
    })

    return (
        <div>
            {res.result}
            <button onClick={() => dispatch({ type: 'add', num: 1 })}> +1 </button>
            <button onClick={() => dispatch({ type: 'minus', num: 1 })}> -1 </button>
        </div>
    )
}

export default Buttons