import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { gql, useMutation } from "@apollo/client";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "./../../Components/Loader";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

const ENROL = gql`
  mutation EnrolRequester(
    $name: String!
    $lastname: String!
    $gender: String!
    $birthday: DataTime!
    $address: String!
    $controlnumber: String!
    $semester: String!
    $carrer: String!
  ) {
    enrolRequester(
      name: $name
      lastname: $lastname
      gender: $gender
      birthday: $birthday
      address: $address
      controlnumber: $controlnumber
      semester: $semester
      carrer: $carrer
    ) {
      id
    }
  }
`;

export default function Request() {
  let history = useHistory();
  const [cookies, setCookies] = useCookies(["requesterId"]);
  const [enrol, setenrol] = useState({
    name: "",
    lastname: "",
    gender: "",
    birthday: new Date(),
    address: "",
    controlnumber: "",
    semester: "",
    carrer: "",
  });

  const [valitate, setError] = useState({
    name: false,
    lastname: false,
    gender: false,
    birthday: false,
    address: false,
    controlnumber: false,
    semester: false,
    carrer: false,
  });

  const [enrolRequester, { loading }] = useMutation(ENROL, {
    onCompleted: (data) => {
      setCookies("resquesterId", data.enrolRequester.id, { path: "/" });
      history.push("/schoolarship");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    enrolRequester({
      variables: {
        name: enrol.name,
        lastname: enrol.lastname,
        gender: enrol.gender,
        birthday: enrol.birthday,
        address: enrol.address,
        controlnumber: enrol.controlnumber,
        semester: enrol.semester,
        carrer: enrol.carrer,
      },
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="col-md-6 m-auto">
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="form-group has-danger text-center">
            <label>Personal info</label>
            <hr />
            <input
              type="text"
              value={enrol.name}
              onChange={(event) => {
                setenrol((enrol) => ({
                  ...enrol,
                  name: event.target.value,
                }));
              }}
              required
              onInvalid={(event) => {
                event.preventDefault();
                setError((valitate) => ({
                  ...valitate,
                  name: true,
                }));
              }}
              className={`form-control ${valitate.name ? "is-invalid" : ""}`}
              placeholder="Enter your first name"
            />
          </div>
          <br />
          <div className="form-group has-danger text-center">
            <input
              type="text"
              value={enrol.lastname}
              onChange={(event) => {
                setenrol((enrol) => ({
                  ...enrol,
                  lastname: event.target.value,
                }));
              }}
              required
              onInvalid={(event) => {
                event.preventDefault();
                setError((valitate) => ({
                  ...valitate,
                  lastname: true,
                }));
              }}
              className={`form-control ${
                valitate.lastname ? "is-invalid" : ""
              }`}
              placeholder="Enter your last name"
            />
          </div>
          <div class="form-group has-danger text-center">
            <br />
            <select
              onChange={(event) => {
                setenrol((enrol) => ({ ...enrol, gender: event.target.value }));
              }}
              name="gender"
              className={`form-select`}
            >
              <option selected="selected" value="">
                Choose your gender
              </option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div className="form-group has-danger text-center">
            <label className="mr-2">Birthday </label>
            <DatePicker
              className={`form-control m-4`}
              selected={enrol.birthday}
              onChange={(date) => {
                setenrol((enrol) => ({ ...enrol, birthday: date }));
              }}
            />
          </div>
          <div className="form-group has-danger text-center">
            <input
              type="text"
              onChange={(event) => {
                setenrol((enrol) => ({
                  ...enrol,
                  address: event.target.value,
                }));
              }}
              required
              onInvalid={(event) => {
                event.preventDefault();
                setError((valitate) => ({
                  ...valitate,
                  address: true,
                }));
              }}
              className={`form-control ${valitate.address ? "is-invalid" : ""}`}
              placeholder="Enter your address"
            />
          </div>
          <div className="form-group has-danger text-center">
            <br />
            <label htmlFor="confirmpassword">Schoolar info</label>
            <hr />
            <input
              type="text"
              onChange={(event) => {
                setenrol((enrol) => ({
                  ...enrol,
                  controlnumber: event.target.value,
                }));
              }}
              required
              onInvalid={(event) => {
                event.preventDefault();
                setError((valitate) => ({
                  ...valitate,
                  controlnumber: true,
                }));
              }}
              className={`form-control ${
                valitate.controlnumber ? "is-invalid" : ""
              }`}
              placeholder="Enter your control number"
            />
          </div>
          <div className="form-group has-danger text-center">
            <br />
            <input
              type="text"
              onChange={(event) => {
                setenrol((enrol) => ({
                  ...enrol,
                  semester: event.target.value,
                }));
              }}
              required
              onInvalid={(event) => {
                event.preventDefault();
                setError((valitate) => ({
                  ...valitate,
                  controlnumber: true,
                }));
              }}
              className={`form-control ${
                valitate.controlnumber ? "is-invalid" : ""
              }`}
              placeholder="Enter your current semester"
            />
          </div>
          <div className="form-group has-danger text-center">
            <br />
            <input
              type="text"
              onChange={(event) => {
                setenrol((enrol) => ({
                  ...enrol,
                  carrer: event.target.value,
                }));
              }}
              required
              onInvalid={(event) => {
                event.preventDefault();
                setError((valitate) => ({
                  ...valitate,
                  controlnumber: true,
                }));
              }}
              className={`form-control ${
                valitate.controlnumber ? "is-invalid" : ""
              }`}
              placeholder="Enter your carrer"
            />
          </div>
          <div
            className="btn-group d-flex m-5"
            role="group"
            aria-label="Basic example"
          >
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
