import "bootstrap/dist/css/bootstrap.min.css";

import './homepage.css';

function Homepage() {
  return (
    <div className="App">

      {/* WEBPAGE INTRODUCTION*/}


      <p className="introduction">
        Welcome to the PACE Homepage! We are so excited to see your dancers this season in the studio. 
        Use the Menu bar above navigate this webpage. If you wish to register for classes for this Fall semester, 
        we recommend you check out our faculty and class information page to get more information about what is available to you!
        Next, login with your Google Account to register, then you will be able to search and add classes to your schedule!
        We hope to see you soon!
      </p>
      <div className="package_photo_div">
        <img className="package_photos" alt="studio1" src={"images/studio1.png"}/>
        <img className="package_photos" alt="studio2" src={"images/studio2.png"}/>
        <img className="package_photos"  alt="studio3" src={"images/studio3.png"}/>
      </div>

      </div>
      );
}

export default Homepage;