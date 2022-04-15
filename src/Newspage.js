import {useState, useEffect} from 'react'
import axios from 'axios'
import Newscard from './Newscard';
import './App.css'
import ReactPaginate from 'react-paginate'
const Newspage = () => {
const [currentPage, setCurrentPage] = useState(0);
const [articles, setArticles] = useState([]);
const [isLoading, setIsLoading] = useState([]);
const [totalPages, setTotalPages] = useState(0);

const handlePageChange = (event) =>
{
    console.log(event);
    setCurrentPage(event.selected);
}

useEffect(()   =>
{
    setIsLoading(true);
    const fetchData = async () => {
        try{
const {data}=  await axios.get(
    "https://hn.algolia.com/api/v1/search_by_date?query=story&page=1",
{
    params: {page : currentPage},
},  [100]);


    



const {hits, nbPages} = data;
setArticles(hits);
setTotalPages(nbPages);
        } catch(err){
        console.log(err);

        } finally{
setIsLoading(false);
        }
    }
    fetchData();
}, [currentPage])
    return(
        <div className= "container">
            <h1>Polling APIs to the website with Pagination</h1>
            <h3>Author</h3>
            <h3>Click 'Read More' for URL to the news</h3>
            <div className='news-container'>
                
        {  isLoading ? (<p>Loading...</p>): (articles.map((article =>( <Newscard  article={article} key={article.objectID}/> )))) }
            </div>
            <ReactPaginate
nextLabel = ">>"
previousLabel = "<<"
breakLabel = "..."
forcePage={currentPage}
pageCount = {totalPages}
renderOnZeroPageCount = {null}
onPageChange = {handlePageChange}
className = "pagenation"
activeClassName='active-page'
previousClassName='previous-page'
nextClassName='next-page'   />
        </div>
    );
}
export default Newspage;