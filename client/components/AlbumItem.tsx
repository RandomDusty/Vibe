import React, {memo} from 'react';
import {IAlbum} from "../types/album";
import {Card, CardContent, Grid} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";
import {styled} from "@mui/material/styles";

interface AlbumItemProps {
    album: IAlbum;
    page?: string;
}


const MyCard = styled(Card)`
  background-color: #1f1f1f;
  padding: 10px;
  color: #fffcff;
  box-shadow: none;
  height: 280px;
  width: 250px;
  
  :hover{
    background: #2b2b2b;
    cursor: pointer;
  }
`;

const AlbumItem: React.FC<AlbumItemProps> = memo(({album, page}) => {
    const router = useRouter();

    return (
        <Grid item xs={page=='main'?8:4}>
            <MyCard onClick={() => router.push('/albums/' + album._id, undefined, { shallow: true })} sx={{}}>
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
            </MyCard>
        </Grid>
    );
});

AlbumItem.displayName = 'AlbumItem';

export default AlbumItem;