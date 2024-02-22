import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizefist = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    document.title = `${capitalizefist(props.category)}-Daily Khabar`;

    const updateNews = async () => {
        props.setProgress(0);
        // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a34936b1fe79467793d699ae3359ca82&page=${page}&pageSize=${props.pageSize}`;
        const mrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8f404dd0939348359cb43415645dce35&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(mrl);
        let parsedData = await data.json();
        props.setProgress(60);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews()
    }, [])

    const fetchMoreData = async () => {
        props.setProgress(0);
        const mrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8f404dd0939348359cb43415645dce35&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page + 1)
        let data = await fetch(mrl);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        // setArticles(prevArticles => [prevArticles,uniqueArticles]);
        setTotalResults(parsedData.totalResults)
        props.setProgress(100);
    };
    return (
        <div className='container my-3 heg'>
            <h2 className='text-center'><strong>Daily Khabar - Top Headline</strong></h2>
            <h2 className='text-center'>{capitalizefist(props.category)}</h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            // loader={<h1>Loding</h1>}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return (
                                <div className="col-md-3 mb-2" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    );
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default News;
