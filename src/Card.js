import useIntersection from "./useIntersection";

const Card = ({ job, filterButtons, handleSelect }) => {
    const [ cardRef ] = useIntersection();

    return (
        <div ref={cardRef} className={`job ${ job.featured === true ? 'job--featured' : '' }`}>
            <div className="job__details">
                <div className="flex">
                    <img className="job__company-img" src={ job.logo } alt={ job.company }/>

                    <div className="job__overview">
                        <div className="flex flex--row">
                            <h3 className="job__company">{ job.company }</h3>

                            <p className={`job__tag ${ job.new === true ? 'job__tag--new' : '' }`}>NEW!</p>
                            <p className={`job__tag ${ job.featured === true ? 'job__tag--featured' : '' }`}>FEATURED</p>
                        </div>

                        <h1 className="job__position">{ job.position }</h1>

                        <div className="flex flex--row">
                            <p className="job__sub-detail">{ job.postedAt }</p>
                            <p className="job__sub-detail">{ job.contract }</p>
                            <p className="job__sub-detail">{ job.location }</p>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="job__separator" />

            <div className="job__languages">
                {filterButtons.map(button => (
                    <button onClick={handleSelect} className="button" value={ button } key={`${job.id + button}`}>{ button }</button>
                ))}
            </div>
        </div>
    );
}
 
export default Card;