import React, {useEffect, useState} from 'react';
import classes from './Post.module.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import axios from 'axios';
import MostRead from "../../components/MostRead/MostRead";
import Latest from "../../components/Latest/Latest";
import {Helmet} from "react-helmet";
import embedCss from "./embed.css";
import ReactGA from "react-ga";
import Moment from 'react-moment';
import Card from 'react-bootstrap/Card';
import NoMatch from "../../components/NoMatch/NoMatch";
import {
    FacebookShareCount,
    PinterestShareCount,
    RedditShareCount,

    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    PinterestShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    RedditShareButton,
    EmailShareButton,

    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    PinterestIcon,
    TelegramIcon,
    WhatsappIcon,
    RedditIcon,
    EmailIcon,
} from 'react-share';



const Post = ({match}) => {

    ReactGA.initialize('UA-65003463-1');
    ReactGA.pageview(window.location.pathname + window.location.search);

    const [posts, setPost] = useState([]);
    const slug = match.params.slug;


    useEffect(() => {

        axios.get('http://www.dev.sergiomanzur.com/api/pages/' + slug)
            .then(res => {
                setPost(res.data);
            }, (error) => {
                console.log(error);
                setPost(false);
            })
    }, []);


    if (posts === false) {

        return (<NoMatch/>);

    } else {
        const title = posts.title;
        const content = [posts.body];
        const first_image = <img style={{width: "100%", marginBottom: "25px"}} src={posts.main_image}/>
        const summary = posts.summary;
        const shareUrl = 'http://sergiomanzur.com/blog/' + slug;
        const exampleImage = posts.main_image;


        return (
            <Container>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>{title + " | El Blog de Sergio Manzur"}</title>
                    <meta name="description" content={summary}/>
                    <link rel="canonical" href={"http://sergiomanzur.com/blog/" + slug}/>
                </Helmet>
                <br/>
                <Row>
                    <h2>{title}</h2>
                    {first_image}
                    <Col sm={8}>
                        <Card.Subtitle className={classes.Subtitle}>
                            {posts.author} - <Moment format="DD/MM/YYYY">{posts.fecha}</Moment>
                        </Card.Subtitle>

                        <div className="Demo__container">
                            <div className="Demo__some-network">
                                <FacebookShareButton
                                    url={shareUrl}
                                    quote={title}
                                    className="Demo__some-network__share-button">
                                    <FacebookIcon
                                        size={32}
                                        round />
                                </FacebookShareButton>

                                <FacebookShareCount
                                    url={shareUrl}
                                    className="Demo__some-network__share-count">
                                    {count => count}
                                </FacebookShareCount>
                            </div>

                            <div className="Demo__some-network">
                                <TwitterShareButton
                                    url={shareUrl}
                                    title={title}
                                    className="Demo__some-network__share-button">
                                    <TwitterIcon
                                        size={32}
                                        round />
                                </TwitterShareButton>

                                <div className="Demo__some-network__share-count">
                                    &nbsp;
                                </div>
                            </div>

                            <div className="Demo__some-network">
                                <TelegramShareButton
                                    url={shareUrl}
                                    title={title}
                                    className="Demo__some-network__share-button">
                                    <TelegramIcon size={32} round />
                                </TelegramShareButton>

                                <div className="Demo__some-network__share-count">
                                    &nbsp;
                                </div>
                            </div>

                            <div className="Demo__some-network">
                                <WhatsappShareButton
                                    url={shareUrl}
                                    title={title}
                                    separator=":: "
                                    className="Demo__some-network__share-button">
                                    <WhatsappIcon size={32} round />
                                </WhatsappShareButton>

                                <div className="Demo__some-network__share-count">
                                    &nbsp;
                                </div>
                            </div>

                            <div className="Demo__some-network">
                                <LinkedinShareButton
                                    url={shareUrl}
                                    windowWidth={750}
                                    windowHeight={600}
                                    className="Demo__some-network__share-button">
                                    <LinkedinIcon
                                        size={32}
                                        round />
                                </LinkedinShareButton>
                            </div>

                            <div className="Demo__some-network">
                                <PinterestShareButton
                                    url={String(window.location)}
                                    media={`${String(window.location)}/${exampleImage}`}
                                    windowWidth={1000}
                                    windowHeight={730}
                                    className="Demo__some-network__share-button">
                                    <PinterestIcon size={32} round />
                                </PinterestShareButton>

                                <PinterestShareCount url={shareUrl}
                                                     className="Demo__some-network__share-count" />
                            </div>

                            <div className="Demo__some-network">
                                <RedditShareButton
                                    url={shareUrl}
                                    title={title}
                                    windowWidth={660}
                                    windowHeight={460}
                                    className="Demo__some-network__share-button">
                                    <RedditIcon
                                        size={32}
                                        round />
                                </RedditShareButton>

                                <RedditShareCount url={shareUrl}
                                                  className="Demo__some-network__share-count" />
                            </div>

                            <div className="Demo__some-network">
                                <EmailShareButton
                                    url={shareUrl}
                                    subject={title}
                                    body="body"
                                    className="Demo__some-network__share-button">
                                    <EmailIcon
                                        size={32}
                                        round />
                                </EmailShareButton>
                            </div>

                        </div>


                        <div className="embed-wrapper" dangerouslySetInnerHTML={{__html: content}}></div>
                    </Col>
                    <Col sm={4} style={{padding: "30px"}}>
                        <div style={{textAlign: 'center'}}>
                            <Image style={{width: 100}}
                                   src="https://scontent.fmex4-1.fna.fbcdn.net/v/t1.0-9/22450165_10159513665515302_7682864324370379155_n.jpg?_nc_cat=107&_nc_oc=AQnr82w4pzFJaX8ELmrs7aUGxFr0vE_eyzkqzynEOtaiMVU9KsL9LERKP6hXZ2iYa_M&_nc_ht=scontent.fmex4-1.fna&oh=4ccb0f6d863d0d1b5c4ff6fcab03cc57&oe=5DDD40E6"
                                   roundedCircle/>
                        </div>
                        <br/>
                        <MostRead/>
                        <br/>
                        <Latest/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Post;