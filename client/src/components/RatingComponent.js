import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  postName: {
      fontSize: 40
  },
  commit: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(40),
      height: theme.spacing(16)
    },
  }
}));

export default function RatingPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          <Typography
            className={classes.postName}
          >Posto Genérico</Typography>
      
        <Box component="fieldset" mb={2} borderColor="transparent">
            <Typography component="legend">Pátio</Typography>
                <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
        </Box>

        <Box component="fieldset" mb={2} borderColor="transparent">
            <Typography component="legend">Preço Combustível</Typography>
                <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
        </Box>

        <Box component="fieldset" mb={2} borderColor="transparent">
            <Typography component="legend">Atendimento</Typography>
                <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
        </Box>

        <Box component="fieldset" mb={2} borderColor="transparent">
            <Typography component="legend">Qualidade Comida</Typography>
                <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
        </Box>

        <Box component="fieldset" mb={2} borderColor="transparent">
            <Typography component="legend">Preço Comida</Typography>
                <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
        </Box>

        <Box component="fieldset" mb={2} borderColor="transparent">
            <Typography component="legend">Segurança</Typography>
                <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
        </Box>

        <Box component="fieldset" mb={2} borderColor="transparent">
            <Typography component="legend">Banho</Typography>
                <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
        </Box>

        <Typography>Comentários Recentes</Typography>
        
        <Box className={classes.commit}>
            <Paper elevation={3}>
                <Typography>
                    sdlfjsfkdjhfks
                </Typography>
            </Paper>
        </Box>

        <Box className={classes.commit}>
            <Paper elevation={3}>
                <Typography>
                    sdlfjsfkdjhfks
                </Typography>
            </Paper>
        </Box>
        

        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            href="/success"
        >
            Avaliar
        </Button>
        
      </div>
    </Container>
  );
}