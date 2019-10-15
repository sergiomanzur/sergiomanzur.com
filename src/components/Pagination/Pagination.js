import React, {useEffect,useState} from 'react';
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";




class PaginationComp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    handleNextClick(event) {

        this.props.handlePageChange(this.props.current + 1);
    }

    handleBackClick(event) {

        this.props.handlePageChange(this.props.current - 1);
    }

    handlePageNumberClick(pageNumber) {
        this.props.handlePageChange(pageNumber);
    }


    render() {

        console.log("currentpage on homepage ", this.props.current);

        return (
            <Container style={{display: "flex", flexFlow: "row wrap", justifyContent: "center"}}>
                <Row>
                    <Col xs={{span: 1}}>
                        <Pagination size="md">
                            <Pagination.First disabled={this.props.current === 1} onClick={() => this.props.handlePageChange(1)}/>
                            <Pagination.Prev disabled={this.props.current === 1} onClick={() => this.handleBackClick()}/>
                            {this.props.current > 1 ? <Pagination.Item onClick={() => this.handlePageNumberClick(this.props.current-1)} key={this.props.current - 1}>{this.props.current - 1}</Pagination.Item> :  ""}
                            <Pagination.Item  active="true" key={this.props.current}>{this.props.current}</Pagination.Item>
                            {this.props.current !== this.props.totalPages ? <Pagination.Item onClick={() => this.handlePageNumberClick(this.props.current+1)} key={this.props.current + 1}>{this.props.current + 1}</Pagination.Item> :  ""}
                            {this.props.current === 1 ? <Pagination.Item onClick={() => this.handlePageNumberClick(this.props.current+2)} key={this.props.current + 2}>{this.props.current + 2}</Pagination.Item> :  ""}
                            <Pagination.Next disabled={this.props.current === this.props.totalPages} onClick={() => this.handleNextClick()}/>
                            <Pagination.Last disabled={this.props.current === this.props.totalPages} onClick={() => this.props.handlePageChange(this.props.totalPages)}/>
                        </Pagination>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default PaginationComp;