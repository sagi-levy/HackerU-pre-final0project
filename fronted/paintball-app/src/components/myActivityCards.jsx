import PageHeader from "./common/pageHeader";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAll } from "../services/cardsServices";
import ActivityCardComponent from "./activityCardComponent";
const MyActivityCards = () => {
  const [activityCardsList, setActivityCardsList] = useState([]);

  useEffect(() => {
    const getActivityCards = async () => {
      const activityCards = await getAll();

      setActivityCardsList(activityCards.data);
    };

    getActivityCards();
  }, []);

  return (
    <>
      <PageHeader title={<h1>my activities cards</h1>} />
      <h2>here you can see all your booked paintball activities</h2>
      <button className="btn btn-danger create-btn">
        <Link
          style={{
            color: "blue",
            fontFamily: "cursive",
            justifyContent: "center",
          }}
          to={"/cards/create-activity-card"}
        >
          {" "}
          create a card
        </Link>
      </button>
      <div className="container">
        <div className="row">
          {activityCardsList.length ? (
            activityCardsList.map((activityCard) => {
              return (
                <ActivityCardComponent
                  key={activityCard._id}
                  id={activityCard._id}
                  activityName={activityCard.activityName}
                  activityDescription={activityCard.activityDescription}
                  activityAddress={activityCard.activityAddress}
                  activityDate={activityCard.activityDate}
                  bizUserPhone={activityCard.bizUserPhone}
                  bizUserName={activityCard.bizUserName}
                  activityImage={activityCard.activityImage}
                />
              );
            })
          ) : (
            <span className="m-5">loading your cards...</span>
          )}{" "}
        </div>
      </div>
    </>
  );
};
export default MyActivityCards;
