import React, {memo} from 'react';
import Loader from "./Loader";
import {Box, Card, CardContent, Grid} from "@mui/material";
import {IAlbum} from "../types/album";
import mainPageStyles from '../styles/MainPageAlbumList.module.scss'
import styles from '../styles/Album.module.scss'
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";

const AlbumItem = React.lazy(() => import("./AlbumItem"));
import {styled} from "@mui/material/styles";

interface AlbumListProps {
    albums: IAlbum[];
    page?: string;
}


const MyButtonCard = styled(Card)`
  background: inherit;
  color: inherit;
  box-shadow: none;

  :hover {
    background: #2b2b2b;
    cursor: pointer;
  }
`;

const AlbumList: React.FC<AlbumListProps> = memo(({albums, page}) => {
    const router = useRouter();

    return (
        <React.Suspense fallback={<Loader height={150} width='1350px'/>}>
            <Grid container direction={page != 'main' ? 'row' : 'column'} spacing={4} columns={page == 'main' ? 32 : 16}
                  className={page == 'main' ? mainPageStyles.albumList : styles.albumList}>
                {albums.map(album => {
                    return <AlbumItem
                        key={album._id}
                        album={album}
                        page={page ? page : ''}
                    />
                })
                }
                {page == 'main'
                    ? <Grid item xs={8} sx={{margin: 'auto'}}>
                        <MyButtonCard onClick={() => router.push('/albums/', undefined, {shallow: true})}>
                            <CardContent>
                                <Typography variant='overline'>
                                    <b style={{textAlign: 'center'}}>Все альбомы </b>
                                </Typography>
                            </CardContent>
                        </MyButtonCard>
                    </Grid>
                    : <div></div>
                }
            </Grid>
        </React.Suspense>
    );
});

AlbumList.displayName = 'AlbumList';

export default AlbumList;