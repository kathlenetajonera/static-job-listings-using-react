import { useState, useEffect, useRef } from "react";
import Card from "./Card";
import FilterBar from "./FilterBar";

const MainContainer = () => {
    const [allJobs, setAllJobs] = useState(null); //allJobs
    const [jobList, setJobList] = useState(null); //filteredJobList
    const [filters, setFilters] = useState([]); //filters
    const isInitialMount = useRef(true);
  
    //runs on the first page load
    useEffect(() => {
        fetch("./data.json")
            .then(res => res.json())
            .then(data => {
                setAllJobs(data);
                setJobList(data);
            })
    }, [])
  
    //runs everytime there's state change on the filters
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            const filterList = () => {
                const updatedList = [];
                const filtering = allJobs.forEach(job => {
                    const filterCategories = [job.role, job.level, ...job.languages, ...job.tools];
  
                    if (filters.every(filter => filterCategories.indexOf(filter) !== -1)) {
                        updatedList.push(job)
                    }
                });
                console.log("filtered");
                setJobList(updatedList);
            }
  
            filterList();
        }   
    }, [filters])

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
            { jobList && jobList.map(job => {
               const filterButtons = [job.role, job.level, ...job.languages, ...job.tools]

               return <Card job={job} filterButtons={filterButtons} key={job.id} handleSelect={handleSelect}  />
            })}
        </div>
    )
}

export default MainContainer;