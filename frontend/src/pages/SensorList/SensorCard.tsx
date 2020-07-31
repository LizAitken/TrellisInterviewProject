import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

type CardProps = {
    sensor_id: string,
    sensor_name: string,
    sensor_description: string
}

const SensorCard: React.FC<CardProps>= ({sensor_id, sensor_name, sensor_description}) => {

  return (
        <>
            <SensorCardStyle>
              <Name>{sensor_name}</Name>
              <div>{sensor_description}</div>
              <InfoButton><StyledLink to={`/sensors/${sensor_id}`}>More info</StyledLink></InfoButton>
            </SensorCardStyle>
        </>
  );
};

const SensorCardStyle = styled.div`
  background: white;
  margin: auto;
  margin-top: 24px;
  max-width: 400px;
  text-align: left;
  padding: 10px;
  border-radius: 0px 8px 8px 0px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  border-left: 6px solid #87c38f;
`;

const Name = styled.div`
  font-size: 2rem;
`;

const InfoButton = styled.div`
  padding: 10px;
  border: 2px solid #21652A;
  width: 20%;
  border-radius: 8px;
  text-align: center;
  margin: 15px 0;
  font-weight: bold;
  color: #21652A;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default SensorCard;