import React from "react";
import { Container } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";

//profile-header
import ProfileHeader from "../../../components/profile-header";

// images
// import user05 from "../../../assets/images/user/05.jpg";
// import user06 from "../../../assets/images/user/06.jpg";
// import user07 from "../../../assets/images/user/07.jpg";
// import user08 from "../../../assets/images/user/08.jpg";
// import user09 from "../../../assets/images/user/09.jpg";
import img51 from "../../../assets/images/page-img/51.jpg";
import img52 from "../../../assets/images/page-img/52.jpg";
import img53 from "../../../assets/images/page-img/53.jpg";
import img54 from "../../../assets/images/page-img/54.jpg";
import img55 from "../../../assets/images/page-img/55.jpg";
import img56 from "../../../assets/images/page-img/56.jpg";
// import img58 from "../../../assets/images/page-img/58.jpg";
// import img57 from "../../../assets/images/page-img/57.jpg";
// import img59 from "../../../assets/images/page-img/59.jpg";
// import img6 from "../../../assets/images/page-img/profile-bg6.jpg";

const ProfileEvents = () => {
  return (
    <>
      <ProfileHeader />
      <div id="content-page" className="content-page">
        <Container>
          <div className="d-grid gap-3 d-grid-template-1fr-19">
            <div>
              <Card className=" rounded  mb-0">
                <div className="event-images">
                  <Link to="#">
                    <img src={img51} className="img-fluid" alt="Responsive" />
                  </Link>
                </div>
                <Card.Body>
                  <div className="d-flex">
                    <div className="date-of-event">
                      <span>Jan</span>
                      <h5>01</h5>
                    </div>
                    <div className="events-detail ms-3">
                      <h5>
                        <Link to="/dashboards/app/event-detail">
                          New Year Celebration
                        </Link>
                      </h5>
                      <p>Lorem Ipsum is simply dummy text</p>
                    </div>
                  </div>
                  <Link to="/dashboards/app/group-detail">
                    <button
                      type="submit"
                      className="btn btn-primary d-block w-100"
                    >
                      Details
                    </button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card className=" rounded  mb-0">
                <div className="event-images">
                  <Link to="#">
                    <img src={img52} className="img-fluid" alt="Responsive" />
                  </Link>
                </div>
                <div className="card-body">
                  <div className="d-flex">
                    <div className="date-of-event">
                      <span>Jan</span>
                      <h5>24</h5>
                    </div>
                    <div className="events-detail ms-3">
                      <h5>
                        <Link to="/dashboards/app/event-detail">
                          Birthday Celebration
                        </Link>
                      </h5>
                      <p>Lorem Ipsum is simply dummy text</p>
                    </div>
                  </div>
                  <Link to="/dashboards/app/group-detail">
                    <button
                      type="submit"
                      className="btn btn-primary d-block w-100"
                    >
                      Details
                    </button>
                  </Link>
                </div>
              </Card>
            </div>
            <div>
              <Card className="mb-0 rounded ">
                <div className="event-images">
                  <Link to="#">
                    <img src={img53} className="img-fluid" alt="Responsive " />
                  </Link>
                </div>
                <Card.Body>
                  <div className="d-flex">
                    <div className="date-of-event">
                      <span>Jan</span>
                      <h5>26</h5>
                    </div>
                    <div className="events-detail ms-3">
                      <h5>
                        <Link to="/dashboards/app/event-detail">
                          Republic Day
                        </Link>
                      </h5>
                      <p>Lorem Ipsum is simply dummy text</p>
                    </div>
                  </div>
                  <Link to="/dashboards/app/group-detail">
                    <button
                      type="submit"
                      className="btn btn-primary d-block w-100"
                    >
                      Details
                    </button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card className=" mb-0 rounded ">
                <div className="event-images">
                  <Link to="#">
                    <img src={img54} className="img-fluid" alt="Responsive" />
                  </Link>
                </div>
                <div className="card-body">
                  <div className="d-flex">
                    <div className="date-of-event">
                      <span>Feb</span>
                      <h5>04</h5>
                    </div>
                    <div className="events-detail ms-3">
                      <h5>
                        <Link to="/dashboards/app/event-detail">
                          Meetings & Conventions
                        </Link>
                      </h5>
                      <p>Lorem Ipsum is simply dummy text</p>
                    </div>
                  </div>
                  <Link to="/dashboards/app/group-detail">
                    <button
                      type="submit"
                      className="btn btn-primary d-block w-100"
                    >
                      Details
                    </button>
                  </Link>
                </div>
              </Card>
            </div>
            <div>
              <div className="card mb-0 rounded ">
                <div className="event-images">
                  <Link to="#">
                    <img src={img55} className="img-fluid" alt="Responsive " />
                  </Link>
                </div>
                <div className="card-body">
                  <div className="d-flex">
                    <div className="date-of-event">
                      <span>March</span>
                      <h5>01</h5>
                    </div>
                    <div className="events-detail ms-3">
                      <h5>
                        <Link to="/dashboards/app/event-detail">
                          Fun Events and Festivals{" "}
                        </Link>
                      </h5>
                      <p>Lorem Ipsum is simply dummy text</p>
                    </div>
                  </div>
                  <Link to="/dashboards/app/group-detail">
                    <button
                      type="submit"
                      className="btn btn-primary d-block w-100"
                    >
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <Card className=" mb-0 rounded ">
                <div className="event-images">
                  <Link to="#">
                    <img src={img56} className="img-fluid" alt="Responsive" />
                  </Link>
                </div>
                <Card.Body>
                  <div className="d-flex">
                    <div className="date-of-event">
                      <span>March</span>
                      <h5>10</h5>
                    </div>
                    <div className="events-detail ms-3">
                      <h5>
                        <Link to="/dashboards/app/event-detail">
                          Atlanta Retail Show
                        </Link>
                      </h5>
                      <p>Lorem Ipsum is simply dummy text</p>
                    </div>
                  </div>
                  <Link to="/dashboards/app/group-detail">
                    <button
                      type="submit"
                      className="btn btn-primary d-block w-100"
                    >
                      Details
                    </button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ProfileEvents;
