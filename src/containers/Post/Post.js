import React, {Component} from 'react';
import classes from './Post.module.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import axios from 'axios';
import MostRead from "../../components/MostRead/MostRead";
import Latest from "../../components/Latest/Latest";
import {Helmet} from "react-helmet";
import ReactGA from "react-ga";
import Moment from 'react-moment';
import Card from 'react-bootstrap/Card';
import NoMatch from "../../components/NoMatch/NoMatch";


class Post extends Component {


    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            currentPage : null,
            totalPages: null,
            slug: props.match.params.slug
        };
    }

    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-1787291928862475",
            enable_page_level_ads: true
        });

        axios.get('http://www.dev.sergiomanzur.com/api/pages/' + this.state.slug)
            .then(res => {
                this.setState({posts:res.data})
            }, (error) => {
                console.log(error);
                this.setState({posts: false});
            })
    }



    render() {

        ReactGA.initialize('UA-65003463-1');
        ReactGA.pageview(window.location.pathname + window.location.search);


        if(this.state.posts === false) {
            return (
                <NoMatch/>
            );
        } else {

            const title = this.state.posts.title;
            const content = [this.state.posts.body];
            const first_image = <img style={{width: "100%", marginBottom: "25px"}} src={this.state.posts.main_image}/>
            const summary = this.state.posts.summary;
            const exampleImage = this.state.posts.main_image;

            return(
                <Container>
                    <Helmet>
                        <meta charSet="utf-8"/>
                        <title>{title + " | El Blog de Sergio Manzur"}</title>
                        <meta name="description" content={summary}/>
                        <meta property="og:image" content={exampleImage}/>
                        <meta property="og:image:secure_url" content={exampleImage}/>
                        <link rel="canonical" href={"http://dev.sergiomanzur.com/blog/" + this.state.slug}/>
                    </Helmet>
                    <br/>
                    <Row>

                        <h2>{title}</h2>
                        {first_image}
                        <Col sm={8}>

                            <Card.Subtitle className={classes.Subtitle}>
                                {this.state.posts.author} - <Moment format="DD/MM/YYYY">{this.state.posts.fecha}</Moment>
                            </Card.Subtitle>


                            <div className="embed-wrapper" dangerouslySetInnerHTML={{__html: content}}></div>
                        </Col>
                        <Col sm={4} style={{padding: "30px"}}>
                            <div style={{textAlign: 'center'}}>
                                <Image style={{width: 100}}
                                       src={require('./sergiomanzurface.png')}
                                       roundedCircle/>
                            </div>
                            <br/>
                            <MostRead/>
                            <br/>
                            <Latest/>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default Post;