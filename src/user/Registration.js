import React from 'react';
import PropTypes from 'prop-types';
import { registerUser } from '../common/APIUtils';
import { DatePicker } from 'material-ui-pickers';
import { TimePicker } from 'material-ui-pickers';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
  container: {
  },
  formControl: {
    // margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const initialState = {
  name: '',
  address: '',
  dateOfBirth: null,
  hourOfDelivery: null,
  nameError: false,
  dateOfBirthError: false,
  hourOfDeliveryError: false,
  disabled: true,
  snackbarOpen: false
}

class Registration extends React.Component {
  state = { ...initialState };

  handleChange = (value, type) => {
    const nextState = {};
    nextState[type] = value;
    this.setState(nextState);
    this.isDisabled(type, { ...this.state, ...nextState });
  };

  isDisabled = (type, nextState) => {
    if (type === 'name') {
      this.setState({ nameError: nextState.name ? false : true });
    }
    if (type === 'dateOfBirth') {
      this.setState({ dateOfBirthError: nextState.dateOfBirth ? false : true });
    }
    if (type === 'hourOfDelivery') {
      this.setState({ hourOfDeliveryError: nextState.hourOfDelivery ? false : true });
    }
    if (nextState.name && nextState.dateOfBirth && nextState.hourOfDelivery) {
      this.setState({ disabled: false })
    } else {
      this.setState({ disabled: true })
    }
  }

  register = () => {
    registerUser({
      name: this.state.name,
      address: this.state.address,
      dateOfBirth: this.state.dateOfBirth,
      hourOfDelivery: this.state.hourOfDelivery
    }).then((response) => {

      this.setState({
        ...initialState,
        snackbarOpen: true
      })
    })
  }

  handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  render() {
    const { classes } = this.props;
    const { name, address, dateOfBirth, hourOfDelivery, nameError, dateOfBirthError, hourOfDeliveryError } = this.state;

    return (
      <div className={classes.container}>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="component-name">Name</InputLabel>
            <Input id="component-name" value={name} onChange={e => this.handleChange(e.target.value, 'name')} />
          </FormControl>
          <FormHelperText id="component-error-text">{nameError ? 'Name is required' : ''}</FormHelperText>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="component-address">Address</InputLabel>
            <Input id="component-address" value={address} onChange={e => this.handleChange(e.target.value, 'address')} />
            <FormHelperText id="component-error-text"></FormHelperText>
          </FormControl>
        </div>
        <div>
          <DatePicker
            required
            clearable
            label="Date of birth"
            value={dateOfBirth}
            format="YYYY-MM-DD"
            disableFuture={true}
            onChange={e => this.handleChange(e, 'dateOfBirth')}
            animateYearScrolling
          />
          <FormHelperText id="component-error-text">{dateOfBirthError ? 'Date is required' : ''}</FormHelperText>
        </div>
        <div>
          <TimePicker
            required
            clearable
            ampm={false}
            label="Hour of delivery"
            value={hourOfDelivery}
            onChange={e => this.handleChange(e, 'hourOfDelivery')}
          />
          <FormHelperText id="component-error-text">{this.state.hourOfDeliveryError ? 'hour of delivery is required' : ''}</FormHelperText>
        </div>
        <Button variant="contained" disabled={this.state.disabled} color="primary" className={classes.button} onClick={this.register}>
          Register
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">User registered</span>}
        />
      </div>
    );
  }
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Registration)