import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchNotifications, selectAllNotifications } from '../features/notifications/notificationsSlice'

export const Navbar = () => {

    const dispatch = useDispatch()
    const fetchNewNotifications = () => {
        dispatch(fetchNotifications())
    }

    const notifications = useSelector(selectAllNotifications)
    const numUnreadNotifications = notifications.filter(n => !n.read).length  // omit component contents  
    let unreadNotificationsBadge
    if (numUnreadNotifications > 0) {
        unreadNotificationsBadge = (<span className="badge">{numUnreadNotifications}  {unreadNotificationsBadge}</span>)
    }

    return (
        <nav>
            <section>
                <h1>Redux Essentials Example</h1>

                <div className="navContent">
                    <div className="navLinks">
                        <Link to="/">Posts</Link>
                        <Link to="/users">Users</Link>
                        <Link to="/notifications">Notifications {unreadNotificationsBadge}</Link>
                    </div>
                    <button className="button" onClick={fetchNewNotifications}>  Refresh Notifications </button>
                </div>
            </section>
        </nav>
    )
}
