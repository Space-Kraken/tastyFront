import React from "react";
import { gql, useQuery } from "@apollo/client";
import Loader from "../../Components/Loader";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useToasts } from "react-toast-notifications";

const GET_REQUESTERS = gql`
  query GetAllRequesters {
    getAllRequesters {
      id
      name
      lastname
      controlnumber
      gender
      birthday
      address
      semester
      carrer
      scholarships {
        typeId {
          type
        }
        approved
      }
    }
  }
`;

export default function List() {
  const [cookies, setCookies, removeCookie] = useCookies(["requester"]);
  const { loading, data, error } = useQuery(GET_REQUESTERS, {
    pollInterval: 500,
  });
  const { addToast } = useToasts();
  let history = useHistory();

  if (loading) return <Loader />;

  return (
    <div className="mt-3 container-fluid d-flex flex-wrap">
      {data.getAllRequesters.map((requester, key) => (
        <div
          key={key}
          className="m-2 card border-secondary mb-3 w-100 rounded"
          style={{ maxWidth: "18rem" }}
        >
          <div className="card-header">
            {requester.name + " " + requester.lastname}
          </div>
          <div className="card-body text-primary">
            <div className="card-text">
              <h6 className="card-subtitle mb-2 text-muted">
                <i>Control number:</i>
                {requester.controlnumber}
              </h6>
              <h6 className="card-subtitle mt-2 mb-2 text-muted">
                Address:
                {requester.address}
              </h6>
              <h6 className="card-subtitle mt-2 mb-2 text-muted">
                <i>Gender:</i>
                {requester.gender}
              </h6>
              <h6 className="card-subtitle mt-2 mb-2 text-muted">
                Semester:
                {requester.semester}
              </h6>
              <h6 className="text-center card-subtitle mt-2 mb-2 text-muted">
                <div className="text-center">Schoolships Requests</div>
              </h6>
              <div className="text-center">
                {Object.keys(requester.scholarships).length}
              </div>
            </div>
            <hr />
            <button
              value={requester.controlnumber}
              onClick={(event) => {
                if (Object.keys(requester.scholarships).length === 0) {
                  addToast("Nothin to show", {
                    appearance: "info",
                    autoDismiss: true,
                  });
                } else {
                  setCookies("requester", event.target.value, { path: "/" });
                  history.push("/requester");
                }
              }}
              className="btn btn-outline-secondary"
            >
              Ver Registros
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
