/*!

=========================================================
* Argon Dashboard React - v1.1.0
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

import Header from "components/Headers/Header.js";
import level1 from "../blueprints/L1.png"
import level2 from "../blueprints/L2.png"
import level3 from "../blueprints/L3.png"
import fire1 from "../blueprints/fire1.png"
import fire2 from "../blueprints/fire2.png"
import fire3 from "../blueprints/fire3.png"
import pwd from "../icons/pwd.png"
import swap from "../icons/swap.png"


class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedLevel: 1,
      fireLevel: 1,
      levelImages: [level1, level2, level3],
      start: "Any Exit",
      end: "Any Exit",
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
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
    })
  }

  handleEndChange = (e) => {
    this.setState({
      end: e.target.value
    })
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
    })
  }

  render() {

    let fireImage = null

    switch(this.state.fireLevel) {
      case 1:
        fireImage = fire1
        break
      case 2:
        fireImage = fire2
        break
      case 3:
        fireImage = fire3
        break
      default:
    }

    return (
      <>
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
                  {
                    this.state.selectedLevel === 2 ?
                      fireImage ?
                        <>
                          <img src={fireImage} width="70%" alt="floorplan"/>
                          <span className="circle" />
                        </>
                      : ''
                    : 
                      <>
                        <img src={this.state.levelImages[this.state.selectedLevel - 1]} width="70%" alt="floorplan" className="floorplan" />
                        {this.state.selectedLevel === 3 ? <img src={pwd} alt="pwd" width="3%" className="pwd-icon" /> : '' }
                      </>
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
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
                    <Col className="mb-4 mb-xl-0" xl="3">
                      <h3>Route Optimizer</h3>
                      <Row>
                        <Col>
                          From<br/>
                          <select value={this.state.start} onChange={this.handleStartChange} >
                            <option value="Any Exit">Any Exit</option>
                            <option value="C3-1">C3-1</option>
                            <option value="Exit 1">Exit 1</option>
                            <option value="Exit 2">Exit 2</option>
                            <option value="Exit 3">Exit 3</option>
                            <option value="Exit 4">Exit 4</option>
                          </select>
                        </Col>
                      </Row>
                      <img src={swap} width="10%" alt="swap" style={{margin: "1rem 0"}} onClick={this.swap}/>
                      <Row>
                        <Col>
                          To<br/>
                          <select value={this.state.end} onChange={this.handleEndChange} >
                            <option value="Any Exit">Any Exit</option>
                            <option value="C3-1">C3-1</option>
                            <option value="Exit 1">Exit 1</option>                        
                            <option value="Exit 2">Exit 2</option>
                            <option value="Exit 3">Exit 3</option>
                            <option value="Exit 4">Exit 4</option>
                          </select>
                        </Col>
                      </Row>
                    </Col>
                    <Col className="mb-4 mb-xl-0" xl="9">
                      <h3>Shortest Path</h3>
                      <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Sales value</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 2
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Line
                      data={chartExample1[this.state.chartExample1Data]}
                      options={chartExample1.options}
                      getDatasetAtEvent={e => console.log(e)}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Page visits</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Page name</th>
                      <th scope="col">Visitors</th>
                      <th scope="col">Unique users</th>
                      <th scope="col">Bounce rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">/argon/</th>
                      <td>4,569</td>
                      <td>340</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/index.html</th>
                      <td>3,985</td>
                      <td>319</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/charts.html</th>
                      <td>3,513</td>
                      <td>294</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        36,49%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/tables.html</th>
                      <td>2,050</td>
                      <td>147</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        50,87%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/profile.html</th>
                      <td>1,795</td>
                      <td>190</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Social traffic</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Referral</th>
                      <th scope="col">Visitors</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>1,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-gradient-danger"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>5,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">70%</span>
                          <div>
                            <Progress
                              max="100"
                              value="70"
                              barClassName="bg-gradient-success"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Google</th>
                      <td>4,807</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">80%</span>
                          <div>
                            <Progress max="100" value="80" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Instagram</th>
                      <td>3,678</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">75%</span>
                          <div>
                            <Progress
                              max="100"
                              value="75"
                              barClassName="bg-gradient-info"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">twitter</th>
                      <td>2,645</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">30%</span>
                          <div>
                            <Progress
                              max="100"
                              value="30"
                              barClassName="bg-gradient-warning"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
