const FilterField = ({filterFn}) => {
    return(
        <div>
            <input onChange={filterFn}></input>
        </div>
    )
}