import _ from 'lodash';
import {
  colors,
  createMuiTheme,
  responsiveFontSizes
} from '@material-ui/core';
import { THEMES } from './constants';
import { softShadows} from './shadows';
import typography from './typography';

const baseOptions = {
  direction: 'ltr',
  typography,
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: 'hidden'
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32
      }
    },
    MuiChip: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.075)'
      }
    }
  }
};

const themesOptions = [
  {
    name: THEMES.LIGHT,
    overrides: {
      MuiInputBase: {
        input: {
          '&::placeholder': {
            opacity: 1,
            color: colors.blueGrey[600]
          }
        }
      }
    },
    palette: {
      type: 'light',
      action: {
        active: colors.blueGrey[600],
        hover: 'rgba(0, 0, 0, 0.04)',
        hoverOpacity: '0.04',
        selected:'rgba(0, 0, 0, 0.08)',
        selectedOpacity: '0.08',
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        disabledOpacity: '0.38',
        focus: 'rgba(0, 0, 0, 0.12)',
        focusOpacity: '0.12',
        activatedOpacity: '0.12',
      },
      common:{
        black:'#000',
        white: '#fff',
      },
      background: {
        default: colors.common.white,
        dark: '#f4f6f8',
        paper: colors.common.white,
        kimbeliBlue: '#5850EC'

      },
      primary: {
        light: '#502f84',
        main: '#210557',
        dark: '#04002d',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
      success:{
        light: '#81c784',
        main: '#4caf50',
        dark: '#388e3c',
        contrastText: 'rgba(0, 0, 0, 0.87)',
      },
      info:{
        light: '#64b5f6',
        main: '#2196f3',
        dark: '#1976d2',
        contrastText: '#fff'
      },
      error:{
        light: '#e57373',
        main: '#f44336',
        dark: '#d32f2f',
        contrastText: '#fff',
      },
      warning:{
        light: '#ffb74d',
        main: '#ff9800',
        dark: '#f57c00',
        contrastText: 'rgba(0, 0, 0, 0.87)',

      },
      text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600],
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)',
        divider: 'rgba(0, 0, 0, 0.12)',
      },
      grey:{
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#eeeeee',
        300: '#e0e0e0',
        400: '#bdbdbd',
        500: '#9e9e9e',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
        950: '#141414',
        A100:'#d5d5d5',
        A200:'#aaaaaa',
        A400:'#303030',
        A700:'#616161',
      },
      shape:{
        borderRadius:4,
      },
      zIndex:{
        mobileStepper: 1000,
        speedDial: 1050,
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500,
      }
    },

    shadows: softShadows
  },
  // {
  //   name: THEMES.ONE_DARK,
  //   palette: {
  //     type: 'dark',
  //     action: {
  //       active: 'rgba(255, 255, 255, 0.54)',
  //       hover: 'rgba(255, 255, 255, 0.04)',
  //       selected: 'rgba(255, 255, 255, 0.08)',
  //       disabled: 'rgba(255, 255, 255, 0.26)',
  //       disabledBackground: 'rgba(255, 255, 255, 0.12)',
  //       focus: 'rgba(255, 255, 255, 0.12)'
  //     },
  //     background: {
  //       default: '#282C34',
  //       dark: '#1c2025',
  //       paper: '#282C34'
  //     },
  //     primary: {
  //       main: '#8a85ff'
  //     },
  //     secondary: {
  //       main: '#8a85ff'
  //     },
  //     text: {
  //       primary: '#e6e5e8',
  //       secondary: '#adb0bb'
  //     }
  //   },
  //   shadows: strongShadows
  // },
  // {
  //   name: THEMES.UNICORN,
  //   palette: {
  //     type: 'dark',
  //     action: {
  //       active: 'rgba(255, 255, 255, 0.54)',
  //       hover: 'rgba(255, 255, 255, 0.04)',
  //       selected: 'rgba(255, 255, 255, 0.08)',
  //       disabled: 'rgba(255, 255, 255, 0.26)',
  //       disabledBackground: 'rgba(255, 255, 255, 0.12)',
  //       focus: 'rgba(255, 255, 255, 0.12)'
  //     },
  //     background: {
  //       default: '#2a2d3d',
  //       dark: '#222431',
  //       paper: '#2a2d3d'
  //     },
  //     primary: {
  //       main: '#a67dff'
  //     },
  //     secondary: {
  //       main: '#a67dff'
  //     },
  //     text: {
  //       primary: '#f6f5f8',
  //       secondary: '#9699a4'
  //     }
  //   },
  //   shadows: strongShadows
  // }
];

export const createTheme = (config = {}) => {
  let themeOptions = themesOptions.find((theme) => theme.name === config.theme);

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [themeOptions] = themesOptions;
  }

  let theme = createMuiTheme(
    _.merge(
      {},
      baseOptions,
      themeOptions,
      { direction: config.direction }
    )
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
}
