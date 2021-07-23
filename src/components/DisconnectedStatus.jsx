import React from "react";
import moment from "moment";
import { Doughnut } from "react-chartjs-2";

function DisconnectedStatus({customer}) {
  
  let {activation_date} = customer.internet !== null ? customer.internet[0]: new Date();
  let {deactivation_date} = customer.internet !== null ? customer.internet[0]: new Date();
  deactivation_date = moment(deactivation_date,'DD-MM-YYYY').toDate();
  const current_date = new Date();
  const days_remain = Math.floor((deactivation_date - current_date)/(1000*3600*24));

  activation_date = moment(activation_date, "DD-MM-YYYY").toDate();
  const used_days = Math.floor((current_date - activation_date)/(1000*3600*24));




  const data = {
    datasets: [
      {
        label: "Disconnected Status",
        backgroundColor: ["#df4759", "#d9e2ef"],
        hoverBackgroundColor: ["#e83e8c", "#d9e2ef"],
        data: [used_days,days_remain],
      },
    ],
  };
  return (
    <div className="col-md-6">
      <div>
        <Doughnut
          data={data}
          
          options={{
            title: {
              display: true,
              text: "Disconneted status",
              fontSize: 16,
            },
            legend: {
              display: true,
              position: "right",
            },
            responsive: false,
          }}
          width={220}
          height={220}
          className={"mx-auto mt-0"}
        />
        <p className="text-center text-danger mt-3">{days_remain} days left</p>
        <p className="text-center mt-2">Disconnected Date
        <br/>{moment(deactivation_date).format('DD/MM/YYYY')}</p>
      </div>
    </div>
  );
}

export default DisconnectedStatus;
