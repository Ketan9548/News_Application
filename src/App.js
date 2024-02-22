import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

const Category = (props) =>  {
    const { category } = props;
    return (
      <div>
        <h2 className='text-center'>{category}</h2>
        <News setProgress={props.setProgress} pageSize = {8} country="in" category={category} />
      </div>
    );
};

const App = () => {
  const pageSize = 8;
  const [progress, setProgress] = useState(0)

    return (
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div>
                <Navbar />
                <LoadingBar
                  height={2}
                  color='#f11946'
                  progress={progress}
                />
                <Outlet />
              </div>
            }
          >
            <Route exact index element={<News setProgress={setProgress} pageSize={pageSize} country="in" category="technology" />} />
            <Route path="/business" element={<Category setProgress={setProgress} pageSize={pageSize} key="business" category="business" />} />
            <Route path="/entertainment" element={<Category setProgress={setProgress}  pageSize={pageSize} key="entertainment" category="entertainment" />} />
            <Route path="/general" element={<Category setProgress={setProgress}  pageSize={pageSize} key="general" category="general" />} />
            <Route path="/health" element={<Category setProgress={setProgress}  pageSize={pageSize} key="health" category="health" />} />
            <Route path="/science" element={<Category setProgress={setProgress}  pageSize={pageSize} key="science" category="science" />} />
            <Route path="/sports" element={<Category setProgress={setProgress}  pageSize={pageSize} key="sports" category="sports" />} />
          </Route>
        </Routes>
      </Router>
    );
};

export default App;
