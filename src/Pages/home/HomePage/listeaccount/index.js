import React from 'react'
import { Box, Container} from '@material-ui/core';
import Page from '../../../../components/Page';
import ListeAccount from './ListeAccount';

const ListeUser = () => {

    return (
        <>
            <Page
                title="List Account:"
            >
                <Container maxWidth={false}>
                            <Box py={1}>
                               <ListeAccount/>
                            </Box>
                </Container>
            </Page>

        </>
    );
}

export default ListeUser;
