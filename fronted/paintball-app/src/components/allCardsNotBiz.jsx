import PageHeader from "./common/pageHeader";
import ActivityCardComponent from "./activityCardComponent";
import { useEffect, useState } from "react";
import { getAllCardsNotBiz } from "../services/cardsServices";
import ActivityCardComponentNotBiz from "./activityCardComponentNotBiz";
import { useAuth } from "../context/auth.context";
import ProtectedRoute from "./protectedRoute";

const AllCardsNotBiz = () => {
  const [activityCardsList, setActivityCardsList] = useState([]);
  const { logIn, user } = useAuth();
  console.log(user);
  useEffect(() => {
    const getActivityCards = async () => {
      const activityCards = await getAllCardsNotBiz();

      setActivityCardsList(activityCards.data);
      setFilteredData(activityCards.data);
    };

    getActivityCards();
  }, []);

  const [filteredData, setFilteredData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    if (isFiltered) {
      const filteredResults = filteredData.filter(
        (activityCard) => activityCard.customerId === user._id
      );
      setFilteredData(filteredResults);
    } else {
      setFilteredData(activityCardsList);
    }
  }, [activityCardsList, isFiltered]);

  const toggleFilter = () => {
    setIsFiltered((prevState) => !prevState);
  };

  // const showOnlyMyCards = () => {
  //   const showOnlyMyCards = activityCardsList.filter(
  //     (activityCard) => activityCard.user_id === user._id
  //   );
  //   setActivityCardsList(showOnlyMyCards);
  // };
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };
  const searchedResult = filteredData.filter((activityCard) =>
    activityCard.bizUserName.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <>
      <PageHeader title={<h1>my activities cards</h1>} />

      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search by name..."
      />

      <h2>here you can see all booked paintball activities</h2>
      {/*<button onClick={toggleFilter}>show only my activities</button>*/}
      <input
        onClick={toggleFilter}
        className="form-check-input m-2"
        type="checkbox"
        value=""
        id="flexCheckChecked"
      />
      <label className="form-check-label" htmlFor="flexCheckChecked">
        show only my activities
      </label>
      <div className="container">
        <div className="row">
          {!user.biz ? (
            searchedResult.length ? (
              searchedResult.map((activityCard) => {
                return (
                  <ActivityCardComponentNotBiz
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
              <span className="m-5">no such cards...</span>
            )
          ) : searchedResult.length ? (
            searchedResult.map((activityCard) => {
              return (
                <ProtectedRoute key={activityCard._id} onlyBiz>
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
                  />{" "}
                </ProtectedRoute>
              );
            })
          ) : (
            <span className="m-5">no such cards...</span>
          )}
        </div>
      </div>
    </>
  );
};
export default AllCardsNotBiz;

{
  /* {searchValue ? (
            filteredResults.length ? (
              filteredResults.map((activityCard) => {
                return (
                  <ActivityCardComponentNotBiz
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
              <span className="m-5">no such cards...</span>
            )
          ) : filteredData.length ? (
            filteredData.map((activityCard) => {
              return (
                <ActivityCardComponentNotBiz
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
          )}*/
}
