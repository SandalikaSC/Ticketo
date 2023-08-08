import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
//import { makeStyles } from '@mui/material/styles';

//Define custom styles
// const useStyles = makeStyles((theme) => ({
//   cardContainer: {
//     width: '45%',
//     margin: '0 auto', // Center the card horizontally
//     backgroundColor: '#f4f4f4',
//     fontFamily: 'IBM Plex Sans, sans-serif',
//     marginBottom: theme.spacing(2), // Add some space between cards
//   },
//   columnContainer: {
//     display: 'flex',
//     justifyContent: 'space-between', // Arrange text in columns with space between them
//   },
//   columnText: {
//     width: '48%', // Adjust width of the columns as needed
//   },
// }));

const MyCard = () => {

  // const classes = useStyles();
  // className={classes.cardContainer}
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Card Title
        </Typography>

        {/* <div className={classes.columnContainer}>
          <div className={classes.columnText}>
            <Typography variant="body2" color="text.secondary">
              Column 1 text goes here.
            </Typography>
          </div>
          <div className={classes.columnText}>
            <Typography variant="body2" color="text.secondary">
              Column 2 text goes here.
            </Typography>
          </div>
        </div> */}

        {/*<Typography variant="body2" color="text.secondary">
          This is the content of the card. You can put any information here.
          </Typography>*/}

      </CardContent>
    </Card>
  );
};

export default MyCard;
