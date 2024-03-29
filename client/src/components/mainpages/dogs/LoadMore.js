import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function LoadMore() {
    const state = useContext(GlobalState)
    const [page, setPage] = state.dogsAPI.page
    const [result] = state.dogsAPI.result
    return (
        <div className="load_more">
            {result < page * 12 ? "": <button onClick={() => setPage(page+1)}>Load more</button>}
        </div>
    )
}
export default LoadMore
