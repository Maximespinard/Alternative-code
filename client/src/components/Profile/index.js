import React, { useState, useEffect } from 'react'

const Profile = (props) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        setUser(props.location.state.user)
    }, [])
    return (
        <div>
            profile
        </div>
    )
}

export default Profile
