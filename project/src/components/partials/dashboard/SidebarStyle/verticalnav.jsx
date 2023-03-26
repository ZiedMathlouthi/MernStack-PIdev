import React, { useState, useContext, useEffect } from "react";

//router
import { Link, useLocation } from "react-router-dom";

//react-bootstrap
import {
  Accordion,
  useAccordionButton,
  AccordionContext,
  Nav,
  Tooltip,
  OverlayTrigger,
  Button,
} from "react-bootstrap";

function CustomToggle({ children, eventKey, onClick }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, (active) =>
    onClick({ state: !active, eventKey: eventKey })
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Link
      to="#"
      aria-expanded={isCurrentEventKey ? "true" : "false"}
      className="nav-link"
      role="button"
      onClick={(e) => {
        decoratedOnClick(isCurrentEventKey);
      }}
    >
      {children}
    </Link>
  );
}

const VerticalNav = React.memo(() => {
  const user = JSON.parse(localStorage.getItem("myData"));
  const [activeMenu, setActiveMenu] = useState(false);
  const [active, setActive] = useState("");
  //location
  let location = useLocation();
  const [expert, setExpert] = useState(false);
  const [company, setCompany] = useState(false);
  // console.log(document);
  useEffect(() => {
    if (user.user.role === "expert") {
      setExpert(true);
      setCompany(false);
    }
    if (user.user.role === "company") {
      setExpert(false);
      setCompany(true);
    }
  }, []);

  return (
    <React.Fragment>
      <Accordion as="ul" className="navbar-nav iq-main-menu" id="sidebar-menu">
        <li className="nav-item static-item">
          <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
            <span className="default-icon">Main Menu</span>
            <span
              className="mini-icon"
              data-bs-toggle="tooltip"
              title="Social"
              data-bs-placement="right"
            >
              -
            </span>
          </Link>
        </li>
        <li
          className={`${location.pathname === "/" ? "active" : ""} nav-item `}
        >
          <Link
            className={`${location.pathname === "/" ? "active" : ""} nav-link `}
            aria-current="page"
            to="/"
          >
            <OverlayTrigger placement="right" overlay={<Tooltip>home</Tooltip>}>
              <i className="icon material-symbols-outlined">newspaper</i>
            </OverlayTrigger>
            <span className="item-name">Home</span>
          </Link>
        </li>
        <li
          className={`${
            location.pathname === "/dashboards/profiles/profile2"
              ? "active"
              : ""
          } nav-item`}
        >
          <Link
            className={`${
              location.pathname === "/dashboards/profiles/profile2"
                ? "active"
                : ""
            } nav-link `}
            aria-current="page"
            to="/dashboards/profiles/profile2"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Profile</Tooltip>}
            >
              <i className="icon material-symbols-outlined">person</i>
            </OverlayTrigger>
            <span className="item-name">Profile</span>
          </Link>
        </li>
        {!company ? (
          <Nav.Item as="li">
            <Link
              className={`${
                location.pathname === "/dashboard/app/profile-forum"
                  ? "active"
                  : ""
              } nav-link `}
              aria-current="page"
              to="/dashboard/app/profile-forum"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Group</Tooltip>}
              >
                <i className="icon material-symbols-outlined">groups</i>
              </OverlayTrigger>
              <span className="item-name">{expert ? "List Test" : "Test"}</span>
            </Link>
          </Nav.Item>
        ) : (
          ""
        )}
        {!expert && !company ? (
          <Nav.Item as="li">
            <Link
              className={`${
                location.pathname === "/dashboards/app/groups" ? "active" : ""
              } nav-link `}
              aria-current="page"
              to="/dashboards/app/groups"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Group</Tooltip>}
              >
                <i className="icon material-symbols-outlined">groups</i>
              </OverlayTrigger>
              <span className="item-name">Job Offers</span>
            </Link>
          </Nav.Item>
        ) : (
          ""
        )}
        {!expert && company ? (
          <Nav.Item as="li">
            <Link
              className={`${
                location.pathname === "/dashboards/app/groups" ? "active" : ""
              } nav-link `}
              aria-current="page"
              to="/dashboards/app/groups"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Group</Tooltip>}
              >
                <i className="icon material-symbols-outlined">groups</i>
              </OverlayTrigger>
              <span className="item-name">Interview</span>
            </Link>
          </Nav.Item>
        ) : (
          ""
        )}

        {!company ? (
          <Nav.Item as="li">
            <Link
              className={`${
                location.pathname === "/dashboards/app/profile-events"
                  ? "active"
                  : ""
              } nav-link `}
              aria-current="page"
              to="/dashboards/app/profile-events"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Group</Tooltip>}
              >
                <i className="icon material-symbols-outlined">groups</i>
              </OverlayTrigger>
              <span className="item-name">
                {expert ? "List Course" : "Course"}{" "}
              </span>
            </Link>
          </Nav.Item>
        ) : (
          ""
        )}

        {expert ? (
          <div className="d-grid my-3">
            <Button variant="success" className="rounded-pill mb-1">
              add Test
            </Button>
            <Button variant="success" className="rounded-pill mb-1">
              Add Courses
            </Button>
          </div>
        ) : (
          ""
        )}
        {company ? (
          <div className="d-grid my-3">
            <Button variant="success" className="rounded-pill mb-1">
              Add Offers
            </Button>
          </div>
        ) : (
          ""
        )}

        <li className="nav-item static-item">
          <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
            <span className="default-icon">Helpers Menu</span>
            <span
              className="mini-icon"
              data-bs-toggle="tooltip"
              title="Social"
              data-bs-placement="right"
            >
              -
            </span>
          </Link>
        </li>
        <Accordion.Item
          as="li"
          eventKey="profile-menu"
          bsPrefix={`nav-item ${active === "profile" ? "active" : ""} `}
          onClick={() => setActive("profile")}
        >
          <CustomToggle
            eventKey="profile-menu"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Profiles</Tooltip>}
            >
              <i className="icon material-symbols-outlined">person</i>
            </OverlayTrigger>
            <span className="item-name">Profiles</span>
            <i className="right-icon material-symbols-outlined">
              chevron_right
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="profile-menu">
            <ul className="sub-nav">
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/app/profile"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/app/profile"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Profile</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> P </i>
                  </OverlayTrigger>
                  <span className="item-name"> Profile </span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboards/profiles/profile1"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboards/profiles/profile1"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Profile 1</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> P1 </i>
                  </OverlayTrigger>
                  <span className="item-name"> Profile 1</span>
                </Link>
              </Nav.Item>

              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboards/profiles/profile3"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboards/profiles/profile3"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Profile 3</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> P3 </i>
                  </OverlayTrigger>
                  <span className="item-name"> Profile 3</span>
                </Link>
              </Nav.Item>

              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboards/app/profile-videos"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboards/app/profile-videos"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Profile Video</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> PV </i>
                  </OverlayTrigger>
                  <span className="item-name"> Profile Video</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboards/app/profile-events"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboards/app/profile-events"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Profile Events</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> PE </i>
                  </OverlayTrigger>
                  <span className="item-name"> Courses</span>
                </Link>
              </Nav.Item>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>
        <Accordion.Item as="li" eventKey="friends-menu" bsPrefix="nav-item">
          <CustomToggle
            eventKey="friends-menu"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Friend</Tooltip>}
            >
              <i className="icon material-symbols-outlined">people</i>
            </OverlayTrigger>
            <span className="item-name">Friend</span>
            <i className="right-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="friends-menu">
            <ul className="sub-nav">
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboards/app/friend-list"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboards/app/friend-list"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Friend List</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> FL </i>
                  </OverlayTrigger>
                  <span className="item-name">Friend List</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/app/friend-profile"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/app/friend-profile"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Friend Profile</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> FP </i>
                  </OverlayTrigger>
                  <span className="item-name">Friend Profile</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/app/friend-request"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/app/friend-request"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Friend Request</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> FR </i>
                  </OverlayTrigger>
                  <span className="item-name">Friend Request</span>
                </Link>
              </Nav.Item>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>
        <Nav.Item as="li">
          <Link
            className={`${
              location.pathname === "/dashboard/app/notification"
                ? "active"
                : ""
            } nav-link `}
            aria-current="page"
            to="/dashboard/app/notification"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Notification</Tooltip>}
            >
              <i className="icon material-symbols-outlined">notifications</i>
            </OverlayTrigger>
            <span className="item-name">Notification</span>
          </Link>
        </Nav.Item>
        <li className="nav-item static-item">
          <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
            <span className="default-icon">FEATURED</span>
            <span
              className="mini-icon"
              data-bs-toggle="tooltip"
              title="Social"
              data-bs-placement="right"
            >
              -
            </span>
          </Link>
        </li>
        <Nav.Item as="li">
          <Link
            className={`${
              location.pathname === "/chat/index" ? "active" : ""
            } nav-link `}
            aria-current="page"
            to="/chat/index"
            target="_blank noopener,noreferrer"
          >
            <OverlayTrigger placement="right" overlay={<Tooltip>Chat</Tooltip>}>
              <i className="icon material-symbols-outlined">message</i>
            </OverlayTrigger>
            <span className="item-name">Chat</span>
          </Link>
        </Nav.Item>
        <li className="nav-item static-item">
          <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
            <span className="default-icon">OTHER PAGES</span>
            <span className="mini-icon">-</span>
          </Link>
        </li>
        <Accordion.Item as="li" eventKey="store-menu" bsPrefix="nav-item">
          <CustomToggle
            eventKey="store-menu"
            active={activeMenu === "store-menu" ? true : false}
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Store</Tooltip>}
            >
              <i className="icon material-symbols-outlined">storefront</i>
            </OverlayTrigger>
            <span className="item-name">Store</span>
            <i className="right-icon material-symbols-outlined">
              chevron_right
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="store-menu">
            <ul className="sub-nav">
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname ===
                    "/dashboards/store/store-category-grid"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboards/store/store-category-grid"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Category Grid</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> CG </i>
                  </OverlayTrigger>
                  <span className="item-name">Category Grid</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname ===
                    "/dashboards/store/store-category-list"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboards/store/store-category-list"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Category list</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> CL </i>
                  </OverlayTrigger>
                  <span className="item-name">Category list</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboards/store/store-detail"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboards/store/store-detail"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Store Detail</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> SD </i>
                  </OverlayTrigger>
                  <span className="item-name">Store Detail</span>
                </Link>
              </Nav.Item>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>
        <Accordion.Item as="li" eventKey="mail-menu" bsPrefix="nav-item">
          <CustomToggle
            eventKey="mail-menu"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <OverlayTrigger placement="right" overlay={<Tooltip>Mail</Tooltip>}>
              <i className="icon material-symbols-outlined">mail_outline</i>
            </OverlayTrigger>
            <span className="item-name">Mail</span>
            <i className="right-icon material-symbols-outlined">
              chevron_right
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="mail-menu">
            <ul className="sub-nav">
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/Email/email"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/Email/email"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Inbox</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> I </i>
                  </OverlayTrigger>
                  <span className="item-name">Inbox</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/Email/email-compose"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/Email/email-compose"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Email Compose</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> EC </i>
                  </OverlayTrigger>
                  <span className="item-name">Email Compose</span>
                </Link>
              </Nav.Item>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>
        <Accordion.Item as="li" eventKey="auth-menu" bsPrefix="nav-item">
          <CustomToggle
            eventKey="auth-menu"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <OverlayTrigger placement="right" overlay={<Tooltip>Auth</Tooltip>}>
              <i className="icon material-symbols-outlined">library_books</i>
            </OverlayTrigger>
            <span className="item-name">Auth</span>
            <i className="right-icon material-symbols-outlined">
              chevron_right
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="auth-menu">
            <ul className="sub-nav">
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/auth/sign-in" ? "active" : ""
                  } nav-link`}
                  to="/auth/sign-in"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Login</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> L </i>
                  </OverlayTrigger>
                  <span className="item-name">Login</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/auth/sign-up" ? "active" : ""
                  } nav-link`}
                  to="/auth/sign-up"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Register</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> R </i>
                  </OverlayTrigger>
                  <span className="item-name">Register</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/auth/recoverpw" ? "active" : ""
                  } nav-link`}
                  to="/auth/recoverpw"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Recover Password</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> RP </i>
                  </OverlayTrigger>
                  <span className="item-name">Recover Password</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/auth/confirm-mail" ? "active" : ""
                  } nav-link`}
                  to="/auth/confirm-mail"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Confirm Mail</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> CM </i>
                  </OverlayTrigger>
                  <span className="item-name">Confirm Mail</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/auth/lock-screen" ? "active" : ""
                  } nav-link`}
                  to="/auth/lock-screen"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Lock Screen</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> LS </i>
                  </OverlayTrigger>
                  <span className="item-name">Lock Screen</span>
                </Link>
              </Nav.Item>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>
        <Nav.Item as="li">
          <Link
            className={`${
              location.pathname === "/extra-pages/pages-comingsoon"
                ? "active"
                : ""
            } nav-link`}
            to="/extra-pages/pages-comingsoon"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Comming Soon</Tooltip>}
            >
              <i className="icon material-symbols-outlined">
                fiber_smart_record
              </i>
            </OverlayTrigger>
            <span className="item-name">Pages Comingsoon</span>
          </Link>
        </Nav.Item>
        <li>
          <hr className="hr-horizontal" />
        </li>
        <li className="nav-item static-item">
          <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
            <span className="default-icon">Elements</span>
            <span className="mini-icon">-</span>
          </Link>
        </li>
        <Accordion.Item as="li" eventKey="sidebar-ui" bsPrefix="nav-item">
          <CustomToggle
            eventKey="sidebar-ui"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Ui Elements</Tooltip>}
            >
              <i className="icon material-symbols-outlined">adjust</i>
            </OverlayTrigger>
            <span className="item-name">Ui Elements</span>
            <i className="right-icon material-symbols-outlined">
              chevron_right
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="sidebar-ui">
            <ul className="sub-nav">
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/ui-kit/ui-color"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/ui-kit/ui-color"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Colors</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> C </i>
                  </OverlayTrigger>
                  <span className="item-name">Colors</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/ui-kit/ui-typography"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/ui-kit/ui-typography"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Typography</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> T </i>
                  </OverlayTrigger>
                  <span className="item-name">Typography</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/ui-kit/ui-alerts"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/ui-kit/ui-alerts"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Alerts</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> A </i>
                  </OverlayTrigger>
                  <span className="item-name">Alerts</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/ui-kit/ui-badges"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/ui-kit/ui-badges"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Badges</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> B </i>
                  </OverlayTrigger>
                  <span className="item-name">Badges</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/ui-kit/ui-breadcrumb"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/ui-kit/ui-breadcrumb"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Breadcrumb</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> B </i>
                  </OverlayTrigger>
                  <span className="item-name">Breadcrumb</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/ui-kit/ui-buttons"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/ui-kit/ui-buttons"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Buttons</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> B </i>
                  </OverlayTrigger>
                  <span className="item-name">Buttons</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/ui-kit/ui-cards"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/ui-kit/ui-cards"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Cards</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> C </i>
                  </OverlayTrigger>
                  <span className="item-name">Cards</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/ui-kit/ui-carousel"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/ui-kit/ui-carousel"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Carousel</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> CR </i>
                  </OverlayTrigger>
                  <span className="item-name">Carousel</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/ui-kit/ui-embed-video"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/ui-kit/ui-embed-video"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Video</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> V </i>
                  </OverlayTrigger>
                  <span className="item-name">Video</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/ui-kit/ui-grid"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/ui-kit/ui-grid"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Grid</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> G </i>
                  </OverlayTrigger>
                  <span className="item-name">Grid</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/ui-kit/ui-images"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/ui-kit/ui-images"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Images</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> I </i>
                  </OverlayTrigger>
                  <span className="item-name">Images</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/ui-kit/ui-list-groups"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/ui-kit/ui-list-groups"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>list Group</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> LG </i>
                  </OverlayTrigger>
                  <span className="item-name">list Group</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/ui-kit/ui-modal"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/ui-kit/ui-modal"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Modal</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> M </i>
                  </OverlayTrigger>
                  <span className="item-name">Modal</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/ui-kit/ui-notifications"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/ui-kit/ui-notifications"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Notifications</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> N </i>
                  </OverlayTrigger>
                  <span className="item-name">Notifications</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/ui-kit/ui-pagination"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/ui-kit/ui-pagination"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Pagination</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> P </i>
                  </OverlayTrigger>
                  <span className="item-name">Pagination</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/ui-kit/ui-popovers"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/ui-kit/ui-popovers"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Popovers</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> PO </i>
                  </OverlayTrigger>
                  <span className="item-name">Popovers</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/ui-kit/ui-progressbars"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/ui-kit/ui-progressbars"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Progressbars</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> P </i>
                  </OverlayTrigger>
                  <span className="item-name">Progressbars</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/ui-kit/ui-tabs"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/ui-kit/ui-tabs"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Tabs</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> T </i>
                  </OverlayTrigger>
                  <span className="item-name">Tabs</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/ui-kit/ui-tooltips"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/ui-kit/ui-tooltips"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Tooltips</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> TT </i>
                  </OverlayTrigger>
                  <span className="item-name">Tooltips</span>
                </Link>
              </Nav.Item>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>
        <Accordion.Item as="li" eventKey="sidebar-wizard" bsPrefix="nav-item">
          <CustomToggle
            eventKey="sidebar-wizard"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Forms Wizard</Tooltip>}
            >
              <i className="icon material-symbols-outlined">text_snippet</i>
            </OverlayTrigger>
            <span className="item-name">Forms Wizard</span>
            <i className="right-icon material-symbols-outlined">
              chevron_right
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="sidebar-wizard">
            <ul className="sub-nav">
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/form/form-wizard"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/form/form-wizard"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Simple Wizard</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> SW </i>
                  </OverlayTrigger>
                  <span className="item-name">Simple Wizard</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/form/form-wizard-validate"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/form/form-wizard-validate"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Validate Wizard</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> VW </i>
                  </OverlayTrigger>
                  <span className="item-name">Validate Wizard</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/form/form-wizard-vertical"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/form/form-wizard-vertical"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Vertical Wizard</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> VW </i>
                  </OverlayTrigger>
                  <span className="item-name">Vertical Wizard</span>
                </Link>
              </Nav.Item>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>
        <Accordion.Item as="li" eventKey="sidebar-uiforms" bsPrefix="nav-item">
          <CustomToggle
            eventKey="sidebar-uiforms"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Forms</Tooltip>}
            >
              <i className="icon material-symbols-outlined">view_timeline</i>
            </OverlayTrigger>
            <span className="item-name">Forms</span>
            <i className="right-icon material-symbols-outlined">
              chevron_right
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="sidebar-uiforms">
            <ul className="sub-nav">
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/form/form-element"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/form/form-element"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Form Elements</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> FE </i>
                  </OverlayTrigger>
                  <span className="item-name">Form Elements</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/form/form-validation"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/form/form-validation"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Form Validation</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> FV </i>
                  </OverlayTrigger>
                  <span className="item-name">Form Validation</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/form/form-switch"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/form/form-switch"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Form Switch</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> FS </i>
                  </OverlayTrigger>
                  <span className="item-name">Form Switch</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/form/form-checkbox"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/form/form-checkbox"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Form Checkbox</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> FC </i>
                  </OverlayTrigger>
                  <span className="item-name">Form Checkbox</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/form/form-radio"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/form/form-radio"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Form Radio</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> FR </i>
                  </OverlayTrigger>
                  <span className="item-name">Form Radio</span>
                </Link>
              </Nav.Item>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>
        <Accordion.Item
          as="li"
          eventKey="sidebar-icons"
          bsPrefix="nav-item mb-5"
        >
          <CustomToggle
            eventKey="sidebar-icons"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Icons</Tooltip>}
            >
              <i className="icon material-symbols-outlined">error_outline</i>
            </OverlayTrigger>
            <span className="item-name">Icons</span>
            <i className="right-icon material-symbols-outlined">
              chevron_right
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="sidebar-icons">
            <ul className="sub-nav">
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/icon/fontawesome-5"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/icon/fontawesome-5"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Font Awesome 5</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> F </i>
                  </OverlayTrigger>
                  <span className="item-name">Font Awesome 5</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/icon/lineawesome"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/icon/lineawesome"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Line Awesome</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> L </i>
                  </OverlayTrigger>
                  <span className="item-name">Line Awesome</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/icon/remixicon"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/icon/remixicon"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Remixicon</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> R </i>
                  </OverlayTrigger>
                  <span className="item-name">Remixicon</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/dashboard/icon/material"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/icon/material"
                >
                  <i className="icon">
                    <svg
                      className="icon-10"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Material</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> M </i>
                  </OverlayTrigger>
                  <span className="item-name">Material</span>
                </Link>
              </Nav.Item>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>
      </Accordion>
    </React.Fragment>
  );
});

export default VerticalNav;
