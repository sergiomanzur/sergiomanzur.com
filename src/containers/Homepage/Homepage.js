import React, {useEffect, useState} from 'react';
//import classes from './NoMatch.module.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import HomepageCard from "../../components/HomepageCard/HomepageCard";
import Pagination from "../../components/Pagination/Pagination";
import axios from 'axios';
import ReactGA from "react-ga";


const Homepage = () => {

    ReactGA.initialize('UA-65003463-1');
    ReactGA.pageview('/');

    const [posts,setPost] = useState([]);
    const[currentPage, setCurrentPage] = useState(null);
    const[totalPages, setTotalPages] = useState(null);

    useEffect(() => {
        getInformation(1);
    }, []);

        const getInformation = (page) => {
            axios.get(`http://www.dev.sergiomanzur.com/api/pages/page${page}`)
                .then(res => {
                    setPost(res.data.data);
                    setCurrentPage(res.data['current_page']);
                    setTotalPages(res.data['total_pages']);
                })
        }

        const handlePageChange = (page) => {
            getInformation(page);
        }




    const homePosts = posts.filter((x,i)=> i < 6 ).map(
        x => <HomepageCard key={x.id} title={x.title}
                           image={"http://sergiomanzur.com/site/assets/files/"+x.id+"/"+
                           x.images[0].data} summary={x.summary} slug={x.slug} author={x.author} fecha={x.fecha}/>);
    //console.log(titles);

    const  card = <HomepageCard/>;

    return (
        <Container>
            <br/>
            <Row>
                <Col sm={12}>
                    <Row>{homePosts}</Row>
                </Col>
            </Row>
            {currentPage ? <Pagination handlePageChange={handlePageChange} totalPages={totalPages} current={currentPage}/> :  null}
        </Container>
    )
}

export default Homepage;