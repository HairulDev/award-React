import { Loading } from 'components/atoms';
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';

const Logout = () => {
    const history = useHistory();

    useEffect(() => {
        localStorage.clear();
        setTimeout(() => {
            history.push("/auth");
        }, 1000)
    }, []);


    return (
        <Loading />
    )
}

export default Logout