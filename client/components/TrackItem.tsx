import {ITrack} from "../types/track";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import styles from '../styles/TrackItem.module.scss'
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {Delete} from "@mui/icons-material";
import {memo, useEffect, useState} from "react";
import {useActions} from "../hooks/useActions";
import {useTypeSelector} from "../hooks/useTypeSelector";

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
    pause?: boolean;
    tracks: ITrack[];
}

const TrackItem: React.FC<TrackItemProps> = memo(({track, active, pause, tracks}) => {
    const {playTrack, pauseTrack, setActiveTrack, setPlaylist} = useActions();
    const {playlist, nextPlaylist} = useTypeSelector(state => state.player)

    const play =  () => {
        if (playlist != nextPlaylist) {
            setPlaylist(tracks);
            setActiveTrack(nextPlaylist.find((val) => val == track));
        } else if (!active) {
            setActiveTrack(playlist.find((val) => val == track));
        } else if (pause) {
            playTrack();
        } else {
            pauseTrack();
        }
    }

    return (
        <Card className={active?styles.activeTrack:styles.track} onClick={play}>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                    <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                        <CardMedia
                            component="img"
                            sx={{width: 70, height: 70}}
                            image={'../static/' + track.picture}
                        />
                        <IconButton disableRipple aria-label="play/pause" color="primary" className={styles.playIcon}>
                                {pause
                                ? <PlayCircleIcon sx={{height: 38, width: 38}}/>
                                : <PauseCircleIcon sx={{height: 38, width: 38 }}/>
                                }
                        </IconButton>
                        <Box ml={2}>
                            <Typography component="div" variant="h5">
                               <b>{track.name}</b>
                            </Typography>
                            <Typography variant="subtitle1" color="inherit" component="div">
                                {track.artist}
                            </Typography>

                        </Box>
                        {/*<IconButton color='inherit' className={styles.deleteIcon}>*/}
                        {/*    <Delete/>*/}
                        {/*</IconButton>*/}
                    </Box>
            </Box>
        </Card>
    );
});

TrackItem.displayName = 'TrackItem';

export default TrackItem;