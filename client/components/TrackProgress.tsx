import React from 'react';
import Slider from "@mui/material/Slider";
import {styled} from "@mui/material/styles";
import Typography from "@mui/material/Typography";

interface TrackProgressProps {
    left: number;
    right: number;
    onChange: (e) => void;
}


const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
    marginLeft: '10px'
});

const TrackProgress: React.FC<TrackProgressProps> = ({left, right, onChange}) => {
    function formatDuration(value: number) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }


    return (
        <div style={{display: 'flex'}}>
            <Slider
                aria-label="time-indicator"
                size="small"
                value={left}
                min={0}
                step={1}
                max={right}
                onChange={onChange}
                sx={{
                    color: 'inherit',
                    width: '505px',
                    height: 4,
                    '& .MuiSlider-thumb': {
                        width: 8,
                        height: 8,
                        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                        '&:before': {
                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                        },
                        '&:hover, &.Mui-focusVisible': {
                            boxShadow: `0px 0px 0px 8px 'rgb(255 255 255 / 16%)'`,
                        },
                        '&.Mui-active': {
                            width: 20,
                            height: 20,
                        },
                    },
                    '& .MuiSlider-rail': {
                        opacity: 0.28,
                    },
                }}
            />


            <TinyText>{formatDuration(left)}</TinyText>
            {/*<TinyText>-{formatDuration(duration - position)}</TinyText>*/}
        </div>
    );
};

export default TrackProgress;