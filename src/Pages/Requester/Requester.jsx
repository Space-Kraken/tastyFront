import React from "react";
import { useCookies } from "react-cookie";
import { gql, useQuery } from "@apollo/client";
import Loader from "./../../Components/Loader";

const GET_REQUESTER = gql`
  query GetRequester($controlnumber: String!) {
    getRequester(controlnumber: $controlnumber) {
      id
      name
      lastname
      scholarships {
        id
        typeId {
          type
        }
        approved
        files {
          path
          name
        }
      }
    }
  }
`;

export default function Requester(props) {
  const [cookies, setCookies, removeCookie] = useCookies(["requester"]);
  const { loading, data, error } = useQuery(GET_REQUESTER, {
    variables: {
      controlnumber: cookies.requester,
    },
    pollInterval: 500,
  });

  if (loading) return <Loader />;

  return (
    <div className="d-flex flex-column justify-content-center container mt-4">
      <div class="card-deck">
        {console.log(data)}
        {data.getRequester.scholarships.map((scholarship, key) => (
          <div key={key} class="card mb-4 rounded">
            <div class="card-body">
              <h5 class="card-title">
                Scholarship Identifier {scholarship.id}
              </h5>
              <div class="card-text">
                <h6 className="card-subtitle mb-2 text-muted">
                  <i>Scholarship type:</i>
                  {scholarship.typeId.type}
                </h6>
                <h6 className="card-subtitle mb-2 text-muted">
                  <i>Scholarship status:</i>
                  {scholarship.approved ? "Approved" : "In proces"}
                </h6>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center card-footer">
              Files
              <div className="btn-group" role="group">
                {scholarship.files.map((file) => (
                  <a
                    href={file.path}
                    className="m-1 btn btn-outline-secondary rounded"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {file.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
