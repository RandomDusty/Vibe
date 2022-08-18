import React, {memo} from 'react';
import {Box, Button, Card, Grid} from '@mui/material';
import MainLayout from "../layouts/MainLayout";
import Loader from "../components/Loader";
import AlbumItem from "../components/AlbumItem";
import AlbumIcon from "@mui/icons-material/Album";
import AlbumList from "../components/AlbumList";
import axios from "axios";
import styles from '../styles/MainPageAlbumList.module.scss'
import {IAlbum} from "../types/album";

interface AlbumListProps {
    albums: IAlbum[];
}

const Index: React.FC<AlbumListProps> = memo(({albums}) => {
    return (
        <>
            <MainLayout>
                <div className='center'>
                    <h1>Главная страница</h1>
                    <div>
                        <Grid container justifyContent='center'>
                            <Card style={{width: '1350px', backgroundColor: '#1f1f1f', color: '#fffcff'}}>
                                <Box p={1}>
                                    <Grid container justifyContent='space-between'>
                                        <h2><AlbumIcon style={{verticalAlign: 'middle'}}/> Список альбомов</h2>
                                    </Grid>
                                </Box>
                                    <AlbumList albums={albums} page='main'/>
                            </Card>
                        </Grid>
                    </div>
                </div>
            </MainLayout>

            <style jsx>
                {` 
                  .center {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                  }
                `}
            </style>
        </>
    );
});

Index.displayName = 'Index';

export default Index;


export async function getServerSideProps(context) {
    const response = await axios.get('https://tranquil-savannah-92743.herokuapp.com/albums', {
        params: {
            count: 6,
            offset: 0
        }});
    const albums = response.data;
    return {
        props: {albums}
    }
}