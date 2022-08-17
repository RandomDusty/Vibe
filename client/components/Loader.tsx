import React from 'react';
import {Skeleton} from "@mui/material";

const Loader = ({width, height}) => {
    return (
        <Skeleton
            sx={{ bgcolor: 'grey.900' }}
            variant="rectangular"
            width={width}
            height={height}
        />
    );
};

export default Loader;