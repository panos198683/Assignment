
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import LoginPage from './components/LoginPage';
import JokeForm from './components/JokeForm'
import { AuthProvider } from './components/auth';

function App() {
  return (
    <AuthProvider>
    <Routes>
        <Route path="/" element={<LoginPage/>}>
        </Route>
        <Route path="/home" element={<Home/>}>
        </Route>
        <Route path="/jokes/:id" element={<JokeForm isEditing={true}/>}>
        </Route>
        <Route path="/jokes/new" element={<JokeForm isEditing={false}/>}>
        </Route>
    </Routes>
    </AuthProvider>
  );
}

export default App;
