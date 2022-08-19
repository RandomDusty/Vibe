import React, {useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import {Box, Button, Card, Grid} from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import TrackList from "../../components/TrackList";
import {fetchTracks} from "../../store/action-creators/tracks";
import axios from "axios";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {IAlbum} from "../../types/album";

interface AlbumPageProps {
    album: IAlbum;
    page?: string;
}

const AlbumPage: React.FC<AlbumPageProps> = ({album, page}) => {
    const router = useRouter();

    return (
        <MainLayout title={'Альбом ' + album.name}>
            <Grid container justifyContent='center'>
                <Card style={{width: '1350px', backgroundColor: '#1f1f1f', color: '#fffcff'}}>

                    <Box p={1}>
                        <Grid container justifyContent='space-between'>
                            <h2><LibraryMusicIcon style={{verticalAlign: 'middle'}}/> Список треков
                                альбома <i>{album.name}</i></h2>
                            <Button color='inherit'
                                    onClick={() => router.push(page != 'main' ? '/albums' : '/', undefined, {shallow: true})}
                                    variant="outlined" startIcon={<ArrowBackIcon/>} sx={{height: '50px'}}>Назад</Button>
                        </Grid>


                    </Box>
                    <TrackList tracks={album.tracks}/>
                </Card>
            </Grid>
            
            <style jsx>
                {`
                  .center {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                  }

                `}
            </style>
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get('https://tranquil-savannah-92743.herokuapp.com/albums/' + params.id)
    return {
        props: {
            album: response.data
        }
    }
}

export default AlbumPage;