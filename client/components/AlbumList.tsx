import React, {memo} from 'react';
import Loader from "./Loader";
import {Box, Card, CardContent, Grid} from "@mui/material";
import {IAlbum} from "../types/album";
import AlbumItem from "./AlbumItem";
import mainPageStyles from '../styles/MainPageAlbumList.module.scss'
import styles from '../styles/Album.module.css'
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface AlbumListProps {
    albums: IAlbum[];
    page?: string;
}

const AlbumList: React.FC<AlbumListProps> = memo(({albums, page}) => {
    const router = useRouter();

    return (
        <React.Suspense fallback={<Loader height={150} width='1350px'/>}>
            <Grid  container direction={page != 'main'?'row':'column'} spacing={4} columns={page == 'main'?32:16} className={page == 'main'?mainPageStyles.albumList:styles.albumList}>
                    {albums.map(album =>
                        <AlbumItem
                            key={album._id}
                            album={album}
                            page={page?page:''}
                        />
                    )}
                    {page == 'main'
                        ? <Grid item xs={page=='main'?8:4} sx={{margin: 'auto'}}>
                            <Card className={page=='main'?mainPageStyles.albumItem:styles.albumItem} onClick={() => router.push('/albums/', undefined, { shallow: true })}>
                                <CardContent >
                                    <Typography  variant='overline'>
                                        <b style={{textAlign: 'center'}}>Все альбомы </b>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        : <div></div>
                    }
            </Grid>
        </React.Suspense>
    );
});

export default AlbumList;