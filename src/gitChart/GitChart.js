import React from 'react'
import PropTypes from 'prop-types'
import { registerUser } from '../common/APIUtils'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import { getRepositoriesByLanguage, reduceDataForChart } from '../common/APIUtils'
import Chart from '../chart/Chart'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 300
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class GitChart extends React.Component {
  state = {
    languageName: '',
    inputRequiredError: false,
    apiResponseError: false,
    data: [],
  };

  handleChange = (e) => {
    const value = e.target.value
    this.setState({ languageName: e.target.value, inputRequiredError: !value })
  };

  makeChart = () => {
    getRepositoriesByLanguage(this.state.languageName).then(response => {
      this.setState({ data: reduceDataForChart(response.data.items) })
      this.setState({ apiResponseError: false })
    }).catch((error) => {
      this.setState({ apiResponseError: true })
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-name">Promgraming language</InputLabel>
          <Input id="component-name" value={this.state.languageName} onChange={this.handleChange} />
          <FormHelperText id="component-error-text">{this.state.inputRequiredError ? ':( please write something here' : ''}</FormHelperText>
        </FormControl>
        <Button variant="contained" color="primary" className={classes.button} onClick={this.makeChart}>
          Make chart
        </Button>
        <span>{this.state.apiResponseError ? 'Api could not find data for this input': ''}</span>
        <Chart data={this.state.data} />
      </div>
    );
  }
}

GitChart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GitChart)