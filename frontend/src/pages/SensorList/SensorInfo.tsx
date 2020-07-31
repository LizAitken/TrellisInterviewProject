import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RouteComponentProps, match, withRouter } from "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import { getSensorInfo, Sensor, serverURL } from "../../services/SensorService";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faTrash, faHome);

type SensorParams = {
    sensor_id: string; 
  };

type SensorProps = RouteComponentProps<SensorParams>;


class SensorInfo extends React.Component <SensorProps, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            sensor_information: {},
            notes: []
        }
    }
    
    componentDidMount = () => {
        const sensor_id = this.props.match.params.sensor_id;

        getSensorInfo(sensor_id)
            .then(sensor_information => this.setState({ sensor_information }))
            .catch( error => {
                console.log(error);
            })
    };

    addNote = (e:any) => {
        const url= `http://localhost:9000/sensors/${this.props.match.params.sensor_id}/add_note`
        // need logic in here to not be able to input empty strings
        // add in Date.now() to get date of entry. Replace ol value with structured date.now() value. Sort based on timestamp.

        axios.post(url, {
            note: e.target.note.value
        })
        .then((response) => {
            this.setState({
                notes: response.data.notes
            })
        }) 
        this.componentDidMount();         
    }

    handleInput = (e:any) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    deleteNote = (itemId:any ) => {  
        // add delete logic
        console.log('Deleted Note', itemId);
        const url= `http://localhost:9000/sensors/${this.props.match.params.sensor_id}/delete_note/${itemId}`;
        
    }


    render() {
        const { sensor_information } = this.state;
        console.log('Sesor info-->', sensor_information);

    return (
        <ListContainer>
        <SensorCard>
            <h2>{sensor_information.name} Information</h2>
            <div>
                <p>{sensor_information.description}</p>
                <h3>Notes :</h3>
                <ol>
                    { sensor_information.noteList ? 
                        sensor_information.noteList.map((item:string, i:any ) =>
                            { if(item !== '') {return <div key={i}>
                                    <NoteItem>{item}
                                        <TrashSpan>
                                            <FontAwesomeIcon 
                                                    className="trash" 
                                                    onClick={() => {this.deleteNote(i)}} 
                                                    icon="trash" 
                                            />
                                        </TrashSpan>
                                    </NoteItem>
                                </div>
                            }})
                        :
                        null
                    }
                </ol>
                <NoteForm onSubmit={(e) => this.addNote(e)}>
                    <NoteInput  spellCheck='true' 
                                placeholder='Enter Note...' 
                                name='note' 
                                onChange={(e) => this.handleInput(e)} />
                    <NoteButton type='submit'>Add Note</NoteButton>
                </NoteForm>
            </div>
            <Link to='/'><FontAwesomeIcon icon={faHome} style={homeButton}/></Link>
        </SensorCard>
        </ListContainer>
    );
    }
};

const ListContainer = styled.div`
    width: 100%;
`;

const SensorCard = styled.div`
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

const NoteForm = styled.form`
    display: flex;
    flex-direction: column;
    margin: 2%;
`;

const NoteInput = styled.textarea`
    min-height: 10vh;
`;

const NoteButton = styled.button`
    padding: 5px;
    border: 2px solid #226f54;
    border-radius: 8px;
    margin: 15px 0;
    width: 100px;
    background-color: #21652A;
    font-weight: bold;
    color: white;
`;

const NoteItem = styled.li`
    margin: 8% 0;
`;

const TrashSpan = styled.span`
    margin: 0 10px;
`;

const homeButton = {
    color: '#21652A',
    fontSize: '23px',
    marginTop: '2.5%'
}



export default withRouter(SensorInfo);