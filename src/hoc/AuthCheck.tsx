import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

interface AuthCheckProps {
    children: React.ReactNode
}

const AuthCheck = ({ children }: AuthCheckProps) => {

    const token = localStorage.getItem('token')

    if (!token) {
        return <Navigate to="/login" />
    } else {
        
        const decoded = jwtDecode<any>(token!)

        if (decoded.exp * 1000 < Date.now()) {
            return <Navigate to="/login" />
        }
    }

    return <>{children}</>

}


export default AuthCheck