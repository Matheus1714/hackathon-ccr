import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';

import {submitAvaliation} from '../api/submitAvaliation'

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

export default function RatingPage(props) {
    const classes = useStyles();

    const [value1, setValue1] = React.useState(2);
    const [value2, setValue2] = React.useState(2);
    const [value3, setValue3] = React.useState(2);
    const [value4, setValue4] = React.useState(2);
    const [value5, setValue5] = React.useState(2);
    const [value6, setValue6] = React.useState(2);
    const [value7, setValue7] = React.useState(2);
    const [value8, setValue8] = React.useState(2);

    const handleClickButton = async () => {
        const hereID = localStorage.getItem('post')
        const data = await submitAvaliation({
            hereID: 'here:pds:place:0766gycg-4b77b785e187446b9a1d5ee424d8dafb',
            ratings: {
                courtyard: value1,
                fuelprice: value2,
                attendance: value3,
                foodquality: value4,
                foodprice: value5,
                security: value6,
                bath: value7
            },
            comment : value8
        })
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography
                    className={classes.postName}
                >Avalie o Posto</Typography>

                <Box component="fieldset" mb={2} borderColor="transparent">
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography component="legend" >Pátio</Typography>
                        </Grid>
                        <Grid item xs={6}>
                        <Rating
                            name="half-rating-patio"
                            defaultValue={0}
                            precision={0.5}
                            value={value1}
                            onChange={(event, newValue) => {
                                setValue1(newValue);
                            }}
                        />
                        </Grid>
                    </Grid>
                </Box>

                <Box component="fieldset" mb={2} borderColor="transparent">
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography component="legend" >Preço Combustível</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Rating
                                name="half-rating-preco"
                                defaultValue={0}
                                precision={0.5}
                                value={value2}
                                onChange={(event, newValue) => {
                                    setValue2(newValue);
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box component="fieldset" mb={2} borderColor="transparent">
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography component="legend" >Atendimento</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Rating
                                name="half-rating-atendimento"
                                defaultValue={0}
                                precision={0.5}
                                value={value3}
                                onChange={(event, newValue) => {
                                    setValue3(newValue);
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box component="fieldset" mb={2} borderColor="transparent">
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography component="legend" >Preço da Comida</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Rating
                                name="half-rating-preco"
                                defaultValue={0}
                                precision={0.5}
                                value={value4}
                                onChange={(event, newValue) => {
                                    setValue4(newValue);
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box component="fieldset" mb={2} borderColor="transparent">
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography component="legend" >Qualidade Comida</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Rating
                                name="half-rating-qualidade"
                                defaultValue={0}
                                precision={0.5}
                                value={value5}
                                onChange={(event, newValue) => {
                                    setValue5(newValue);
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box component="fieldset" mb={2} borderColor="transparent">
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography component="legend" >Segurança</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Rating
                                name="half-rating-seguranca"
                                defaultValue={0}
                                precision={0.5}
                                value={value6}
                                onChange={(event, newValue) => {
                                    setValue6(newValue);
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box component="fieldset" mb={2} borderColor="transparent">
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography component="legend" >Banho</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Rating
                                name="half-rating-banho"
                                defaultValue={0}
                                precision={0.5}
                                value={value7}
                                onChange={(event, newValue) => {
                                    setValue7(newValue);
                                }}
                            />
                        </Grid>
                    </Grid>
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
                <Input
                    placeholder="Campo não obrigátório"
                    onChange={(event) => {
                        setValue8(event.target.value)
                    }}
                />

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
