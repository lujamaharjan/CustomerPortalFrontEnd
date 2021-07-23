import React from "react";

function UserStatus({ customer }) {
  return (
    <div className="col-md-6">
      <div className="border border-danger rounded p-4">
        <h5 className="fw-bold">
          <i
            className={
              customer.internet ?
              customer.internet[0].status === "active"
                ? "fa fa-circle text-success"
                : "fa fa-circle text-danger"
                :""
            } 
          ></i>{" "}
          UserStatus:{" "}
          <span
            className={
              customer.internet ?
              customer.internet[0].status === "active"
                ? "text-success"
                : "text-danger"
                :""
            }
          >
            {
              customer.internet ?
              customer.internet[0].status === "active"
                ? <>(Online)</>
                : <>(Offline)</>
                :""
            }
          </span>{" "}
          :
        </h5>
        <hr className="bg-danger" />

        <p>
          <span className="text-danger fw-bold">IP Address: </span>192.168.1.87
        </p>
        <p>
          <span className="text-danger fw-bold">Hardware Mac Address: </span>
          &nbsp;
          {customer.internet ? customer.internet[0].hardware_mac : ""}{" "}
        </p>
        <p>
          <span className="text-danger fw-bold">Online Duration: </span>9 days
          2:04:14
        </p>
        <p>
          <span className="text-danger fw-bold">Optical Power: </span>{customer.internet ? customer.extra.power_level :""}
        </p>
      </div>
    </div>
  );
}

export default UserStatus;
