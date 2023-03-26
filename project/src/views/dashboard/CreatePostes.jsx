import React from "react";
import {
  Row,
  Col,
  Container,
  Dropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import CustomToggle from "../../components/dropdowns";
import ShareOffcanvas from "../../components/share-offcanvas";

//image
import user1 from "../../assets/images/user/1.jpg";
import user01 from "../../assets/images/user/01.jpg";
import user2 from "../../assets/images/user/02.jpg";
import user3 from "../../assets/images/user/03.jpg";
// import user4 from "../../assets/images/user/04.jpg";
import img1 from "../../assets/images/small/07.png";
// import img2 from "../../assets/images/small/08.png";
// import img3 from "../../assets/images/small/09.png";
// import img4 from "../../assets/images/small/10.png";
// import img5 from "../../assets/images/small/11.png";
// import img6 from "../../assets/images/small/12.png";
// import img7 from "../../assets/images/small/13.png";
// import img8 from "../../assets/images/small/14.png";
import p1 from "../../assets/images/page-img/p1.jpg";
// import s1 from "../../assets/images/page-img/s1.jpg";
// import s2 from "../../assets/images/page-img/s2.jpg";
// import s3 from "../../assets/images/page-img/s3.jpg";
// import s4 from "../../assets/images/page-img/s4.jpg";
// import s5 from "../../assets/images/page-img/s5.jpg";
import p2 from "../../assets/images/page-img/p2.jpg";
import p3 from "../../assets/images/page-img/p3.jpg";
// import p4 from "../../assets/images/page-img/p4.jpg";
// import p5 from "../../assets/images/page-img/p5.jpg";
// import img42 from "../../assets/images/page-img/42.png";
import icon1 from "../../assets/images/icon/01.png";
import icon2 from "../../assets/images/icon/02.png";
import icon3 from "../../assets/images/icon/03.png";
import icon4 from "../../assets/images/icon/04.png";
import icon5 from "../../assets/images/icon/05.png";
import icon6 from "../../assets/images/icon/06.png";
import icon7 from "../../assets/images/icon/07.png";
// import img9 from "../../assets/images/small/img-1.jpg";
// import img10 from "../../assets/images/small/img-2.jpg";
import loader from "../../assets/images/page-img/page-load-loader.gif";

const Postes = () => {
  //   const [show, setShow] = useState(false);
  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  return (
    <>
      <div id="content-page" className="content-page ">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="row m-0 p-0 w-auto">
              <Col sm={12}>
                <Card
                  id="post-modal-data"
                  className="card-block card-stretch card-height"
                >
                  <div className="card-header d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Create Post</h4>
                    </div>
                  </div>
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <div className="user-img">
                        <img
                          src={user1}
                          alt="user1"
                          className="avatar-60 rounded-circle"
                        />
                      </div>
                      <form
                        className="post-text ms-3 w-100 "
                        // onClick={handleShow}
                      >
                        <input
                          type="text"
                          className="form-control rounded"
                          placeholder="Write something here..."
                          style={{ border: "none" }}
                        />
                      </form>
                    </div>
                    <hr></hr>
                    <ul className=" post-opt-block d-flex list-inline m-0 p-0 flex-wrap w-100">
                      <li className="me-3 mb-md-0 mb-2 w-50">
                        <Link to="#" className="btn btn-soft-primary">
                          <img
                            src={img1}
                            alt="icon"
                            className="img-fluid me-2"
                          />{" "}
                          Photo/Video
                        </Link>
                      </li>
                      <li className="me-3 mb-md-0 mb-2 ms-auto ">
                        <button type="submit" className="btn btn-primary w-100">
                          Post
                        </button>
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12}>
                <Card className=" card-block card-stretch card-height">
                  <Card.Body>
                    <div className="user-post-data">
                      <div className="d-flex justify-content-between">
                        <div className="me-3">
                          <img
                            className="rounded-circle img-fluid"
                            src={user01}
                            alt=""
                          />
                        </div>
                        <div className="w-100">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h5 className="mb-0 d-inline-block">
                                Anna Sthesia
                              </h5>
                              <span className="mb-0 ps-1 d-inline-block">
                                Add New Post
                              </span>
                              <p className="mb-0 text-primary">Just Now</p>
                            </div>
                            <div className="card-post-toolbar">
                              <Dropdown>
                                <Dropdown.Toggle variant="bg-transparent">
                                  <span className="material-symbols-outlined">
                                    more_horiz
                                  </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                  <Dropdown.Item className=" p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <div className="h4 material-symbols-outlined">
                                        <i className="ri-save-line"></i>
                                      </div>
                                      <div className="data ms-2">
                                        <h6>Save Post</h6>
                                        <p className="mb-0">
                                          Add this to your saved items
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className="p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-close-circle-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Hide Post</h6>
                                        <p className="mb-0">
                                          See fewer posts like this.
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-user-unfollow-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Unfollow User</h6>
                                        <p className="mb-0">
                                          Stop seeing posts but stay friends.
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-notification-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Notifications</h6>
                                        <p className="mb-0">
                                          Turn on notifications for this post
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Morbi nulla dolor, ornare at commodo non, feugiat non
                        nisi. Phasellus faucibus mollis pharetra. Proin blandit
                        ac massa sed rhoncus
                      </p>
                    </div>
                    <div className="user-post">
                      <div className=" d-grid grid-rows-2 grid-flow-col gap-3">
                        <div className="row-span-2 row-span-md-1">
                          <img
                            src={p2}
                            alt="post1"
                            className="img-fluid rounded w-100"
                          />
                        </div>
                        <div className="row-span-1">
                          <img
                            src={p1}
                            alt="post2"
                            className="img-fluid rounded w-100"
                          />
                        </div>
                        <div className="row-span-1 ">
                          <img
                            src={p3}
                            alt="post3"
                            className="img-fluid rounded w-100"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="comment-area mt-3">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="like-block position-relative d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="like-data">
                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle}>
                                  <img
                                    src={icon1}
                                    className="img-fluid"
                                    alt=""
                                  />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className=" py-2">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Like</Tooltip>}
                                    className="ms-2 me-2"
                                  >
                                    <img
                                      src={icon1}
                                      className="img-fluid me-2"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Love</Tooltip>}
                                    className="me-2"
                                  >
                                    <img
                                      src={icon2}
                                      className="img-fluid me-2"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Happy</Tooltip>}
                                    className="me-2"
                                  >
                                    <img
                                      src={icon3}
                                      className="img-fluid me-2"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>HaHa</Tooltip>}
                                    className="me-2"
                                  >
                                    <img
                                      src={icon4}
                                      className="img-fluid me-2"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Think</Tooltip>}
                                    className="me-2"
                                  >
                                    <img
                                      src={icon5}
                                      className="img-fluid me-2"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Sade</Tooltip>}
                                    className="me-2"
                                  >
                                    <img
                                      src={icon6}
                                      className="img-fluid me-2"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Lovely</Tooltip>}
                                    className="me-2"
                                  >
                                    <img
                                      src={icon7}
                                      className="img-fluid me-2"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                            <div className="total-like-block ms-2 me-3">
                              <Dropdown>
                                <Dropdown.Toggle
                                  as={CustomToggle}
                                  id="post-option"
                                >
                                  140 Likes
                                </Dropdown.Toggle>
                              </Dropdown>
                            </div>
                          </div>
                          <div className="total-comment-block">
                            <Dropdown>
                              <Dropdown.Toggle
                                as={CustomToggle}
                                id="post-option"
                              >
                                20 Comment
                              </Dropdown.Toggle>
                            </Dropdown>
                          </div>
                        </div>
                        <ShareOffcanvas />
                      </div>
                      <hr />
                      <ul className="post-comments list-inline p-0 m-0">
                        <li className="mb-2">
                          <div className="d-flex">
                            <div className="user-img">
                              <img
                                src={user2}
                                alt="user1"
                                className="avatar-35 rounded-circle img-fluid"
                              />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Monty Carlo</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link to="#">like</Link>
                                <Link to="#">reply</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex">
                            <div className="user-img">
                              <img
                                src={user3}
                                alt="user1"
                                className="avatar-35 rounded-circle img-fluid"
                              />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Paul Molive</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link to="#">like</Link>
                                <Link to="#">reply</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <form className="comment-text d-flex align-items-center mt-3">
                        <input
                          type="text"
                          className="form-control rounded"
                          placeholder="Enter Your Comment"
                        />
                        <div className="comment-attagement d-flex">
                          <Link to="#">
                            <i className="ri-link me-3"></i>
                          </Link>
                          <Link to="#">
                            <i className="ri-user-smile-line me-3"></i>
                          </Link>
                          <Link to="#">
                            <i className="ri-camera-line me-3"></i>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Col>

            <div className="col-sm-12 text-center">
              <img src={loader} alt="loader" style={{ height: "100px" }} />
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Postes;
