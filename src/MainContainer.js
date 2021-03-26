import { useState } from "react";
import Card from "./Card";
import FilterBar from "./FilterBar";
import useFilter from "./useFilter";

const MainContainer = () => {
    const [ filters, setFilters ] = useState([]);
    const [ isPending, jobList ] = useFilter(filters);

    const handleSelect = (elem) => {
        const selectedFilter = elem.target.value;
    
        if (!filters) {
            setFilters(selectedFilter);
        } else {
            setFilters(prev => prev.concat([selectedFilter]))
        }
    }

    const handleDelete = (elem) => {
        if (elem.target.id === "clear-btn") {
            setFilters([])
        } else {
            const filterToDelete = elem.target.value;
            const updatedFilters = filters.filter(filter => filter !== filterToDelete);
    
            setFilters(updatedFilters);
        }
    }

    return (
        <div className="container">
            { filters.length === 0 ? '' : <FilterBar filters={filters} handleDelete={handleDelete} /> }
            { isPending && 
                <div className="loading"></div>
            }
            { jobList && jobList.map(job => {
               const filterButtons = [job.role, job.level, ...job.languages, ...job.tools]

               return <Card job={job} filterButtons={filterButtons} key={job.id} handleSelect={handleSelect}  />
            })}
        </div>
    )
}

export default MainContainer;