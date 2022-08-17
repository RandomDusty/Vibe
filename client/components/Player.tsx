import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import TrackProgress from "./TrackProgress";
import {useTypeSelector} from "../hooks/useTypeSelector";
import {useActions} from "../hooks/useActions";
import {memo, useEffect} from "react";
import CardMedia from "@mui/material/CardMedia";
import {setPrevActiveTrack} from "../store/action-creators/player";


let audio;

const Widget = styled('div')(({theme}) => ({
    position: 'fixed',
    bottom: '6px',
    zIndex: 2000,
    backgroundColor: '#2b2b2b',
    backdropFilter: 'blur(40px)',
}));

const Player = memo(() => {
    const {active, volume, pause, currentTime, duration, prevActive, playlist} = useTypeSelector(state => state.player);
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setPrevActiveTrack, setActiveTrack} = useActions();

    useEffect(() => {
        if (!audio)
        {
            audio = new Audio();
        } else if (prevActive != active){
            setAudio();
            setPrevActiveTrack(active)
            playTrack();
            audio.play();
        }

    }, [active])

    useEffect(() => {
        if (active) {
            if (pause) {
                audio.pause()
            } else {
                audio.play()
            }
        }
    }, [pause])

    useEffect(() => {
        if(playlist && duration && currentTime == duration) {
            const currentIndex = playlist.findIndex((val) => val == active);
            if (currentIndex != playlist.length - 1) {
                setActiveTrack(playlist[currentIndex + 1]);
            } else {
                setActiveTrack(playlist[0]);
            }
        }
    }, [currentTime])

    const setAudio = () => {
        if (active) {
            audio.src = 'http://localhost:5000/' + active.audio;
            audio.volume = volume / 100;
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration));
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime));
            }
        }
    }

    const play = () => {
        if (pause) {
            playTrack()
        } else {
            pauseTrack()
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>): void => {
        audio.volume = Number(e.target.value) / 100;
        setVolume(Number(e.target.value));
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>): void => {
        audio.currentTime = Number(e.target.value);
        setCurrentTime(Number(e.target.value));
    }

    const nextSong = () => {
        setCurrentTime(duration);
    }

    const prevTrack = () => {
        const currentIndex = playlist.findIndex((val) => val == active);
        if (currentIndex != 0) {
            setActiveTrack(playlist[currentIndex - 1]);
        }
    }

    if (!active) {
        return null
    }

    return (
            <Widget>
                <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <IconButton aria-label="previous song" onClick={prevTrack}>
                            <FastRewindRounded fontSize="large" htmlColor="#fffcff"/>
                        </IconButton>
                        <IconButton
                            aria-label={pause ? 'play' : 'pause'}
                            onClick={play}
                        >
                            {pause ? (
                                <PlayArrowRounded
                                    sx={{fontSize: '3rem'}}
                                    htmlColor="#fffcff"
                                />
                            ) : (
                                <PauseRounded
                                    sx={{fontSize: '3rem'}}
                                    htmlColor='#fffcff'
                                />
                            )}
                        </IconButton>
                        <IconButton aria-label="next song" onClick={nextSong}>
                            <FastForwardRounded fontSize="large" htmlColor="#fffcff"/>
                        </IconButton>
                        <CardMedia
                            component="img"
                            sx={{width: 70, height: 70}}
                            image={'http://localhost:5000/' + active?.picture}
                        />
                        <Box ml={3} mt={2}>
                            <Box>
                                <Typography noWrap>
                                    <b>{active?.name}</b>
                                </Typography>
                                <Typography color="inherit">
                                    {active?.artist}
                                </Typography>
                            </Box>

                            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>

                        </Box>

                        <Stack spacing={2} direction="row" sx={{ml: 3, mr: 3}} alignItems="center">
                            <VolumeUpRounded htmlColor="inherit"/>
                            <Slider
                                sx={{
                                    color: 'inherit',
                                    width: '100px',
                                    '& .MuiSlider-track': {
                                        border: 'none',
                                    },
                                    '& .MuiSlider-thumb': {
                                        width: 15,
                                        height: 15,
                                        backgroundColor: '#fff',
                                        '&:before': {
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                                        },
                                        '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                            boxShadow: 'none',
                                        },
                                    },
                                }}
                                aria-labelledby="volume"
                                valueLabelDisplay="auto"
                                value={volume}
                                onChange={changeVolume}
                            />

                        </Stack>
                    </Box>
                </Box>
            </Widget>
    );
});

export default Player;