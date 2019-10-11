import React, {Component, useEffect, useState} from 'react';
//import classes from './NoMatch.module.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import HomepageCard from "../../components/HomepageCard/HomepageCard";
import Pagination from "../../components/Pagination/Pagination";
import axios from 'axios';
import ReactGA from "react-ga";


class Homepage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            currentPage : null,
            totalPages: null
        };
    }

    componentDidMount() {
        this.getInformation(1);
        (window.adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-1787291928862475",
            enable_page_level_ads: true
        });
    }

    getInformation(page) {
        axios.get(`http://www.dev.sergiomanzur.com/api/pages/page${page}`)
            .then(res => {
                this.setState({posts:res.data.data});
                this.setState({currentPage: res.data['current_page']});
                this.setState({totalPages:res.data['total_pages']});
            })
    }

     handlePageChange (page) {
        this.getInformation(page);
    }

    render() {

        ReactGA.initialize('UA-65003463-1');
        ReactGA.pageview('/');

        const handlePageChange = (page) => {
            this.getInformation(page);
        }

        const categories = this.state.categories;
        const card = <HomepageCard/>;
        const homePosts = this.state.posts.filter((x,i)=> i < 6 ).map(
            x => <HomepageCard key={x.id} title={x.title}
                               image={"http://sergiomanzur.com/site/assets/files/"+x.id+"/"+
                               x.images[0].data} summary={x.summary} slug={x.slug} author={x.author} fecha={x.fecha}/>);

        return(
            <Container>
                <br/>
                <Row>
                    <Col sm={12}>
                        <Row>{homePosts}</Row>
                    </Col>
                </Row>
                {this.state.currentPage ? <Pagination handlePageChange={handlePageChange} totalPages={this.state.totalPages} current={this.state.currentPage}/> :  null}
            </Container>
        );
    }
}

export default Homepage;