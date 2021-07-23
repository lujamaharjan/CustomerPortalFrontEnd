import {useEffect, useState } from "react";
import axios  from "axios";
import qs from "qs";


import NavBar from "../components/NavBar";
import Hotline from "../components/Hotline";
import UserInfo from "../components/UserInfo";
import CurrentPackage from "../components/CurrentPackage";
import UserStatus from "../components/UserStatus";
import DisconnectedStatus from "../components/DisconnectedStatus";
import Bandwith from "../components/Bandwith";
import InternetUsages from "../components/InternetUsages";
import Footer from "../components/Footer";

import gif from "../img/dh.gif";

function Customer() {
  const [loaded, setLoaded] = useState(false);
  const [customer, setCustomer] = useState();
  

  const customerId = JSON.parse(localStorage.getItem("customerId"));
  console.log(customerId)
  useEffect(async() => {
    const data2 = {
      username: "DishhomeDevs",
      password: "DmnDevs@!@#",
      cusId: customerId,
    };

    const result = await axios({
      method: "post",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url: "http://fnapi.dishhome.com.np/fiberservice.asmx/FetchCustomerInfoDetailJson",
      data: qs.stringify(data2),
    });
    setCustomer(result.data.CustomerInfoResult.data.customer)
    setTimeout(() => {
      setLoaded(true);
    }, 2500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loaded ? (
        <>
          {customer !== null ? (
            <>
              <Hotline />
              <NavBar />
              <div className="container my-5">
                <div className="row">
                  <UserInfo customer={customer} />
                  <CurrentPackage customer={customer} />
                </div>
              </div>
              <div className="container my-2">
                <div className="row g-3">
                  <UserStatus customer={customer} />
                  <DisconnectedStatus customer={customer} />
                </div>
              </div>

              <div className="container my-5">
                <div className="row g-4">
                  <InternetUsages />
                  <Bandwith />
                </div>
              </div>
              <Footer />
            </>
          ) : (
            <p className="text-center mt-4"> Error in Fetching Data !</p>
          )}
        </>
      ) : (
        <div className="text-center" style={{ height: "100vh" }}>
          <img src={gif} alt="" style={{ marginTop: "40vh" }} />
        </div>
      )}
    </>
  );
}

export default Customer;
