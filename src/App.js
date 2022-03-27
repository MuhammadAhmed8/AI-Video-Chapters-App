import logo from './logo.svg';
import './App.css';
import Media from './pages/media/media';
import Navbar from './components/navbar/navbar';
import Sidebar from './components/sidebar/sidebar';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Banner from './components/banner/banner';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Results from './pages/results/results';
import LayoutWithSidebar from './pages/layouts/layoutWithSidebar';
import LayoutWithNarrowSidebar from './pages/layouts/layoutWithNarrowSidebar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d70f64',
    },
    secondary: {
      main: '#4F4F4F',
    },
  },
});



function App(props) {
  return (
    <ThemeProvider theme={theme}>

      <Router>
          <div className="App">
          {/* <Banner>
            You have 2hr of processing time left. <a href="#" style={{color:'#fff'}}>Switch to premium plan.</a>
          </Banner> */}
          
          <Navbar/>
          
          <Routes>
              <Route path="/" element={<LayoutWithSidebar/>}>
                <Route index element={<Media/>}/>
              </Route>
              <Route path="/" element={<LayoutWithNarrowSidebar/>}>
                <Route path="/results" element={<Results/>}/>
              </Route>
          </Routes>
          </div>
        
      </Router>

      
    
    </ThemeProvider>

  );
}

export default App;
