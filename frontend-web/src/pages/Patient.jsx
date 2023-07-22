import React, { useEffect } from "react";
import MainDash from "../components/Dashboard/MainDash/MainDash";
import ProfileHeader from "../components/ProfileHeader";
import "./styles/Dashboard.css";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import usefetchAddressDetails from "../hooks/useFetchAddressDetails";
import { useLocation } from "react-router-dom";

function Patients() {
  const [modal, setModal] = React.useState(false);
  const [addName, setAddName] = React.useState("");
  const { user } = useAuthContext();
  const { fetchAddressDetails } = usefetchAddressDetails();
  const [patientData, setPatientData] = React.useState();
  const location = useLocation();

  const handleSubmit = () => {
    if (!addName) {
      alert("Please fill all the fields");
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/hospital/addPatient`,
        {
          email: addName,
          hospitalId: user?.userData.hospitalId[0],
        },
        { headers: { token: user?.token } }
      )
      .then((response) => {
        fetchAddressDetails(user?.id, user?.token);
        alert("Added Successfully");
        window.location.reload();
      });
    // console.log(addName, address);
    console.log(addName);
    setModal(false);
    setAddName("");
  };

  function getPatients() {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/hospital/getHospital`,
        {
          params: {
            id: user?.userData.hospitalId[0],
          },
        },
        { headers: { token: user?.token } }
      )
      .then((response) => {
        setPatientData(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => {
    const abortController = new AbortController();

    getPatients();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      {modal && (
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="titleCloseBtn">
              <button
                onClick={() => {
                  setModal(false);
                }}
              >
                X
              </button>
            </div>
            <div className="title">
              <h1>Add Patient</h1>
              <input
                placeholder="Email"
                value={addName}
                onChange={(e) => {
                  setAddName(e.target.value);
                }}
              />
            </div>
            <div className="footer">
              <button
                onClick={() => {
                  handleSubmit();
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="ContentWrapper">
        <ProfileHeader title={"Manage Patients"} />
        <div className="AppGlass3">
          <MainDash
            name="Add Patients"
            setModal={setModal}
            data={patientData}
            location={location.pathname}
          />
        </div>
      </div>
    </>
  );
}

export default Patients;
