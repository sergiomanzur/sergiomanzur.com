import React, {useEffect, useState} from 'react';
//import classes from './Category.module.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import HomepageCard from "../../components/HomepageCard/HomepageCard";
import Pagination from "../../components/Pagination/Pagination";
import axios from 'axios';
import ReactGA from "react-ga";


const Category = ({match}) => {

    const [posts,setPost] = useState([]);
    const[currentPage, setCurrentPage] = useState(null);
    const[categoryTitle, setCategoryTitle] = useState(null);
    const[totalPages, setTotalPages] = useState(null);
    const slug = match.params.slug;

    ReactGA.initialize('UA-65003463-1');
    ReactGA.pageview('/categorias/'+slug);

    useEffect(() => {
        getInformation(1);
    }, []);

        const getInformation = (page) => {
            axios.get(`http://www.dev.sergiomanzur.com/api/categories/${slug}/page${page}`)
                .then(res => {
                    setPost(res.data.data);
                    setCurrentPage(res.data['current_page']);
                    setCategoryTitle(res.data['title']);
                    setTotalPages(res.data['total_pages']);
                })
        }

        const handlePageChange = (page) => {
            getInformation(page);
        }




    const homePosts = posts.filter((x,i)=> i < 6 ).map(
        x => <HomepageCard key={x.id} title={x.title}
                           image={"http://dev.sergiomanzur.com/site/assets/files/"+x.id+"/"+
                           x.images[0].data} summary={x.summary} slug={x.slug} author={x.author} fecha={x.fecha}/>);
    //console.log(titles);

    const  card = <HomepageCard/>;

    return (
        <Container>
            <br/>
            <h2>{categoryTitle}</h2>
            <br/>
            <Row>
                <Col sm={12}>
                    <Row>{homePosts}</Row>
                </Col>
            </Row>
            {currentPage && totalPages > 1 ? <Pagination handlePageChange={handlePageChange} totalPages={totalPages} current={currentPage}/> :  null}
        </Container>
    )
}

export default Category;