/*!

=========================================================
* Dr Watson To The Rescue - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  DropdownToggle,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import { ToastContainer, ToastMessage } from "react-toastr";

import Header from "components/Headers/Header.js";
import level1 from "../blueprints/L1.png"
import level2 from "../blueprints/L2.png"
import level3 from "../blueprints/L3.png"
import fire1 from "../blueprints/fire1.png"
import fire2 from "../blueprints/fire2.png"
import fire3 from "../blueprints/fire3.png"
import pwd from "../icons/pwd.png"
import swap from "../icons/swap.png"
import wheelchair from "../images/wheelchair.jpg"
import crutches from "../images/crutches.jpg"
import cam1 from "../images/cam1.gif"
import cam2 from "../images/cam2.png"
import cam3 from "../images/cam3.gif"
import cam4 from "../images/cam4.gif"
import cam5 from "../images/cam5.gif"
import route1 from "../images/scdf_view1.gif"
import route2 from "../images/scdf_view2.gif"
import '../assets/scss/toastr.scss'
import soundfile from '../audio/scream.wav'
import Sound from 'react-sound'
import soundIcon from '../icons/noise.png'


class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedLevel: 1,
      fireLevel: 2,
      levelImages: [level1, level2, level3],
      start: "",
      end: "",
      showPwd: false,
      hidePwd: false,
      showLoudNoise: false,
      hideLoudNoise: false,
      optimisedRoute: null,
      isFetching: false,
      container: null,
      toastrOpen: false,
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  componentDidMount() {
    // Simulate level 2 fire
    setTimeout(() => {
      this.state.container && this.state.container.error('', 'Fire detected at C2-6!', {closeButton: true})
      this.state.container && this.state.container.error('', 'Fire detected at S2-3!', {closeButton: true})
      this.state.container && this.state.container.warning('', 'Personnel with mobility aid detected at C3-1!', {closeButton: true}) 
      this.state.container && this.state.container.warning('', 'Sounds of distress detected at R2-4!', {closeButton: true}) 
    }, 3000)

  }

  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };

  handleStartChange = (e) => {
    this.setState({
      start: e.target.value
    }, () => this.getPath())
  }

  handleEndChange = (e) => {
    this.setState({
      end: e.target.value
    }, () => this.getPath())
  }

  onLevelChange = (e) => {
    this.setState({
      selectedLevel: parseInt(e.target.value)
    })
  }

  swap = () => {
    this.setState({
      start: this.state.end,
      end: this.state.start
    }, () => this.getPath())
  }

  showPwd = () => {
    this.setState({
      showPwd: true
    })
  }

  showLoudNoise = () => {
    this.setState({
      showLoudNoise: true
    })
  }

  hidePwd = () => {
    this.setState({
      hidePwd: true,
      showPwd: false
    })
  }

  hideLoudNoise = () => {
    this.setState({
      hideLoudNoise: true,
      showLoudNoise: false
    })
  }

  getPath = () => {

    let params = this.state.start ? `origin=${this.state.start}` : ''
    params += this.state.start && this.state.end ? '&' : ''
    const dest = this.state.end ? `destination=${this.state.end}` : ''
    
    this.setState({
      isFetching: true
    })

    if (this.state.start === 'C3-1' && this.state.end === '') {
      const requestOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          removed: {
            "C2-1": true,
            "C3-1": true
          }
        })
      }

      // Simulate level 3 fire
      this.setState({
        fireLevel: 3
      })

      fetch(`https://dr-watson.us-south.cf.appdomain.cloud/compromised?zones[]=C2-1&zones[]=E-2&zones[]=S2-3&zones[]=S2-6`, requestOptions)
        .then(res => {

          // Simulate level 3 fire
          this.state.container && this.state.container.error('', 'Fire detected at C2-1!', {closeButton: true})
          this.state.container && this.state.container.error('', 'Fire detected at E2!', {closeButton: true})
          res.json().then(json => {
            fetch(`https://dr-watson.us-south.cf.appdomain.cloud/route?${params}${dest}`)
              .then(res => {
                res.json().then(json => {
                  this.setState({
                    optimisedRoute: json.route,
                    isFetching: false,
                  })
                })
              })
        })
      })
    } else {
      fetch('https://dr-watson.us-south.cf.appdomain.cloud/refresh')
      .then(res => {
        fetch(`https://dr-watson.us-south.cf.appdomain.cloud/route?${params}${dest}`)
        .then(res => {
          res.json().then(json => {
            this.setState({
              optimisedRoute: json.route,
              isFetching: false,
            })
          })
        })
      })
    }
  }

  showToastr = () => {
    this.setState({
      toastrOpen: true
    }, () => setTimeout(() => {
      this.setState({
        toastrOpen: false
      })
    }, 5000))
  }

  playSound = audioFile => {
    audioFile.play();
  }

  render() {

    let fireImage = null

    switch(this.state.fireLevel) {
      case 1:
        fireImage = fire1
        this.state.container && this.state.container.error('', 'Fire detected at C2-6!', {closeButton: true})
        break
      case 2:
        fireImage = fire2
        break
      case 3:
        fireImage = fire3
        break
      default:
    }

    const scream = new Audio(soundfile);

    console.log(this.state)

    return (
      <>
        <ToastContainer
          ref={ref => this.state.container ? '' : this.setState({container: ref})}
          className="toast-bottom-left"
        />
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h2 className="text-uppercase ls-1 mb-1">
                        Floorplan
                      </h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className="mb-12 mb-xl-0" xl="8">
                      <div className="btn-container">
                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                          <label className={"btn btn-secondary " + (this.state.selectedLevel === 1 ? "active" : "")}>
                            <input type="radio" name="options" id="level1" value={1} autoComplete="off" onClick={this.onLevelChange} />Level 1
                          </label>
                          <label className={"btn btn-secondary " + (this.state.selectedLevel === 2 ? "active" : "")}>
                            <input type="radio" name="options" id="level2" value={2} autoComplete="off" onClick={this.onLevelChange}/>Level 2
                          </label>
                          <label className={"btn btn-secondary " + (this.state.selectedLevel === 3 ? "active" : "")}>
                            <input type="radio" name="options" id="level3" value={3} autoComplete="off" onClick={this.onLevelChange}/>Level 3
                          </label>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{margin:"1rem 0"}}>
                    <div className="cam-container">
                      <img src={this.state.selectedLevel === 3 ? cam1 : this.state.selectedLevel === 2 ? cam4 : cam3} height="180" alt="cam1" className="cam" />
                      <img src={this.state.selectedLevel === 3 ? cam2 : this.state.selectedLevel === 2 ? cam3 : cam1} height="180" alt="cam2" className="cam"/>
                      <img src={this.state.selectedLevel === 3 ? cam3 : this.state.selectedLevel === 2 ? cam5 : cam4} height="180" alt="cam3" className="cam"/>
                      <img src={this.state.selectedLevel === 3 ? cam4 : this.state.selectedLevel === 2 ? cam1 : cam5} height="180" alt="cam4" className="cam"/>
                    </div>
                  </Row>
                  <Row style={{marginTop: "-2rem"}}>
                    <Col className="mb-12 mb-xl-0" xl="8">
                      {
                        this.state.selectedLevel === 2 ?
                          fireImage ?
                            <>
                              <img src={fireImage} width="100%" style={{marginBottom:'5rem'}} alt="floorplan"/>
                              {/* <span className="circle" /> */}
                              <img src={soundIcon} alt="sound" width="4%" className={"sound-icon " + (this.state.hideLoudNoise ? 'hidden' : '')} onClick={this.showLoudNoise} />
                            </>
                          : ''
                        : 
                          <>
                            <img src={this.state.levelImages[this.state.selectedLevel - 1]} width="100%" alt="floorplan"  style={{marginBottom:'5rem'}} className="floorplan" />
                            {this.state.selectedLevel === 3 ? <img src={pwd} alt="pwd" width="4%" className={"pwd-icon " + (this.state.hidePwd ? 'hidden' : '')} onClick={this.showPwd} /> : '' }
                          </>
                      }
                    </Col>
                    <Col className="mb-12 mb-xl-0" xl="4" style={{paddingTop:"3rem"}}>
                      {
                        this.state.showPwd && this.state.selectedLevel === 3 ?
                          <div className="pwd-container">
                            <div className="pwd-images-container">
                              <img src={crutches} height="190" alt="crutches" />
                              <img src={wheelchair} height="190" alt="wheelchair" />
                            </div>
                            <b>Mobility Aids Identified: 2</b><br/>
                            <b>Items: Crutches, Wheelchair</b><br/>
                            <b>Location: C3-1</b>
                            <Row style={{marginTop:"1rem"}}>
                              <Col>
                                <div className="pwd-btn-container">
                                  <Button
                                    color="info"
                                    onClick={() => {
                                      this.setState({
                                        start: "",
                                        end: "C3-1"
                                      }, () => this.getPath())
                                      var elmnt = document.getElementById("rescue");
                                      elmnt.scrollIntoView();
                                    }}
                                  >
                                    Plan Rescue
                                  </Button>
                                  <Button
                                    color="danger"
                                    onClick={this.hidePwd}
                                  >
                                    Dismiss
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        : this.state.showLoudNoise && this.state.selectedLevel === 2 ?
                          <div className="pwd-container">
                            <h3>Sounds of Distress Identified</h3>
                            <h3>Location: R2-4</h3>
                            <Row style={{marginTop:"1rem"}}>
                              <Col>
                                  <Button
                                  color="primary"
                                  onClick={() => {this.playSound(scream)}}
                                >
                                  Play Sound
                                </Button>
                              </Col>
                            </Row>
                            <Row style={{marginTop:"1rem"}}>
                              <Col>
                                <b>Audio Classifier</b><br/>
                                Speech: 44.37%<br/>
                                Crowd: 26.38%<br/>
                                Buzzer: 16.8%<br/>
                                Hubbub: 14.07%<br/>
                              </Col>
                            </Row>
                            <Row style={{marginTop:"1rem"}}>
                              <Col>
                                <div className="pwd-btn-container">
                                  <Button
                                    color="info"
                                    onClick={() => {
                                      this.setState({
                                        start: "",
                                        end: "R2-4"
                                      }, () => this.getPath())
                                      var elmnt = document.getElementById("rescue");
                                      elmnt.scrollIntoView();
                                    }}
                                  >
                                    Plan Rescue
                                  </Button>
                                  <Button
                                    color="danger"
                                    onClick={this.hideLoudNoise}
                                  >
                                    Dismiss
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        : ''
                      }
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow" id="rescue">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h2 className="text-uppercase ls-1 mb-1">
                        Plan Rescue
                      </h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className="mb-4 mb-xl-0" xl="4">
                      <h3>Route Optimizer</h3>
                      <Row>
                        <Col>
                          From<br/>
                          <select value={this.state.start} onChange={this.handleStartChange} >
                          <option value="">Any Exit</option>
                            <option value="Exit 1">Exit 1</option>
                            <option value="Exit 2">Exit 2</option>
                            <option value="Exit 3">Exit 3</option>
                            <option value="Exit 4">Exit 4</option>
                            <option value="C1-1">C1-1</option>
                            <option value="C1-2">C1-2</option>
                            <option value="E-1">E-1</option>
                            <option value="S1-1">S1-1</option>
                            <option value="S1-2">S1-2</option>
                            <option value="S1-3">S1-3</option>
                            <option value="C2-1">C2-1</option>
                            <option value="C2-2">C2-2</option>
                            <option value="C2-3">C2-3</option>
                            <option value="C2-4">C2-4</option>
                            <option value="C2-5">C2-5</option>
                            <option value="C2-6">C2-6</option>
                            <option value="E-2">E-2</option>
                            <option value="R2-1">R2-1</option>
                            <option value="R2-2">R2-2</option>
                            <option value="R2-3">R2-3</option>
                            <option value="R2-4">R2-4</option>
                            <option value="R2-5">R2-5</option>
                            <option value="S2-1">S2-1</option>
                            <option value="S2-2">S2-2</option>
                            <option value="S2-3">S2-3</option>
                            <option value="C3-1">C3-1</option>
                            <option value="C3-2">C3-2</option>
                            <option value="C3-3">C3-3</option>
                            <option value="C3-4">C3-4</option>
                            <option value="C3-5">C3-5</option>
                            <option value="C3-6">C3-6</option>
                            <option value="E-3">E-3</option>
                            <option value="R3-1">R3-1</option>
                            <option value="R3-2">R3-2</option>
                            <option value="R3-3">R3-3</option>
                            <option value="R3-4">R3-4</option>
                            <option value="R3-5">R3-5</option>
                            <option value="R3-6">R3-6</option>
                            <option value="S3-1">S3-1</option>
                            <option value="S3-2">S3-2</option>
                            <option value="S3-3">S3-3</option>
                          </select>
                        </Col>
                      </Row>
                      <img src={swap} width="10%" alt="swap" style={{margin: "1rem 0"}} onClick={this.swap}/>
                      <Row>
                        <Col>
                          To<br/>
                          <select value={this.state.end} onChange={this.handleEndChange} >
                            <option value="">Any Exit</option>
                            <option value="Exit 1">Exit 1</option>
                            <option value="Exit 2">Exit 2</option>
                            <option value="Exit 3">Exit 3</option>
                            <option value="Exit 4">Exit 4</option>
                            <option value="C1-1">C1-1</option>
                            <option value="C1-2">C1-2</option>
                            <option value="E-1">E-1</option>
                            <option value="S1-1">S1-1</option>
                            <option value="S1-2">S1-2</option>
                            <option value="S1-3">S1-3</option>
                            <option value="C2-1">C2-1</option>
                            <option value="C2-2">C2-2</option>
                            <option value="C2-3">C2-3</option>
                            <option value="C2-4">C2-4</option>
                            <option value="C2-5">C2-5</option>
                            <option value="C2-6">C2-6</option>
                            <option value="E-2">E-2</option>
                            <option value="R2-1">R2-1</option>
                            <option value="R2-2">R2-2</option>
                            <option value="R2-3">R2-3</option>
                            <option value="R2-4">R2-4</option>
                            <option value="R2-5">R2-5</option>
                            <option value="S2-1">S2-1</option>
                            <option value="S2-2">S2-2</option>
                            <option value="S2-3">S2-3</option>
                            <option value="C3-1">C3-1</option>
                            <option value="C3-2">C3-2</option>
                            <option value="C3-3">C3-3</option>
                            <option value="C3-4">C3-4</option>
                            <option value="C3-5">C3-5</option>
                            <option value="C3-6">C3-6</option>
                            <option value="E-3">E-3</option>
                            <option value="R3-1">R3-1</option>
                            <option value="R3-2">R3-2</option>
                            <option value="R3-3">R3-3</option>
                            <option value="R3-4">R3-4</option>
                            <option value="R3-5">R3-5</option>
                            <option value="R3-6">R3-6</option>
                            <option value="S3-1">S3-1</option>
                            <option value="S3-2">S3-2</option>
                            <option value="S3-3">S3-3</option>
                          </select>
                        </Col>
                      </Row>
                      <Row style={{marginTop: "2rem"}}>
                        <Col>
                          <div>
                            <img src={this.state.levelImages[2]} width="100%" alt="floorplan"/>
                            <img src={fireImage} width="100%" alt="floorplan"/>
                            <img src={this.state.levelImages[0]} width="100%" alt="floorplan"/>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col className="mb-4 mb-xl-0" xl="8">
                      <h3>Shortest Recommended Path</h3>
                      <Row>
                        {
                          !this.state.isFetching ? 
                            <div className="route-container">
                              <Col>
                                  {
                                    this.state.optimisedRoute ? 
                                      Array.isArray(this.state.optimisedRoute) ? 
                                        <h3 className="path">{this.state.optimisedRoute.join(' >> ')}</h3>
                                      : <h3 className="no-path">{this.state.optimisedRoute}</h3>
                                    : ''
                                  }
                              </Col>
                              {
                                this.state.start === '' && this.state.end === 'C3-1' ?
                                  <img src={route1} alt="route1" width="80%" />
                                : this.state.start === 'C3-1' && this.state.end === '' ?
                                  <img src={route2} alt="route1" width="80%" />
                                : ''
                              }
                            </div>
                          : <Col><h3 className="calculating">Calculating...</h3></Col>
                        }
                        
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
