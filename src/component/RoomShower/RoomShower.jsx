import React, { useEffect, useState } from 'react';

import './RoomShower.css';
import { fetchRooms } from '../../actions/roomActions';
import RoomInstance from './RoomInstance';
import { Grid } from '@material-ui/core';

const RoomShower = () => {
    const [rooms, setRooms] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchRooms(0)
            .then((response) => setRooms(response.data.content))
            .catch((error) => setErrorMessage(error));
    }, []);

    return (
        <div className="rooms-container">
            {rooms &&
                rooms.map((room) => <RoomInstance key={room.id} room={room} />)}
        </div>
    );
    /*  return (
      <Grid container direction="row" justify="center" alignItems="center">
          <Grid container item xs={12}>
              {rooms &&
                  rooms.map((room) => (
                      <Grid container xs={4} sm={4}>
                          <RoomInstance key={room.id} room={room} />
                      </Grid>
                  ))}
          </Grid>
      </Grid>
  ); */
};

export default RoomShower;
