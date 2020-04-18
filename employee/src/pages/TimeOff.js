import React, { useEffect } from 'react';
import Axios from 'axios'

export default () => {

    useEffect(() => {
        Axios.get('/ping').then((axiosResponse) => {
            debugger
            console.log(axiosResponse.data)
        }).catch((AxiosError) => {
            console.log(AxiosError)
        })
    },
    [])

    return <>
        <h1>Time Off Request Form</h1>
        <p>A time off request form will display below</p>
    </>
}
