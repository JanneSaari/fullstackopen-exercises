const FilterForm = ({filterFn, filter}) => {
    return(
        <div>
            <input value={filter} onChange={filterFn}></input>
        </div>
    )
}

export default FilterForm