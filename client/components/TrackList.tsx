import React, {memo, useEffect, useState} from 'react';
import {ITrack} from "../types/track";
import {Box, Grid} from "@mui/material";
import Loader from "./Loader";
import {useActions} from "../hooks/useActions";
import {useTypeSelector} from "../hooks/useTypeSelector";
const TrackItem = React.lazy( () => import("./TrackItem"));

interface TrackListProps {
    tracks: ITrack[];
}

const TrackList: React.FC<TrackListProps> = memo(({tracks}) => {
    const {active, pause, playlist} = useTypeSelector(state => state.player);
    const {setPlaylist, setNextPlaylist} = useActions();

    useEffect(() => {
        if(!playlist) {
            setPlaylist(tracks);
        }
        setNextPlaylist(tracks);

    }, [])

    return (
            <React.Suspense fallback={<Loader height={150} width='1350px'/>}>
                <Grid container direction='column' sx={{height: '67vh',overflow: 'auto', position: 'sticky'}}>
                    <Box p={0} >
                        {tracks.map(track => {
                                return <TrackItem
                                    key={track._id}
                                    track={track}
                                    active={active == track}
                                    pause={active == track ? pause : true}
                                    tracks={tracks}
                                />
                            }
                        )}
                    </Box>
                </Grid>
            </React.Suspense>
    );
});

TrackList.displayName = 'TrackList';

export default TrackList;