import React from 'react';

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, Author, date, source } = props;

    return (
        <div>
            <div className="card" style={{ width: "18rem" }}>
                <span className="position-absolute top-1 translate-middle badge rounded-pill bg-danger" style={{ left: '82%', top: '2%' }}>{source}</span>
                <img src={!imageUrl ? "https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=612x612&w=0&k=20&c=9rVQfrUGNtR5Q0ygmuQ9jviVUfrnYHUHcfiwaH5-WFE=" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...<span className="badge text-bg-info">new</span></p>
                    <p className="card-text"><small className="text-warning">By {!Author ? "Unknown" : Author} on {new Date(date).toGMTString()}</small></p>
                    <a rel = "noreferrer" href={newsUrl} target='_blank' className="btn btn-outline-primary">Read More</a>
                </div>
            </div>
        </div>
    );
}

export default NewsItem;
