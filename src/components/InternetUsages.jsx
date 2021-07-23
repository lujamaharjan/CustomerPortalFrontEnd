import React from "react";
import { Bar } from "react-chartjs-2";

function InternetUsages() {
    const data = {
        labels: ['January', 'February', 'March',
                 'April', 'May'],
        datasets: [
          {
            label: 'Upload',
            backgroundColor: '#df4759',
            data: [65, 59, 80, 81, 56]
          },
          {
            label: 'Download',
            backgroundColor: '#5bc0de', 
            data: [55, 50, 70, 71, 46],
            
          }
        ]
      }
  return (
    <div className="col-md-6">
      <div className="p-4">
        <h5 className="text-danger fw-bold">Internet Usages</h5>
        <hr className="bg-danger" />
        <Bar
          data={data}
          options={{
            title: {
              display: true,
              text: "Internet Usages",
              fontSize: 16,
            },
            legend: {
              display: true,
              position: "right",
            },
            responsive:"false"
          }}
        />
      </div>
    </div>
  );
}

export default InternetUsages;
