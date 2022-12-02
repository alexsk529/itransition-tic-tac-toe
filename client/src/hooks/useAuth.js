import {useState, useEffect, useCallback, useContext} from 'react';


export const useAuth = () => {
    const [name, setName] = useState('');
    const [isLogin, setIsLogin] =useState(false)

    const enter = useCallback((name) => {
        setName(name);
        sessionStorage.setItem('userData', JSON.stringify({
            name
        }))
        if (name) setIsLogin(true)
    }, [])

    const exit = () => {
        setName(null);
        sessionStorage.removeItem('userData');
        setIsLogin(false)
    }

    useEffect(()=> {
        const data = JSON.parse(sessionStorage.getItem('userData'));
        if (data && data.name) {
            enter(data.name)
        }
    }, [enter])

    return {enter, exit, name, setName, isLogin}
}