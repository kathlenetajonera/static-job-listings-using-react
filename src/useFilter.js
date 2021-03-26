import { useState, useEffect, useRef } from "react";

const useFilter = (filters) => {
    const [isPending, setIsPending] = useState(true);
    const isInitialMount = useRef(true);
    const [allJobs, setAllJobs] = useState(null); //allJobs
    const [jobList, setJobList] = useState(null); //jobList to render

    //runs on the first page load
    useEffect(() => {
        fetch("./data.json")
            .then(res => res.json())
            .then(data => {
                setAllJobs(data);
                setJobList(data);
                setIsPending(false);
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
                setJobList(updatedList);
            }
            filterList();
            console.log("filtered");
        }   
    }, [filters])


    return [ isPending, jobList ]
}
 
export default useFilter;