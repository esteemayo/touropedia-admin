import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthRoute from 'utils/AuthRoute';
import ProtectedRoute from 'utils/ProtectedRoute';
import {
  CommentList,
  Home,
  Layout,
  Login,
  NewTour,
  NewUser,
  NotFound,
  SharedLayout,
  Tour,
  TourList,
  User,
  UserList,
} from 'pages/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path='/' element={<SharedLayout />}>
          <Route
            index
            element={
              <AuthRoute>
                <Home />
              </AuthRoute>
            }
          />
          <Route path='users' element={<Layout />}>
            <Route
              index
              element={
                <AuthRoute>
                  <UserList />
                </AuthRoute>
              }
            />
            <Route
              path=':id'
              element={
                <AuthRoute>
                  <User />
                </AuthRoute>
              }
            />
            <Route
              path='new-user'
              element={
                <AuthRoute>
                  <NewUser />
                </AuthRoute>
              }
            />
          </Route>
          <Route path='tours' element={<Layout />}>
            <Route
              index
              element={
                <AuthRoute>
                  <TourList />
                </AuthRoute>
              }
            />
            <Route
              path=':id'
              element={
                <AuthRoute>
                  <Tour />
                </AuthRoute>
              }
            />
            <Route
              path='new-tour'
              element={
                <AuthRoute>
                  <NewTour />
                </AuthRoute>
              }
            />
          </Route>
          <Route
            path='comments'
            element={
              <AuthRoute>
                <CommentList />
              </AuthRoute>
            }
          />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
