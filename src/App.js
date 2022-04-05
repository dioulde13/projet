import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { create } from "jss";
import rtl from "jss-rtl";
import { SnackbarProvider } from "notistack";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { createBrowserHistory } from "history";
import { jssPreset, StylesProvider, ThemeProvider } from "@material-ui/core";
import useSettings from './hooks/useSettings';
import { createTheme } from './theme';
import GlobalStyles from "./components/GlobalStyles";
import ScrollReset from './components/ScrollReset';
import routes, { renderRoutes } from './routes';



const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const history = createBrowserHistory();

function App() {
  const { settings } = useSettings();

  const theme = createTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    theme: settings.theme
  });

  return (
    <ThemeProvider theme={theme} >
      <StylesProvider jss={jss}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <SnackbarProvider dense maxSnack={3}>
          <Router history={history}>
            <GlobalStyles />
            <ScrollReset />
            {renderRoutes(routes)}
            
          </Router>
        </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    </ThemeProvider>
  );
}
export default App;