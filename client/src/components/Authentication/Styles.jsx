import { Button, FormControl, Box, TextField} from '@mui/material'
import { styled } from '@mui/material/styles';

export const LoginButton = styled(Button)({
    backgroundColor: '#212121',
    color: 'white',
    '&:hover': {backgroundColor: '#404040'}
})

export const LoginForm = styled(FormControl)({
    width: '300px', 
    marginTop: '10px',
})

export const InputField = styled(TextField)({
    

})

export const LoginBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    padding: '40px',

})

