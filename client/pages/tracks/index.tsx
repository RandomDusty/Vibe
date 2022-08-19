import React, {Dispatch, memo, useMemo, useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import {Box, Button, Card, createTheme, Grid, ThemeProvider} from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import TrackList from "../../components/TrackList";
import {fetchTracks} from "../../store/action-creators/tracks";
import axios from "axios";


const theme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#f72851'
        }
    },
});


const Index = ({tracks}) => {
    return (
        <MainLayout title='Cписок треков'>
            <Grid container justifyContent='center'>
                <Card style={{width: '1350px', backgroundColor: '#1f1f1f', color: '#fffcff'}}>
                    <Box p={1}>
                        <Grid container justifyContent='space-between'>
                            <h2><LibraryMusicIcon style={{verticalAlign: 'middle'}}/> Список всех треков</h2>
                            {/*<ThemeProvider theme={theme}>*/}
                            {/*    <Button color='primary' onClick={() => router.push('/tracks/create')}*/}
                            {/*            variant="outlined">Загрузить</Button>*/}
                            {/*</ThemeProvider>*/}
                        </Grid>
                    </Box>
                    <TrackList tracks={tracks}/>
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

export async function getServerSideProps(context) {
    fetchTracks();
    const response = await axios.get('https://tranquil-savannah-92743.herokuapp.com/tracks', {
        params: {
            count: 30,
            offset: 0
        }
    });
    const tracks = response.data
    return {
        props: {tracks}
    }
}

export default Index;

