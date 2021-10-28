import './App.css';
import ADAlator from './components/pages/ADAlator';
import fixedsys from './static/fonts/fixedsys-excelsior/fixedsys_excelsior_300.ttf';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    text: {
      primary: "#6bc099",
      secondary: "#6bc099"
    }
  },
  typography: {
    fontFamily: 'Fixedsys, Arial',
    allVariants: {
      fontSize: '1.1em'
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [fixedsys],
        'color': 'white'
      },
    },
  },
});



function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div id="interlace"></div>
      <div className="scanline"></div>
      <div className="App">
        <ADAlator />
      </div>
    </ThemeProvider>
  );
}

export default App;
