import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

interface ErrorProps {
    togglePopup: (e:any) => any
}

const ErrorPopup: React.FC<ErrorProps>= ({togglePopup}) => {

  return (
        <Background>
            <SensorCardStyle>
                <h3>Type in a note!</h3>
                <button onClick={(e:any) => togglePopup(e)}>Okay!</button>
            </SensorCardStyle>
        </Background>  
  );
};

const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    overflow: scroll;
`;

const SensorCardStyle = styled.div`
  background: white;
  max-width: 300px;
  text-align: left;
  padding: 10px;
  border-radius: 0px 8px 8px 0px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  border-left: 6px solid #87c38f;
  position: absolute;
  text-align: center;
  left: 15%;
  right: 15%;
  top: 20%;
  bottom: 60%;
  margin: auto;
  overflow: scroll;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const InfoButton = styled.div`
  padding: 10px;
  border: 2px solid #21652A;
  width: 20%;
  border-radius: 8px;
  text-align: center;
  margin: 15px;
  font-weight: bold;
  color: #21652A;
`;

export default ErrorPopup;
