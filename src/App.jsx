import React, { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"

const AdminLayout = lazy(() => import("./admin/components/AdminLayout"))
const AdminLogin = lazy(() => import("./admin/pages/AdminLogin"))
const AdminProtected = lazy(() => import("./admin/components/AdminProtected"))
const AdminExamInfo = lazy(() => import("./admin/pages/AdminExamInfo"))
const AdminExamDashboard = lazy(() => import("./admin/pages/AdminExamDashboard"))
const AdminExamTime = lazy(() => import("./admin/pages/AdminExamTime"))
const AdminExam = lazy(() => import("./admin/pages/AdminExam"))
const UserResults = lazy(() => import("./admin/pages/UserResults"))


const Layout = lazy(() => import("./users/components/Layout"))
const Register = lazy(() => import("./users/pages/UserRegister"))
const Login = lazy(() => import("./users/pages/UserLogin"))
const UserProtected = lazy(() => import("./users/components/UserProtected"))
const UserExamInfo = lazy(() => import("./users/pages/UserExamInfo"))
const UserExam = lazy(() => import("./users/pages/UserExam"))
const Success = lazy(() => import("./users/pages/Sucess"))
const Result = lazy(() => import("./users/pages/Result"))


const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return <>
    <h1>{error.message}</h1>
    <button onClick={resetErrorBoundary}>Retry</button>
  </>
}

const App = () => {

  const location = useLocation()
  const Fallback = () => <h1>Loading...</h1>

  const PUBLIC_ROUETS = [
    { path: "/", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "examinfo", element: <UserProtected><UserExamInfo /></UserProtected> },
    { path: "userexam/:examId", element: <UserProtected><UserExam /></UserProtected> },
    { path: "result", element: <UserProtected><Result /></UserProtected > },
    { path: "usersuccess", element: <Success /> },
  ]

  const ADMIN_ROUETS = [
    { path: "", element: <AdminExamInfo /> },
    { path: "exam-dashboard/:examId", element: <AdminExamDashboard /> },
    { path: "exam-time", element: <AdminExamTime /> },
    { path: "admin-exam", element: <AdminExam /> },
    { path: "user-results", element: <UserResults /> },
  ]

  return <>

    <ToastContainer />

    <Routes>
      <Route path='/' element={<><Layout /></>}>
        {
          PUBLIC_ROUETS.map((item, index) => <Route
            key={index}
            path={item.path}
            element={
              <ErrorBoundary resetKeys={[location.pathname]} FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Fallback />}>
                  {item.element}
                </Suspense>
              </ErrorBoundary>
            }
          />)
        }
      </Route>

      <Route path='/admin-login' element={<AdminLogin />} />

      <Route path='/admin' element={<AdminProtected><AdminLayout /></AdminProtected>}>
        {
          ADMIN_ROUETS.map((item, index) => <Route
            key={index}
            index={index === 0}
            path={index !== 0 ? item.path : ""}
            element={
              <ErrorBoundary resetKeys={[location.pathname]} FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Fallback />}>
                  {item.element}
                </Suspense>
              </ErrorBoundary>
            }
          />)
        }
      </Route>
    </Routes >
  </>
}

export default App