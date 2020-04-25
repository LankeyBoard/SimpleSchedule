import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export const UserManager = () => {

    const [isCreateNew, setIsCreateNew] = useState(false)
    const [users, setUsers] = useState([])
    const [form, setForm] = useState({
        first:      '',// required field
        last:       '',// required field
        userid:     '',// required field
        email:      '',// required field
        password:   '',// required field
        isAdmin:    false,
    })
    
    const changeForm = (field, value) => {
        const formRefCopy = {...form}
        formRefCopy[field] = field === 'isAdmin' ? !form.isAdmin : value
        setForm(formRefCopy)
    }    

    const getFormValidationStatus = () => form.first.length > 0 
        && form.last.length > 0 
        && form.userid.length > 0
        && form.email.length > 0
        && form.password.length > 0;

    useEffect(() => {
        Axios.get('/api/users/getUsers').then((axiosResponse) => {
            setUsers(axiosResponse.data.users)
        }).catch((axiosError) => {
            console.dir(axiosError)
        })
    }, [])

    const createRows = (rowCollection, isHeader, userId) => {
        let rowClassName = "flexbox-centeredEvenly flexbox-wrapper"
        if(isHeader) rowClassName += " tableHeadBorder"
        else rowClassName += " BG_OnHover pointerCursor"
        let k = ''
        if(!userId) k = 'none'
        return <div className={rowClassName}>
            {rowCollection.map(o => <div key={k+"_"+o} className="flexbox-item text-alignedCenter">{o}</div>)}
        </div>
    }

    const renderTableHeader = () => createRows(
        ['UserId', 'Name', 'Role'], 
        true
    )

    const renderTableRows = () =>  users.map(i => createRows(
        [i.userid,`${i.firstName} ${i.lastName}`,i.role],
        false, 
        i._id
    ))


    const getActionText = () => isCreateNew ? "Manage Users" : "Create New"

    const renderUserTable = () => <>{renderTableHeader()}{renderTableRows()}</>

    const submitForm = e => {
        e.preventDefault()
        if(getFormValidationStatus()) {
            const request = {
                ...form,
                firstName:  form.first,
                lastName:   form.last,
                role:       form.isAdmin ? 'manager' : 'regular'
            }
            // ----('form is valid...')----//
            Axios.post('/api/users',request).then((apiResponse)=>{
                debugger
            }).catch((axiosError) => {
                debugger
            })
        }
    }

    const renderCreateUserForm = () => {
        return <form id="userForm" onSubmit={submitForm}>
        <div className="pad-5 flexbox-wrapper mb-30">
            <div className="pad-5 flexbox-item">
                <label htmlFor="fn">
                    First Name
                </label>
            </div>
            <input required id="fn" className="pad-5 flexbox-item" type="text" value={form.first} onChange={(e) => changeForm('first',e.target.value)}/>
            <div className="pad-5 flexbox-item text-alignedCenter">
                <label htmlFor="ln">
                    Last Name
                </label>
            </div>
            <input required id="ln" className="pad-5 flexbox-item" type="text" value={form.last} onChange={(e) => changeForm('last',e.target.value)}/>
        </div>
        <div className="pad-5 flexbox-wrapper mb-30">
            <div className="pad-5 flexbox-item">
                <label htmlFor="uid">
                    Userid
                </label>
            </div>
            <input required id="uid" className="pad-5 flexbox-item" type="text" value={form.userid} onChange={(e) => changeForm('userid',e.target.value)}/>
            <div className="pad-5 flexbox-item text-alignedCenter">
                <label htmlFor="email">
                    Email
                </label>
            </div>
            <input required id="email" className="pad-5 flexbox-item" type="email" value={form.email} onChange={(e) => changeForm('email',e.target.value)}/>
        </div>
        <div className="pad-5 flexbox-wrapper mb-30">
            <div className="pad-5 flexbox-item">
                <label htmlFor="password">
                    Password
                </label>
            </div>
            <input required id="password" className="pad-5 flexbox-item" type="text" value={form.password} onChange={(e) => changeForm('password',e.target.value)}/>
            <div className="pad-5 flexbox-item text-alignedCenter">
                <label htmlFor="IsManager">
                    Is Manager
                </label>
            </div>
            <input id="IsManager" className="pad-5 flexbox-item" type="checkbox" checked={form.isAdmin} onChange={(e) => changeForm('isAdmin')}/>
        </div>
    
        <div className="pad-5 flexbox-wrapper mb-30 justifyContent-flexEnd">
            <input className="manageUserCreateButton pointerCursor" value="Submit" type="submit"/>
        </div>
        </form>
    }

    let wrapperClassName = "flexbox-item flexbox-wrapper tableWidth vertical"
    if(isCreateNew) wrapperClassName += ' space-evenly'

    return <div className="flexbox-item flexbox-wrapper vertical">
        <div className="flexbox-wrapper userDialog" style={{justifyContent: "flex-end"}}>
            <div onClick={()=>setIsCreateNew(!isCreateNew)} className="animated manageUserCreateButton BG_OnHover pointerCursor">{getActionText()}</div>
        </div>
        
        <div className={wrapperClassName}>
            {isCreateNew ? renderCreateUserForm() : renderUserTable()}
        </div>

    </div>
}