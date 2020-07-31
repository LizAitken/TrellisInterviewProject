import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import { getSensors, Sensor } from "../../services/SensorService";
import SensorCard from "./SensorCard";


type RequestState =
  | { state: "LOADING" }
  | { state: "ERROR"; error: string }
  | { state: "LOADED"; sensors: Sensor[] };

const SensorList: React.FC= () => {
  const [request, setRequest] = useState<RequestState>({ state: "LOADING" });

  useEffect(() => {
    getSensors()
      .then(sensors => setRequest({ sensors, state: "LOADED" }))
      .catch(err => {
        console.error(err);
        setRequest({ error: err.message, state: "ERROR" });
      });
  }, []);

  if (request.state === "ERROR") {
    return <ErrorText>{request.error}</ErrorText>;
  }

  if (request.state === "LOADING") {
    return <LoadingText>Loading...</LoadingText>;
  }

  return (
    <Container>
        <Header>
          <Title>Sensor Viewer</Title>
        </Header>
        <ListContainer>
          {request.sensors.map(({ id, name, description }) => (
              <SensorCard sensor_id={id} sensor_name={name} sensor_description={description} key={id}/>
          ))}
        </ListContainer>
    </Container>   
  );
};

const Container = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #226f54;
  height: 70px;
  padding: 20px;
  color: white;
`;

const Title = styled.h1`
  font-size: 2em;
`;

const ListContainer = styled.div`
  width: 100%;
`;

const ErrorText = styled.div`
  margin: 24px;
`;

const LoadingText = styled.div`
  margin: 24px;
`;

export default SensorList;
