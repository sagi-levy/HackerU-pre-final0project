import PageHeader from "./common/pageHeader";
const Home = () => {
  return (
    <>
      <PageHeader title={<h1>Welcome To Paintball Israel</h1>} />
      <p>
        Hello and welcome to the home page of the Paintball Israel website. In
        order to get more details, watch a video of activities and proceed to
        determine the date of the activity, you must sign in to the website. in
        order to create activities, sign in as admin
      </p>

      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="true"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://cdn.pixabay.com/photo/2017/07/09/03/37/paintball-2486109_960_720.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/1281185274/photo/laser-tag-tactical-game-just-for-fun-forces-mission-science-fiction-playing-in-red-light.jpg?b=1&s=170667a&w=0&k=20&c=RqTQ9tfv5zYgcfxDazHcZrSyasj11mB_GyQKlxakKVk="
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://cdn.pixabay.com/photo/2021/11/27/12/47/paintball-6827953_960_720.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};
export default Home;
