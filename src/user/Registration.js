import React from 'react'
import PropTypes from 'prop-types'
import { registerUser } from '../common/APIUtils'
import { DatePicker } from 'material-ui-pickers'
import { TimePicker } from 'material-ui-pickers'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import Snackbar from '@material-ui/core/Snackbar'
import './Registration.css'

const initialState = {
  name: '',
  address: '',
  dateOfBirth: null,
  hourOfDelivery: null,
  nameError: false,
  dateOfBirthError: false,
  hourOfDeliveryError: false,
  registerBtnDisabled: true,
  snackbarOpen: false
}

class Registration extends React.Component {
  constructor(){
    super()
    this.state = { 
      ...initialState 
    }
  }

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
      this.setState({ registerBtnDisabled: false })
    } else {
      this.setState({ registerBtnDisabled: true })
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
    const { name, address, dateOfBirth, hourOfDelivery, nameError, dateOfBirthError, hourOfDeliveryError, registerBtnDisabled } = this.state;

    return (
      <div>
        <div className="form-control">
          <FormControl error={nameError}>
            <InputLabel htmlFor="component-name">Name</InputLabel>
            <Input id="component-name" value={name} onChange={e => this.handleChange(e.target.value, 'name')} />
            <FormHelperText id="component-error-text">{nameError ? 'Name is required' : ''}</FormHelperText>
          </FormControl>
        </div>
        <div className="form-control">
          <FormControl>
            <InputLabel htmlFor="component-address">Address</InputLabel>
            <Input id="component-address" value={address} onChange={e => this.handleChange(e.target.value, 'address')} />
            <FormHelperText></FormHelperText>
          </FormControl>
        </div>
        <div className="form-control">
          <DatePicker
            error={dateOfBirthError}
            required
            clearable
            label="Date of birth"
            value={dateOfBirth}
            format="YYYY-MM-DD"
            disableFuture={true}
            onChange={e => this.handleChange(e, 'dateOfBirth')}
            animateYearScrolling
          />
          <FormHelperText id="component-error-text" error={dateOfBirthError}>
            {dateOfBirthError ? 'Date is required' : ''}
          </FormHelperText>
        </div>
        <div className="form-control">
          <TimePicker
            required
            clearable
            ampm={false}
            label="Hour of delivery"
            value={hourOfDelivery}
            onChange={e => this.handleChange(e, 'hourOfDelivery')}
          />
          <FormHelperText id="component-error-text" error={hourOfDeliveryError}>
            {this.state.hourOfDeliveryError ? 'hour of delivery is required' : ''}
          </FormHelperText>
        </div>
        <Button className="register-button" variant="contained" disabled={registerBtnDisabled} color="primary" onClick={this.register}>
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

export default Registration