import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import {Box, Button, Card, Grid} from "@mui/material";
import Loader from "../../components/Loader";
import TrackList from "../../components/TrackList";
import AlbumIcon from "@mui/icons-material/Album";
import AlbumList from "../../components/AlbumList";
import {fetchTracks} from "../../store/action-creators/tracks";
import axios from "axios";

const Index = ({albums}) => {
    return (
        <MainLayout title='Cписок альбомов'>
            <Grid container justifyContent='center'>
                <Card style={{width: '1350px', backgroundColor: '#1f1f1f', color: '#fffcff'}}>
                    <Box p={1}>
                        <Grid container justifyContent='space-between'>
                            <h2><AlbumIcon style={{verticalAlign: 'middle'}}/> Список альбомов</h2>
                        </Grid>
                    </Box>
                    <AlbumList albums={albums}/>
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
    const response = await axios.get('https://tranquil-savannah-92743.herokuapp.com/albums',{
        params: {
            count: 30,
            offset: 0
        }});
    const albums = response.data;
    return {
        props: {albums}
    }
}

export default Index;