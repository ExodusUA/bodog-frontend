import { Navigate } from 'react-router-dom';

interface AuthCheckProps {
    children: React.ReactNode
}

const AuthCheck = ({ children }: AuthCheckProps) => {

    const token = localStorage.getItem('token')

    if (!token) {
        return <Navigate to="/login" />
    }

    return <>{children}</>

}

export default AuthCheck