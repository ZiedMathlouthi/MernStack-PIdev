import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { getAllOffers } from "../../api/offer";
import CardOffer from "../../components/card/CardOffer";
import ProfileHeader from "../../components/profile-header";
import { getMeetsInvited, getMeetsOwner } from "../../api/meet";

const MeetsPage = () => {
  const [meetings, setMeetings] = useState();
  const [meetingsInvited, setMeetingsInvited] = useState();

  const user = JSON.parse(localStorage.getItem("myData"));

  const [expert, setExpert] = useState(false);
  const [company, setCompany] = useState(false);
  // console.log(document);
  //   useEffect(() => {
  //     if (user.user.role === "expert") {
  //       setExpert(true);
  //       setCompany(false);
  //     }
  //     if (user.user.role === "company") {
  //       setExpert(false);
  //       setCompany(true);
  //     }
  //   }, []);

  //   For company
  const getMeetingsOwner = async (id) => {
    const response = await getMeetsOwner(id);
    setMeetings(response.data);
    console.log("Meetings : ", response);
  };

  const getMeetingsInvited = async (id) => {
    const response = await getMeetsInvited(id);
    setMeetings(response.data);
    console.log("Meetings : ", response);
  };

  useEffect(() => {
    if (user.user.role === "company") {
      getMeetingsOwner(user.user._id);
    } else {
      getMeetingsInvited(user.user._id);
    }
  }, []);

  return (
    <>
      <ProfileHeader />
      <div id="content-page" className="content-page">
        <Container>
          <div className="">
            <h1 className=" mb-5" style={{ fontWeight: "bold" }}>
              Meets:
            </h1>
            <div className="d-flex flex-row flex-wrap gap-5">
              {meetings &&
                meetings.map((meet) => (
                  <MeetingCard
                    name={meet.name}
                    url={meet.url}
                    startDate={meet.startDateTime}
                    expireDate={meet.expires}
                  />
                ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default MeetsPage;

export const MeetingCard = ({ name, url, startDate, expireDate }) => {
  const formatDate = (d) => {
    const date = new Date(d);
    const options = {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  return (
    <div
      className="card "
      style={{
        padding: "15px 30px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div class="card-body d-flex flex-column">
        <div className="">
          <h4
            class="card-title text-center mb-3"
            style={{ fontSize: "20px", fontWeight: "bold" }}
          >
            {name}
          </h4>

          <div>
            <h5 style={{ fontWeight: "bold", opacity: "0.8" }}>
              Starts Date :{" "}
            </h5>
            {formatDate(startDate)}
          </div>
          <div className="mt-3">
            <h5 style={{ fontWeight: "bold", opacity: "0.8" }}>
              Expires Date :{" "}
            </h5>
            {formatDate(expireDate)}
          </div>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-end">
        <a href={url} target="_blank">
          {" "}
          Join now
        </a>
      </div>
    </div>
  );
};
