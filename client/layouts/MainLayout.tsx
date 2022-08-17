import React, {memo, PropsWithChildren} from 'react';
import Navbar from '../components/Navbar'
import {Container} from "@mui/material";
import Player from "../components/Player";

interface Props {
}

const MainLayout: React.FC<PropsWithChildren<Props>> = memo(({children}) => {
    return (
        <>
            <Navbar/>
                <Container style={{marginTop: '100px'}}>
                    {children}

                </Container>
            <div className='player'>
                <Player/>
            </div>


            <style jsx global>{`
              body {
                background: #141414;
                color: #fffcff;              
              }
              
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
                  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
                  border-radius:10px;
                  background-color: #2e2e2e;
                }
              
              .player {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    
              }
            `}</style>

        </>
    );
});

export default MainLayout;