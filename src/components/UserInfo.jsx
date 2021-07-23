
import profile from "../img/images.png";

const UserInfo = ({customer}) => {
  
  return (
    <div className="col-md-6">
      <div className="border-danger">
        <div className="row">
          <div className="col-md-4 img-profile-wrapper">
            <img
              src={profile}
              alt=""
              className="img-fluid w-75 w-sm-50 img-profile"
            />
          </div>
          <div className="col-md-8">
            <p className="welcome fw-bold fs-4">
              Welcome! <br />
              {customer.first_name}
            </p>
            <p className="text-danger">
              <span className="fw-bold">Customer id :</span> {customer.cid}
            </p>
            <p>
              Customer Name : {customer.first_name} {customer.middle_name}{" "}
              {customer.last_name}
            </p>
            <p>
              <i className="fa fa-phone text-danger"></i> {customer.mobile_no1}
              &nbsp;{customer.mobile_no2}
            </p>
            <p>
              <i className="fa fa-map-marker text-danger"></i>&nbsp;
              {customer.installation_location ? customer.installation_location.city : ""}&nbsp;
              {customer.installation_location ? customer.installation_location.district : ""}&nbsp;
              {customer.installation_location ? customer.installation_location.zone : ""}&nbsp;
            </p>
            <p>ONT Status: On</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
