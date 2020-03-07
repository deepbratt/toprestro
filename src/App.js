import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col, Card ,Form} from 'react-bootstrap';
import {RestroList} from './components';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

function getUnique(data , dataType) {
  var lookup = {};
  var items = data;
  var result = [];

  for (var item, i = 0; item = items[i++];) {
    var name = item[dataType];

    if (!(name in lookup)) {
      lookup[name] = 1;
      result.push(name);
    }

  }
  return result;
}


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading : false,
      allDataSet : [],
      Brand: [],
      Style: [],
      Country: [],
      BrandFilter: "",
      StyleFilter: "",
      CountryFilter: ""
    }
  }
  onHandleChange = (event) => {
    const {BrandFilter, StyleFilter, CountryFilter, totalDataSet, allDataSet} = this.state;
    const name = event.target.name;
    const value = event.target.value;
    const newData = totalDataSet.filter(data => data.Brand == value);
    this.setState({ [name] : value , allDataSet: newData});
  }

  componentDidMount(){
    axios.get("http://starlord.hackerearth.com/TopRamen")
    .then(res => {
        const Brand = getUnique(res.data, "Brand");
        const Style = getUnique(res.data, "Style");
        const Country = getUnique(res.data, "Country");
        this.setState({
            allDataSet: res.data,
            totalDataSet: res.data,
            Brand,
            Style,
            Country,
            loading: false
        })

    })
  }

  render(){
	  console.log('hello');
    const {Brand, allDataSet, Style, Country} = this.state;
    console.log(allDataSet);
    return (
      <div className="App">
          <h1 style={{opacity:1.0}}>Top Ramen Resturants of the world</h1>
          <Container fluid className="headerBg">
            
          </Container>
          
          <Container style={{padding:10}}>
              <Row>
                <Col>
                <Card>
                  <Card.Body style={{background:"#f7f7f7"}}>

                  <h4>Advance Filters</h4>

                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control as="select" name="BrandFilter" onChange={this.onHandleChange}>
                        <option>- Choose Brand -</option>
                        {
                          Brand.map((data,index) => {
                            return(
                              <>
                                <option value={data}>{data}</option>
                              </>
                            );
                          })
                        }
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control as="select" name="StyleFilter" onChange={this.onHandleChange}>
                          <option>- Choose Style -</option>
                          {
                            Style.map((data,index) => {
                              return(
                                <>
                                  <option value={data}>{data}</option>
                                </>
                              );
                            })
                          }
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control as="select" name="CountryFilter" onChange={this.onHandleChange}>
                          <option>- Choose Country -</option>
                          {
                            Country.map((data,index) => {
                              return(
                                <>
                                  <option value={data}>{data}</option>
                                </>
                              );
                            })
                          }
                        </Form.Control>
                    </Form.Group>

                  </Form>
                  </Card.Body>
                </Card>
                </Col>

                <Col md="9">
                  <Row>
                    <Col></Col>
                    <Col>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Control type="text" placeholder="Enter your Search" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <RestroList Restro={allDataSet} />


                </Col>
              </Row>
              
          </Container>
      </div>
    );
  }
}