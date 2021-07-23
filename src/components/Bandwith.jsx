import React from 'react'

function Bandwith() {
    
    return (
        <div className="col-md-6 border border-danger rounded">
            <div className=" p-4">
            <h5 className="text-danger fw-bold">
                    Bandwidth Changes
                </h5>
                <hr className="bg-danger"/>
                <div>
                    <p className="fw-bold">Current Download</p>
                    <i className="fa fa-arrow-down text-success"></i> 100mbps
                </div>
                <div className="mt-5">
                    <p className="fw-bold">Current Upload</p>
                    <i className="fa fa-arrow-up text-danger"></i> 60mbps
                </div>
                
            </div>
        </div>
    )
}

export default Bandwith
