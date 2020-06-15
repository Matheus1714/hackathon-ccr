import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Skeleton from '@material-ui/lab/Skeleton';

import {login} from '../api/login';
import {register} from '../api/register';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

async function handleLogin(user,pass,handler){
    let logged = await login(user,pass);
    if (logged){
        handler();
    }
}

async function handleRegister(user,pass,handler){
    let logged = await register(user,pass);
    if (logged){
        handler();
    }
}

export default function Login(props) {
    const classes = useStyles();

    let handler = props.handler;

    const [mode, setMode] = useState('login');
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Skeleton variant="rect" width={300} height={300} />
                <Typography component="h1" variant="h5">
                    {mode === 'login' ? 'Entrar' : 'Cadastro'}
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="user"
                        label="Nome de Usuário"
                        name="user"
                        autoComplete="user"
                        autoFocus
                        value={user}
                        onChange={(event) => setUser(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={pass}
                        onChange={(event) => setPass(event.target.value)}
                    />
                    {mode === 'login' ?
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => handleLogin(user,pass,handler)}
                        >
                            Entrar
                        </Button> :
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => handleRegister(user,pass,handler)}
                        >
                            Registrar
                        </Button>
                    }
                    <Grid container>
                        <Grid item>
                            {mode === 'login' ?
                                <Link href='#' onClick={() => setMode('register')} variant="body2">
                                    Não tem uma senha? Cadastre-se
                                </Link> :
                                <Link href='#' onClick={() => setMode('login')} variant="body2">
                                    Voltar para o login
                                </Link>
                            }
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
