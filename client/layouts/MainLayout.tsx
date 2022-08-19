import React, {memo, PropsWithChildren} from 'react';
import Navbar from '../components/Navbar'
import {Card, Container} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Player from "../components/Player";
import Head from "next/head";

interface MainLayoutProps {
    title?: string;
}

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#141414",
                    color: "#fffcff",
                }
            }
        }
    }
});

const MainLayout: React.FC<PropsWithChildren<MainLayoutProps>> = memo(({children, title}) => {
    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <style jsx global>{`

                  ::-webkit-scrollbar {
                    height: 9px;
                    width: 9px;
                    background-color: #2e2e2e;
                  }

                  ::-webkit-scrollbar-thumb {
                    border-radius: 10px;
                    background-color: #fffcff;

                  }

                  ::-webkit-scrollbar-track {
                    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
                    border-radius: 10px;
                    background-color: #2e2e2e;
                  }

                  .player {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                  }
                `}</style>

                <Head>
                    <title>{title || 'Vibe'}</title>
                </Head>
                <Navbar/>
                <Container style={{marginTop: '100px'}}>
                    {children}
                </Container>
                <div className="player">

                    <Player/>
                </div>

            </React.Fragment>
        </ThemeProvider>
    );
});

export default MainLayout;