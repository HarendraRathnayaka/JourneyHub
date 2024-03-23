import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';
import 'bootstrap/dist/css/bootstrap.min.css';

function PayForm() {
  const { clientId, bookingId } = useParams();
  const [client, setClient] = useState({});
  const [booking, setBooking] = useState({});
  const [tour, setTour] = useState({});
  const [payment, setPayment] = useState({});
  const [cvv, setCvv] = useState('');
  const [showCvv, setShowCvv] = useState(false);

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

  function getBooking() {
    axios
      .get(`http://localhost:8070/booking/get/${clientId}/${bookingId}`)
      .then((res) => {
        setBooking(res.data);
        getTour(res.data.tourId); // Call getTour with the tour ID from booking
      })
      .catch((err) => {
        alert(err);
      });
  }

  function getTour(tourId) {
    axios
      .get(`http://localhost:8070/tour/get/${tourId}`)
      .then((res) => {
        setTour(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function getPayment() {
    axios
      .get(`http://localhost:8070/payment/get/${clientId}`)
      .then((res) => {
        setPayment(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  //set the expire date from month.now onwards
  function setMinimumExpirationDate() {
    const today = new Date();

    const year = today.getFullYear();
    let month = today.getMonth() + 1;

    if (month < 10) {
      month = '0' + month;
    }

    document.getElementById('expireDate').min = `${year}-${month}`;
  }

  //Eventlistener for Formatting the card number
  const formatCardNumber = (e) => {
    let cardNumber = e.target.value.replace(/[^\d]/g, '');
    cardNumber = cardNumber.replace(/(.{4})/g, '$1 ').trim();

    if (cardNumber.length > 19) {
      cardNumber = cardNumber.substr(0, 19);
    }

    e.target.value = cardNumber;
  };

  useEffect(() => {
    getClient();
    getBooking();
    getPayment();
    setMinimumExpirationDate();
  }, []);

  //calculate the total value
  const totalValue = (
    booking.noOfDays * tour.pricePerDay +
    booking.noOfPeople * tour.pricePerPerson
  ).toFixed(2);

  // Calculate the discount
  const discount = (payment.discount * totalValue).toFixed(2);
  const finalPayment = (totalValue - discount).toFixed(2);

  //CVV handler
  const handleCvvChange = (e) => {
    const newCvv = e.target.value.replace(/\D/g, '');
    setCvv(newCvv);
  };

  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{
          margin: '20px 150px',
          padding: '20px',
          border: '1px solid #000',
          borderRadius: '10px',
        }}
      >
        <div style={{ width: '40%', paddingRight: '50px' }}>
          <h4>-- Your booking details are here --</h4>
          <br />
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputText">Client Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleText"
                value={client.firstName + ' ' + client.lastName}
                disabled
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                defaultValue={client.email}
              />
              <small id="emailHelp" className="form-text text-muted">
                We will send you a payment confirmation to this email
              </small>
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="exampleInputText">Tour Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleText"
                value={tour.tourName}
                disabled
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="exampleInputDate">Tour Booked Date</label>
              <input
                type="date"
                className="form-control"
                id="exampleTime"
                value={
                  booking.bookedDate
                    ? new Date(booking.bookedDate).toISOString().split('T')[0]
                    : ''
                }
                disabled
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="exampleInputNumber">Tour Person Count</label>
              <input
                type="number"
                className="form-control"
                id="exampleNumber"
                value={booking.noOfPeople}
                disabled
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="exampleInputNumber">Tour Days Count</label>
              <input
                type="number"
                className="form-control"
                id="exampleNumber"
                value={booking.noOfDays}
                disabled
              />
            </div>
            <br />
          </form>
        </div>

        <div style={{ width: '40%', paddingLeft: '50px' }}>
          <h4>-- Your payment details are here --</h4>
          <form>
            <br />
            <div className="form-group">
              <label htmlFor="exampleInputNumber">Total Payment</label>
              <input
                type="number"
                className="form-control"
                id="exampleNumber"
                value={totalValue}
                disabled
              />
            </div>
            <br />
            <div class="row">
              <div class="form-group col-md-6">
                <label for="inputQr">Scan me for apply discount</label>
                {client.qrCode && (
                  <div
                    style={{
                      border: '1px solid #000',
                      borderRadius: '10px',
                      padding: '5px',
                      display: 'inline-block',
                    }}
                  >
                    <QRCode
                      value={`https://discountjourneyhub.netlify.app/discount/${clientId}`}
                      alt="Client QR Code"
                      size={70}
                    />
                  </div>
                )}
              </div>
              <div class="form-group col-md-6">
                <label for="inputDiscount">Discount</label>
                <br />
                <br />
                <input
                  type="Number"
                  class="form-control"
                  id="Discount"
                  value={discount}
                  disabled
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputNumber">Final Payment</label>
              <input
                type="number"
                className="form-control"
                id="exampleNumber"
                value={finalPayment}
                disabled
              />
            </div>
            <br />
            <br />
            <h4>-- Enter your card details here --</h4>
            <br />
            <div className="row">
              <div className="col-md-7">
                <label htmlFor="exampleInputNumber">Cardholder Name</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="col-md-5">
                <label htmlFor="exampleInputNumber">Expire Date</label>
                <div className="input-group">
                  <input
                    type="month"
                    className="form-control"
                    placeholder="mm/yyyy"
                    id="expireDate"
                    required
                  />
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-7">
                <label htmlFor="exampleInputNumber">Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  maxLength="19"
                  onChange={formatCardNumber}
                />
              </div>
              <div className="col-md-5">
                <label htmlFor="exampleInputNumber">CVV</label>
                <div className="input-group">
                    <input
                        type={showCvv ? 'text' : 'password'}
                        className="form-control"
                        placeholder="***"
                        value={cvv}
                        onChange={handleCvvChange}
                        maxLength="3" // Set max length to 3 characters
                        required
                    />
                    <div className="input-group-append">
                        <span
                            className="input-group-text"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowCvv(!showCvv)}
                        >
                            <i className={`fa ${showCvv ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                        </span>
                    </div>
                </div>
            </div>
            </div>
            <br />
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
            <br />

            <br />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
      <footer className="flex flex-col items-center bg-zinc-50 text-center text-surface dark:bg-neutral-700 dark:text-white">
        <div className="container p-6">
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <div className="mb-6 lg:mb-0">
              <img
                src="https://pixabay.com/get/g643b471ff2614b0f97728a0e4296c30980bd90048cbd4dde6b52457f3c727ed2968e71b4502eb904e4104f8dd0b20c334b95505f78c4614b9e3853c0baa47561221701595cf2cedf64b974fd80a6255f_640.jpg"
                className="w-full rounded-md shadow-lg"
                alt="City"
              />
            </div>
            <div className="mb-6 lg:mb-0">
              <img
                src="https://pixabay.com/get/ga102a985bc0aedad22c25d4f0376c1bc673bccb276a9b2cd95777e3eaf2bb5d0b16047322dd5793a2e5597105fc5fd4a6f642288fdc9ef16e94d90a0000430235be3e479ee93fb61caac1301eed1ce16_640.jpg"
                className="w-full rounded-md shadow-lg"
                alt="City"
              />
            </div>
            <div className="mb-6 lg:mb-0">
              <img
                src="https://pixabay.com/get/gc2560948e3b76b00c3c2467169083b8a824da5e0c45a2218f5a809f80034112d7c205a5c136dd37a7cbc5f98808972e5dbaf1f85ae96b4562fdec1796c57604e685c414cdd987dc440016411ffd7022e_640.jpg"
                className="w-full rounded-md shadow-lg"
                alt="City"
              />
            </div>
            <div className="mb-6 lg:mb-0">
              <img
                src="https://pixabay.com/get/g442360572165c917f218d79b360f7ab6f2a93847faf9b2299a8715aa024179cfb5da46c9c048393075f5e273dc253c85307d07a01bd787517c91d7e15c55f646918ea4a43acc6ad3b7bd8af6a9467c99_640.jpg"
                className="w-full rounded-md shadow-lg"
                alt="City"
              />
            </div>
            <div className="mb-6 lg:mb-0">
              <img
                src="https://pixabay.com/get/gfdb86439290745c7805c9e5fa56fd1da5ee3d9c197d75bae6583c40fa778d8669a6fd7fa0ca8bf49dc0f06952d403b97312a416d198c29e04841b27b062b034f234e3a68aaa2f0db7e1e51214a318fed_640.jpg"
                className="w-full rounded-md shadow-lg"
                alt="City"
              />
            </div>
            <div className="mb-6 lg:mb-0">
              <img
                src="https://pixabay.com/get/gd71afecbaaab14b9d6dad800533a7d39940dd80a22270dc1601c270ef242e10a6acad5526307fa93a6875178a903bd0342ad792e75812b88bb84475eed8e130908cd6de7bce8b1a65d0510c028eda8de_640.jpg"
                className="w-full rounded-md shadow-lg"
                alt="City"
              />
            </div>
          </div>
        </div>
        <div className="w-full bg-black/5 p-4 text-center">
          © {new Date().getFullYear()} Copyright : <a href>www.journeyhub.lk</a>
        </div>
      </footer>
    </>
  );
}

export default PayForm;
