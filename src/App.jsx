import AllContactList from './components/AllContact/AllContactList';
import ContactForm from './components/ContactForm/ContactForm';
import { Container, Typography, Grid, Paper } from '@mui/material';

function App () {
  return (
    <Container>
      <Typography variant='h4'>Contact List</Typography>

      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Paper sx={{ p: 2, width: '100%' }}>
            <AllContactList />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, width: '100%' }}>
            <ContactForm />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
