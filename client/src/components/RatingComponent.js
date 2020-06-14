import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

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
        height: theme.spacing(4),
        textAlign: "center"
    },
  }
}));

export default function RatingPage() {
  const classes = useStyles();

  const handleClickButton = () => {
      localStorage.setItem('aaa', {
          'text':'asdsasa'
      })
      console.log(JSON.parse(localStorage.getItem('aaa')))
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          <Typography
            className={classes.postName}
          >Avalie o Posto</Typography>
      
        <Box component="fieldset" mb={2} borderColor="transparent">
            <Typography component="legend">Pátio</Typography>
            <Rating name="half-rating-patio" defaultValue={0} precision={0.5} />
        </Box>

        <Box component="fieldset" mb={2} borderColor="transparent">
            <Typography component="legend">Preço Combustível</Typography>
            <Rating name="half-rating-preco" defaultValue={0} precision={0.5} />
        </Box>

        <Box component="fieldset" mb={2} borderColor="transparent">
            <Typography component="legend">Atendimento</Typography>
            <Rating name="half-rating-atendimento" defaultValue={0} precision={0.5} />
        </Box>

        <Box component="fieldset" mb={2} borderColor="transparent">
            <Typography component="legend">Qualidade Comida</Typography>
            <Rating name="half-rating-qualidade" defaultValue={0} precision={0.5} />
        </Box>

        <Box component="fieldset" mb={2} borderColor="transparent">
            <Typography component="legend">Preço Comida</Typography>
            <Rating name="half-rating-comida" defaultValue={0} precision={0.5} />
        </Box>

        <Box component="fieldset" mb={2} borderColor="transparent">
            <Typography component="legend">Segurança</Typography>
            <Rating name="half-rating-seguranca" defaultValue={0} precision={0.5} />
        </Box>

        <Box component="fieldset" mb={2} borderColor="transparent">
            <Typography component="legend">Banho</Typography>
            <Rating name="half-rating-banho" defaultValue={0} precision={0.5} />
        </Box>

        <Typography>Comentários Recentes</Typography>
        
        <Box className={classes.commit}>
            <Paper elevation={3}>
                <Typography>
                    Ele tem um comida ótima!
                </Typography>
            </Paper>
        </Box>

        <Box className={classes.commit}>
            <Paper elevation={3}>
                <Typography>
                    O lugar é confortável!
                </Typography>
            </Paper>
        </Box>
        <Typography>Comentário</Typography>
        <TextField placeholder="Campo não obrigátório" />

        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            href="/success"
            onClick={() => handleClickButton() }
        >
            Avaliar
        </Button>
        
      </div>
    </Container>
  );
}