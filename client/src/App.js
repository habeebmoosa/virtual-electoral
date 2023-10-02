import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { Registration } from './pages/auth/Registration';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { Profile } from './pages/dashboard/profile/Profile';
import { ProfileEdit } from './pages/dashboard/profile/ProfileEdit';
import { NotFound } from './pages/NotFound';
import { MyElection } from './pages/dashboard/create election/MyElection';
import { ViewMyElection } from './pages/dashboard/create election/ViewMyElection';
import { CreateCandidate } from './pages/dashboard/create election/CreateCandidate';
import { CreateElection } from './pages/dashboard/create election/CreateElection';
import { DashboardScreen } from './pages/dashboard/DashboardScreen';
import { MyJoinElection } from './pages/dashboard/join election/MyJoinElection';
import { JoinElection } from './pages/dashboard/join election/JoinElection';
import { ViewJoinElection } from './pages/dashboard/join election/ViewJoinElection';
import { Vote } from './pages/dashboard/join election/Vote';

export const App = () => {
  return (
    <div className='container'>
      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Registration />} />
        </Route>

        <Route path='/dashboard' element={<DashboardLayout />}>

          <Route index element={<DashboardScreen />} />

          <Route path='profile'>
            <Route index element={<Profile />} />
            <Route path='edit' element={<ProfileEdit />} />
          </Route>

          <Route path='joinelection'>
            <Route index element={<MyJoinElection/>} />
            <Route path='join' element={<JoinElection/>} />
            <Route path='view'>
              <Route index element={<ViewJoinElection/>} />
              <Route path='vote' element={<Vote/>} />
            </Route>
          </Route>

          <Route path='myelection'>
            <Route index element={<MyElection />} />
            <Route path='create' element={<CreateElection />} />
            <Route path='view' >
              <Route index element={<ViewMyElection />} />
              <Route path='edit' element={<h1>edit candidate</h1>} />
              <Route path='addcandidate' element={<CreateCandidate isEdit={false} />} />
              <Route path='editcandidate' element={<CreateCandidate isEdit={true} />} />
            </Route>
            <Route path='edit' element={<h1>edit</h1>} />
          </Route>

        </Route>

        <Route path='*' element={<NotFound />} />

      </Routes>
    </div>
  );
}
