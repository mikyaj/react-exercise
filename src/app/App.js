import React from 'react'
import { ThemeProvider } from "@material-ui/styles"
import { createMuiTheme } from "@material-ui/core/styles"
import ResponsiveDrawer from "../navigation/SideNavBar"
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment'
import GitChart from '../gitChart/GitChart'
import Registration from '../user/Registration'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
const theme = createMuiTheme({ typography: { useNextVariants: true } });

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Route path='/' component={ResponsiveDrawer} />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </div>
      </Router>
    )
  }
}

export default App