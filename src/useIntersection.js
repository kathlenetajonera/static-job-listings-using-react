import { useRef, useEffect } from "react";

const useIntersection = () => {
    const cardRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const jobCard = entry.target;

                if (entry.isIntersecting) {
                    jobCard.classList.add("job--active");
                } else {
                    jobCard.classList.remove("job--active");
                }
            })
        })

        observer.observe(cardRef.current);
    })
    
    return [cardRef]
}
 
export default useIntersection;