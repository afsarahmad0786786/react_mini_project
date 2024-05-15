import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Registration from './components/registration';
import LoginForm from './components/login';
import Home from './components/home';
import Quiz from './components/quiz';
import Weather from './components/weather';
import Movie from './components/movies';
import Ecommerce from './components/ecommerce';
import ProductList from './components/ecommerce/productList';
import ViewCarts from './components/ecommerce/viewCart';
import HomePage from './components/github/home';
import DetailsPage from './components/github/detailsPage';
import NotesApp from './components/notesapp/home';
import './assets/styles/global.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskManager from './components/task-manager/home';




function App() {

  return (
    <Router>
      <div>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#564F4E' }}>
          <h1 style={{ margin: 0, color: '#333', textAlign: 'center', width: '100%' }}>Mini Project</h1>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{ display: 'inline', margin: '0 10px' }}>
              <Link to="/">Home</Link>
            </li>
            <li style={{ display: 'inline', margin: '0 10px' }}>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="register" element={<Registration />} />
          <Route path="project/quiz" element={<Quiz />} />
          <Route path="project/weather" element={<Weather />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/project/movie" element={<Movie />} />
          <Route exact path="/project/ecommerce" element={<Ecommerce />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/products/cart" element={<ViewCarts />} />
          <Route path="/project/github" element={<HomePage />} />
          <Route path="/user/:username" element={<DetailsPage />} />
          <Route path="/project/notesapp" element={<NotesApp />} />
          <Route path="/project/task" element={<TaskManager />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
