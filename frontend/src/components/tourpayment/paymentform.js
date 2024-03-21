import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';
import 'bootstrap/dist/css/bootstrap.min.css';

function PayForm() {
  const { clientId } = useParams();
  const [client, setClient] = useState({});

  function getClient() {
    axios
      .get(`http://localhost:8070/client/${clientId}`)
      .then((res) => {
        setClient(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => {
    getClient();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div style={{ width: '40%' }}>
        <h2>
          {client.firstName} {client.lastName}
        </h2>
        <p>Email: {client.email}</p>
        <p>Address: {client.address}</p>
        <p>Phone Number: {client.phoneNo}</p>
        {client.qrCode && (
          <QRCode value={client.qrCode} alt="Client QR Code" size={150} />
        )}

        <br />
        <br />
        <h4>-- Your booking details are here --</h4>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              I agreed to the terms and conditions
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      <div style={{ width: '40%' }}>
        <h4>-- Enter your card details here --</h4>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              I agreed to the terms and conditions
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default PayForm;
