import { Button, FormControl, Box, TextField} from '@mui/material'
import { styled } from '@mui/material/styles';

export const LoginButton = styled(Button)({
    width: '300px',
    backgroundColor: '#212121',
    color: 'white',
    '&:hover': {backgroundColor: '#404040'}
})

export const LogoutButton = styled(Button)({
    marginTop: '10px',
    marginBottom: '10px',    
    width: '300px',
    backgroundColor: '#6D9886',
    color: '#212121',
    '&:hover': {backgroundColor: '#83978f'}
})

export const LoginForm = styled(FormControl)({
    width: '300px', 
    marginTop: '10px',
    backgroundColor: '#F6F6F6',
})

export const LoginBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    padding: '40px',

})

