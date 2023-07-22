import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import deleteIcon from "../../../imgs/delete.png";
import "./Programs.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Loader from "../../Loader";
import usefetchAddressDetails from "../../../hooks/useFetchAddressDetails";
import { UilBed } from "@iconscout/react-unicons";

function Programs({ data, dashboard }) {
  const { user } = useAuthContext();
  const [programs, setPrograms] = useState();
  const { fetchAddressDetails } = usefetchAddressDetails();
  const [mapData, setMapData] = useState();
  const location = useLocation();

  // const sendDoc = () => {

  //   navigate('/dashboard',
  //     {state: { data: data }
  //   });
  // };

  function handleDelete(index) {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/hospital/delete${location}`,
        {
          index: index,
          user: user?.id,
        },
        { headers: { token: user?.token } }
      )
      .then((response) => {
        fetchAddressDetails(user?.id, user?.token);
        alert("Delted Successfully");
      });
  }

  useEffect(() => {
    if (location.pathname === "/doctor") {
      setMapData(data?.doctors);
    }
    if (location.pathname === "/nurse") {
      setMapData(data?.nurses);
    }
    if (location.pathname === "/patient") {
      setMapData(data?.patients);
    }
  }, [data]);

  return dashboard ? (
    <div className="Programs">
      <div>
        {!data && <Loader />}
        {data?.map((item, key) => {
          return (
            <div className="card" key={key}>
              <div className="card-top">
                <h1>{item.doctorData[1]}</h1>
                <p>{item.doctorData[0]}</p>
              </div>
              <div className="card-top">
                <h1>{item.nurseData[1]}</h1>
                <p>{item.nurseData[0]}</p>
              </div>
              <div className="card-top">
                <h1>{item.patientData[1]}</h1>
                <p>{item.patientData[0]}</p>
              </div>
              <div className="card-bottom">
                <div className="bed">
                  <UilBed />
                  <p style={{ marginBottom: "0.3rem" }}> {item.bedData[0]}</p>
                </div>
                <button className="deleteButton">Edit</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="Programs">
      <div>
        {!data && <Loader />}
        {mapData?.map((item, key) => {
          return (
            <div className="card" key={key}>
              <div className="card-top">
                <h1>{item.name}</h1>
                <p>{item.email}</p>
              </div>
              <div className="card-bottom">
                <div className="bed">
                  <UilBed />
                  <p style={{ marginBottom: "0.3rem" }}> {item.bedId.length}</p>
                </div>
                <button
                  className="deleteButton"
                  onClick={(e) => handleDelete(key)}
                >
                  <img
                    src={deleteIcon}
                    style={{
                      height: "1.5rem",
                      width: "1.5rem",
                      paddingBottom: "0.3rem",
                    }}
                  />
                </button>
              </div>
            </div>
          );
        })}
        {/* {mapData && (
    <div>
      {mapData.length > 0 ? (
        <p>{location.pathname === "/doctor" ? {docData}: "Nurse"}</p>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  )} */}

        {programs?.length === 0 && (
          <div className="card-top">
            <p>No addresses. Add some to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Programs;
