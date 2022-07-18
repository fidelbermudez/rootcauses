 // USED IN TEXTS.SMS
  // Component for participants whose texts are more complicated
  // for the API to sort, so these will have to be manually changed

import React from "react";
import "../pages/Texts.css";
import SvgEllipse from "../symbolComponents/Ellipse";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import MenuItem from "@mui/material/MenuItem";
// import { Container, Wrapper, Row, Column, Link, Title } from './styles/footer'

// const baseUrl = "http://127.0.0.1:5000";
const baseUrl = "http://localhost:5000";

export function Uncaught_Participants() {
    const [status, setStatus] = React.useState('');
    const [open, setOpen] = React.useState(true);
    const [uncaughtParticipants, setUncaughtParticipants] = useState([]);


    // GET PARTICIPANTS
    const fetchParticipants = async () => {
      const retParticipants = [];
      const data = await axios.get(`${baseUrl}/participants/group/A`); // GET PATIENTS WITH DESIRED ANSWERS
      for(let i=0; i < data.length; i++){
        axios.get(`${baseUrl}/participants`).then(response => {
          console.log("hello");
          const participants = data.data.participants;
          if(participants.sms_response !== "Yes"){
            retParticipants.push(response);
          }
        })
      }
      // let participants = data.data.participants;
      // const retParticipants = [];
      // for(let i = 0; i < 16; i++){
      //   console.log(data.sms_response);
      // }
      // for(let pt in participants){
      //   console.log("response: ", pt.sms_response);
      //   if(pt.sms_response !== "Yes") {
      //     retParticipants.push(pt);
      //   };
      // }
    
      setUncaughtParticipants(retParticipants);
      console.log("DATA: ", data);
      console.log(retParticipants.length);
      for(let pt in retParticipants){
        console.log("response: ", pt.sms_response);
      }
    };


      useEffect(() => {
        fetchParticipants();
      }, []);
    const handleStatusChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value);
    };

    const handleClick = () => {
    setOpen(!open);
    };

     let statusMap = new Map([
        [0, "grey"],
        [1, "green"],
        [2, "tan"],
        [3, "salmon"],
      ]);

    return (
      <div>
      {uncaughtParticipants.map((participant) => {
        return (
          <div>
        <ListItemButton onClick={handleClick}>
          <div
            style={{
              color: `${statusMap.get(participant.status)}`,
            }}
          >
          <SvgEllipse id="text_status"/>
          </div>
          <ListItemText primary= {participant.first_name} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className= "sublist">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary= {participant.sms_response}/>
                  <Box sx={{ width:100, maxWidth: 300 }}>
                    <FormControl fullWidth>
                      <InputLabel id="select-status-label">Status</InputLabel>
                        <Select
                          labelId="simple-select-label"
                          id="simple-select"
                          sx={{backgroundColor: "#f9f8e1" }}
                          value={status}
                          label="Status"
                          onChange={handleStatusChange}
                        >
                          <MenuItem value={0}>No Status Set</MenuItem>
                          <MenuItem value={1}>Ready for Delivery</MenuItem>
                          <MenuItem value={2}>Not This Week</MenuItem>
                          <MenuItem value={3}>Requires Follow Up</MenuItem>
                        </Select>
                    </FormControl>
                  </Box>
              </ListItemButton>
            </List>
          </Collapse>
          </div>
      )})}
          </div>
    );
}