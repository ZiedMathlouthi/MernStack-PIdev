import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

//profile-header


import { getAllOffers } from "../../api/offer";
import CardOffer from "../../components/card/CardOffer";
import ProfileHeader from "../../components/profile-header";
// import img58 from "../../../assets/images/page-img/58.jpg";
// import img57 from "../../../assets/images/page-img/57.jpg";
// import img59 from "../../../assets/images/page-img/59.jpg";
// import img6 from "../../../assets/images/page-img/profile-bg6.jpg";

const CompanyOffers = () => {

  const [offers, setOffers] = useState();
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  const [filterMode, setFilterMode] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  

  const getOffers = async () => {
    console.log(filterMode);
    try {
      const response = await getAllOffers();
      if (filterMode === "" || filterMode === "all") {
        setOffers(response.data);
      } else {
        setOffers(
          response.data.filter((offer) => {
            return offer.mode === filterMode;
          })
        );
      }
      if (filterCategory === "" || filterCategory === "all") {
        setOffers(response.data);
      } else {
        setOffers(
          response.data.filter((offer) => {
            return offer.category === filterCategory;
          })
        );
      }
    } catch (e) {
      console.log(e);
      return;
    }
  };

  const handleFilterMode = (mode) => {
    setFilterMode(mode);
  };

  const handleFilterCategory = (category) => {
    setFilterCategory(category);
  };

  useEffect(() => {
    getOffers();
  }, [filterMode, filterCategory]);

  const handleClose = () => setShow(false);

  const handleDelete = () => {

  }

  return (
    <>
      <ProfileHeader />
      <div id="content-page" className="content-page">
        <Container>
          <div className="">
            <h1 className=" mb-5" style={{fontWeight:"bold"}}>Job Offers:</h1>
            <div className="d-flex flex-row flex-wrap gap-5">
            {offers &&
                offers.map((offer) => (
                  <CardOffer
                    id={offer._id}
                    name={offer.name}
                    description={offer.description}
                    category={offer.category}
                    requirements={offer.requirements}
                    publishedDate={offer.publishedDate}
                    owner={offer.owner}
                    mode={offer.mode}
                    offers={() => getOffers()}
                  />
                ))}
             
            </div>
           
           
           
          </div>
        </Container>
      </div>

     
    </>
  );
};

export default CompanyOffers;
