import PageHeader from "./common/pageHeader";

const About = () => {
  return (
    <>
      <PageHeader title={<h1>About Us</h1>} />
      <p>
        Hello, we are a site that provides options for scheduling activities in
        the field of paintball and laser tag. It has been 30 years that we have
        been engaged in the field and we have the most advanced equipment, the
        best instructors and of course, the best field in Israel to play
        paintball - a field that simulates a battlefield as you can see in the
        following photos. In order to create an activity and reserve it in the
        diary, you must register in biz mode and fill in details
      </p>
      <div className="container">
        <div className="row">
          <div className="col-md-3 gallery-img">
            <img
              src="../../../paintballImages/guns-g982450e51_1920.jpg"
              alt="Image 1"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-3 gallery-img">
            <img
              src="../../../paintballImages/paintball-g4fbdc8cfc_1920.jpg"
              alt="Image 2"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-3 gallery-img">
            <img
              src="../../../paintballImages/paintball-gc9b2222e0_1920.jpg"
              alt="Image 2"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-3 gallery-img">
            <img
              src="../../../paintballImages/paintball-gb171dafcc_1920.jpg"
              alt="Image 2"
              className="img-fluid rounded"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 gallery-img">
            <img
              src="../../../paintballImages/paintball-gace6135cd_1920.jpg"
              alt="Image 1"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-3 gallery-img">
            <img
              src="../../../paintballImages/paintball-g30468743a_1920.jpg"
              alt="Image 2"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-3 gallery-img">
            <iframe
              src="https://www.youtube.com/embed/q1YaZw3E-hY"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="col-md-3 gallery-img">
            <img
              src="../../../paintballImages/paintball-g87bd1bad5_1920.jpg"
              alt="Image 2"
              className="img-fluid rounded"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 gallery-img">
            <img
              src="../../../paintballImages/paintball-g54f5cbde1_1920.jpg"
              alt="Image 1"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-3 gallery-img">
            <img
              src="../../../paintballImages/paintball-g32b8a5fb5_1920.jpg"
              alt="Image 2"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-3 gallery-img">
            <img
              src="../../../paintballImages/paintball-g6b8b1f1c1_1920.jpg"
              alt="Image 2"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-3 gallery-img">
            <img
              src="../../../paintballImages/paintball-g4b55a704a_1920.jpg"
              alt="Image 2"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
