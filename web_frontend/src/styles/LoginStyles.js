import { createTheme } from '@mui/material/styles';

// Define a custom theme with Poppins font
const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
});


const LoginPageStyles = {
    fontFamily: 'Poppins',
    container: {
        height: '100vh',
        // width: '94%',
        boxShadow: '0px 2px 8px black',
        // outline: '2px solid #000000',
        // margin: '3%',
    },
    firstColumn: {
        width: '4%',
        backgroundColor: '#3D50AC',
    },
    secondColumn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
        marginTop: '-80px',
    },
    slogan: {
        fontStyle: 'italic',
        color: 'grey',
    },
    verticalLine: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        height: '60%',
        backgroundColor: '#ccc',
        width: '3px',
    },
    thirdColumn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#3D50AC',
        fontWeight: 'bold',
        marginBottom: '50px',
        marginTop: '-30px',
    },
    textFieldContainer: {
        textAlign: 'center',
    },
    // textField: {
    //     borderRadius: '100px',
    //     width: '65%',
    //     backgroundColor: '#E8E8E8',
    //     border: 'none',
    //     outline: 'none',
    //     '& .MuiOutlinedInput-root': {
    //         '& fieldset': {
    //             border: 'none',
    //         },
    //         paddingLeft: '42px',
    //     },
    //     marginTop: 4,
    // },
    textField: {
        borderRadius: '100px',
        width: '65%',
        backgroundColor: '#E8E8E8',
        border: 'none',
        outline: 'none',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'transparent', // Remove the border color change
            },
            '&:hover fieldset': {
                borderColor: 'transparent', // Remove the border color change on hover
            },
            '&.Mui-focused fieldset': {
                borderColor: 'transparent', // Remove the border color change when focused
            },
        },
        '& input': {
            color: 'inherit', // Specify the desired text color
        },
        marginTop: 4,
    },

    icon: {
        width: '24px',
        height: '24px',
    },
    loginButton: {
        width: '36%',
        height: '50px',
        borderRadius: '50px',
        mt: 8,
        color: 'white',
        backgroundColor: '#3D50AC',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#262C68',
        },
    },
    forgotPassword: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 8,
    },
    forgotPasswordText: {
        color: '#3D50AC',
        fontSize: '17px',
        marginRight: 1,
        fontWeight: 'bold',
    },
    recoverLink: {
        color: '#F86F5D',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '17px',
    },
};


const mergedStyles = { ...LoginPageStyles, ...theme };

export default mergedStyles;
// export default LoginPageStyles;