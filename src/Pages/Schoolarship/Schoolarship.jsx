import { useQuery, useMutation, gql } from "@apollo/client";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Loader from "./../../Components/Loader";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const GET_TYPES = gql`
  query getTypes {
    getScholarshipsTypes {
      id
      type
    }
  }
`;

const CREATE_REQUEST_TYPES = gql`
  mutation CreateNewScholarship($type: Int!, $requesterId: Int!) {
    createNewScholarship(type: $type, requesterId: $requesterId) {
      id
    }
  }
`;

export default function Schoolarship() {
  const [cookies, setCookies, removeCookie] = useCookies(["resquesterId"]);
  let history = useHistory();
  const { data, loading: queryLoading } = useQuery(GET_TYPES, {
    pollInterval: 500,
  });
  const [createNewScholarship, { loading: mutationsLoading }] = useMutation(
    CREATE_REQUEST_TYPES,
    {
      onCompleted: (data) => {
        console.log(data);
        setCookies("SchoolarshipID", data.createNewScholarship.id, {
          path: "/",
        });
      },
    }
  );

  const [newRequest, setnewRequest] = useState({
    type: "",
    requesterId: cookies.resquesterId,
  });

  const { addToast } = useToasts();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newRequest.type === "") {
      addToast("Please choose an scholarship type", {
        appearance: "warning",
        onDismiss: true,
      });
    } else {
      createNewScholarship({
        variables: {
          type: parseInt(newRequest.type),
          requesterId: parseInt(cookies.resquesterId),
        },
      });
    }
    history.push("/UploadDocuments");
  };

  if (queryLoading || mutationsLoading) return <Loader />;

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="col-md-6 m-auto">
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="form-group has-danger text-center">
            <br />
            <label htmlFor="confirmpassword">Schoolarship type</label>
            <hr />
            <input
              type="text"
              value={`userID: ${cookies.resquesterId}`}
              className={`form-control`}
              disabled
              placeholder="Enter your control number"
            />
          </div>
          <div class="form-group has-danger text-center">
            <br />
            <select
              onChange={(event) => {
                setnewRequest((newRequest) => ({
                  ...newRequest,
                  type: event.target.value,
                }));
              }}
              name="gender"
              className={`form-select`}
            >
              <option selected="selected" value="">
                Choose a scholarship type
              </option>
              {data.getScholarshipsTypes.map((type, key) => (
                <option value={type.id} key={key}>
                  {type.type}
                </option>
              ))}
            </select>
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
