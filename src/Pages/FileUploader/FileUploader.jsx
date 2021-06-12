import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import { useToasts } from "react-toast-notifications";
import Dropzone from "react-dropzone";
import { useHistory } from "react-router-dom";

const UPLOAD_FILE = gql`
  mutation AddFile($file: Upload, $ctx: ctx) {
    addFile(file: $file, ctx: $ctx) {
      path
    }
  }
`;

export default function FileUploader() {
  let history = useHistory();
  const { addToast } = useToasts();
  const [cookies, setCookies, removeCookie] = useCookies(["SchoolarshipID"]);

  const [files, setfiles] = useState({
    motives: null,
    identification: null,
    address: null,
  });

  let Files = [];
  const names = ["motives", "identification", "address"];
  const [validate, setValidate] = useState({
    motives: false,
    identification: false,
    address: false,
  });

  const handleSubmit = (event) => {
    console.log(files);
    event.preventDefault();
    if (validateDocuments()) {
      Files = [files.motives, files.identification, files.address];
      uploadFiles();
    }
  };

  const [addFiles] = useMutation(UPLOAD_FILE);

  const uploadFiles = () => {
    addToast(`Files uploaded`, {
      appearance: "success",
      autoDismiss: true,
    });
    Files.map((singelFile, index) => {
      addFiles({
        variables: {
          file: singelFile,
          ctx: { id: cookies.SchoolarshipID, name: names[index] },
        },
      });
    });
    history.push("/schoolarships-list");
  };

  const validateDocuments = () => {
    if (files.address === null) {
      addToast("Please privide an motive letter", {
        appearance: "info",
        autoDismiss: true,
      });
      return false;
    }
    if (files.identification === null) {
      addToast("Please privide an ID", {
        appearance: "info",
        autoDismiss: true,
      });
      return false;
    }
    if (files.address === null) {
      addToast("Please privide an Address doc", {
        appearance: "info",
        autoDismiss: true,
      });
      return false;
    }
    return true;
  };

  return (
    <div className="container mt-4">
      <form onSubmit={(event) => handleSubmit(event)} className="form">
        <div className="d-flex flex-wrap flex-column justify-content-between">
          <div className="form-group has-danger text-center">
            <label>Motive Letter</label>
            <hr />
            <Dropzone
              className="container"
              onDrop={(acceptedFiles) => {
                setfiles((files) => ({
                  ...files,
                  motives: Object.assign(acceptedFiles[0], {
                    preview: URL.createObjectURL(acceptedFiles[0]),
                    test: "hola",
                  }),
                }));
                setValidate((validate) => ({
                  ...validate,
                  motives: true,
                }));
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    {...getRootProps({
                      className:
                        "dropzone m-2 p-4 border border-dark rounded d-flex justify-content-center align-items-center",
                    })}
                  >
                    <input {...getInputProps()} />
                    <div className="fs-3">
                      {validate.motives
                        ? `Selected: ${files.motives.name}`
                        : "Drag 'n' drop some files here, or click to select files"}
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="form-group has-danger text-center">
            <label>ID</label>
            <hr />
            <Dropzone
              className="container"
              onDrop={(acceptedFiles) => {
                setfiles((files) => ({
                  ...files,
                  identification: acceptedFiles[0],
                }));
                setValidate((validate) => ({
                  ...validate,
                  identification: true,
                }));
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    {...getRootProps({
                      className:
                        "dropzone m-2 p-4 border border-dark rounded d-flex justify-content-center align-items-center",
                    })}
                  >
                    <input {...getInputProps()} />
                    <div className="fs-3">
                      {validate.identification
                        ? `Selected: ${files.identification.name}`
                        : "Drag 'n' drop some files here, or click to select files"}
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="form-group has-danger text-center">
            <label>Address verify</label>
            <hr />
            <Dropzone
              className="container"
              onDrop={(acceptedFiles) => {
                setfiles((files) => ({
                  ...files,
                  address: acceptedFiles[0],
                }));
                setValidate((validate) => ({
                  ...validate,
                  address: true,
                }));
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    {...getRootProps({
                      className:
                        "dropzone m-2 p-4 border border-dark rounded d-flex justify-content-center align-items-center",
                    })}
                  >
                    <input {...getInputProps()} />
                    <div className="fs-3">
                      {validate.address
                        ? `Selected: ${files.address.name}`
                        : "Drag 'n' drop some files here, or click to select files"}
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </div>
        <div
          className="btn-group d-flex m-5"
          role="group"
          aria-label="Basic example"
        >
          <button type="submit" className="btn btn-primary">
            Subir
          </button>
        </div>
      </form>
    </div>
  );
}
