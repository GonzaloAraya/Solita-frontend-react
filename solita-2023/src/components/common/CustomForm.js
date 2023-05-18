import React, { useEffect, useState } from "react";
import { stationInformationReturn } from "../../controllers/Data";
import { stationInformationDeparture } from "../../controllers/Data";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

/*
 * custom form where will be displayed station name, total number of journeys starting from the station
 * total number of journeys ending at the station, the average distance of a journey starting from the station,
 * the average distance of a journey ending at the station
 * 
 * @returns station information list
 */
export default function CustomForm() {
  const [stationInformation, setStationInformation] = useState({stationName:"Teljäntie", totalDepartures: "0", totalArrivals: "0", averageDistanceDeparture: "0", averageDistanceArrivals: "0"});

  //updating data only on the first render
  useEffect(() => {
    readDataReturn();
    readDataDeparture();
  }, []);

  //fetching data from controller, update station arrival information
  async function readDataReturn() {
    await stationInformationReturn(stationInformation.stationName)
      .catch(console.error)
      .then((response) => {
        const myArray = response.split(":");
        setStationInformation(stationInformation => ({
            ...stationInformation,
            averageDistanceArrivals : myArray[0],
            totalArrivals : myArray[1]
        }))
      });
  }

  //fetching data from controller, update station departure information
  async function readDataDeparture() {
    await stationInformationDeparture(stationInformation.stationName)
      .catch(console.error)
      .then((response) => {
        const myArray = response.split(":");
        setStationInformation(stationInformation => ({
            ...stationInformation,
            averageDistanceDeparture : myArray[0],
            totalDepartures : myArray[1]
        }))
      });
  }

  return (
    <div style={{ height: "auto", width: "40%" }}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Station" secondary={stationInformation.stationName} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Total number of journeys starting from the station"
            secondary={stationInformation.totalDepartures}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Total number of journeys ending at the station"
            secondary={stationInformation.totalArrivals}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="average distance of a journey starting "
            secondary={stationInformation.averageDistanceDeparture}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="average distance of a journey ending"
            secondary={stationInformation.averageDistanceArrivals}
          />
        </ListItem>
      </List>
    </div>
  );
}
