const FilterBar = ({ filters, handleDelete }) => {
    return (
        <div className="filter-bar">
            <div className="filter-bar__tags">
                {filters.map(filter => (
                    <button
                    onClick={handleDelete}
                    className="button button--tag"
                    value={ filter }
                    key={ filter }>
                    { filter }
                    </button>
                ))}
            </div>
            <p onClick={ handleDelete } id="clear-btn"className="filter-bar__clear">Clear</p>
        </div>
    );
}
 
export default FilterBar;