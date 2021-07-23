


function CurrentPackage({customer}) {

    return (
        <div className="col-md-6">
            <div className="border border-danger rounded p-4">
                <h6 className="fw-bold text-danger fs-5">Current Package</h6>
                <hr className="bg-danger"/>
                <p>{customer.internet !== null ? customer.internet[0].plan : ""}</p>
                <p><span className="text-danger">Price :</span> {customer.internet !== null ? customer.internet[0].price : ""}</p>
            </div>
        </div>
    )
}

export default CurrentPackage;
