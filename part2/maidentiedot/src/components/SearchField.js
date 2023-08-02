const SearchField = ({ filter, handleFilterChange }) => {
    return (
        <div>
            Find countries: <input value={filter} onChange={handleFilterChange}></input>
        </div>
    )
}

export default SearchField