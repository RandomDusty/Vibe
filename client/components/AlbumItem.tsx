import React, {memo} from 'react';
import {ITrack} from "../types/track";
import {IAlbum} from "../types/album";
import {Card, CardContent, Grid} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from '../styles/Album.module.scss'
import {useRouter} from "next/router";
import mainPageStyles from '../styles/MainPageAlbumList.module.scss'

interface AlbumItemProps {
    album: IAlbum;
    page?: string;
}

const AlbumItem: React.FC<AlbumItemProps> = memo(({album, page}) => {
    const router = useRouter();

    return (
        <Grid xs={page=='main'?8:4}>
            <Card className={page=='main'?mainPageStyles.albumItem:styles.albumItem} onClick={() => router.push('/albums/' + album._id, undefined, { shallow: true })}>

                                <CardMedia
                    component="img"
                    sx={{width: 200, height: 200, margin: "auto"}}
                    image={'../static/' + album.picture}
                />
                <CardContent sx={{margin: 'auto'}}>
                    <Typography noWrap variant='overline'>
                        <b>{album.name}</b>
                    </Typography>
                    <br/>
                    <Typography noWrap variant='caption'>
                        {album.artist}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
});

AlbumItem.displayName = 'AlbumItem';

export default AlbumItem;