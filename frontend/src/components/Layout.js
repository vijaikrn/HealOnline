import { Button } from 'antd/es/radio'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import './layout.css'
function Layout({ children }) {
    const [collapsed, setCollapsed] = useState(false)
    const { user } = useSelector((state) => state.user)
    const location = useLocation()
    const userMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-smile-line'
        },
        {
            name: 'Appointments',
            path: '/appointments',
            icon: 'ri-shield-cross-line'
        },
        {
            name: 'Book a Doc',
            path: '/book',
            icon: 'ri-calendar-check-line'
        },
        {
            name: 'profile',
            path: '/profile',
            icon: 'ri-user-line'
        },
        {
            name: 'Logout',
            path: '/logout',
            icon: 'ri-logout-box-line'
        }
    ]

    const adminMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-smile-line'
        },
        {
            name: 'Users',
            path: '/users',
            icon: 'ri-shield-cross-line'
        },
        {
            name: 'Doctors',
            path: '/doctors',
            icon: 'ri-calendar-check-line'
        },
        {
            name: 'profile',
            path: '/profile',
            icon: 'ri-user-line'
        },
        {
            name: 'Logout',
            path: '/logout',
            icon: 'ri-logout-box-line'
        }
    ]

    const menuToBeRendered = (user && user.isAdmin)  ? adminMenu : userMenu
    return (
        <div className='main '>
            <div className='d-flex layout'>
                <div className={`${collapsed ? 'collapsed-sidebar' : 'sidebar'}`}>
                    <div className='sidebar-header'>
                        {!collapsed && <h3>HEAL-ONLINE</h3>}
                        {collapsed && <h3>H-O</h3>}
                    </div>
                    <div className='menu'>
                        {menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path
                            return <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                <i className={menu.icon}></i>
                                {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                            </div>
                        })}
                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                        {collapsed ? (
                            <i className="ri-menu-line header-action-icon" onClick={() => setCollapsed(true)}></i>)
                            : (<i className="ri-close-line close-icon" onClick={() => setCollapsed(true)}></i>
                            )}
                        <div className='d-flex align-items-center px-3'>
                            <i className="ri-notification-3-line header-action-icon mr-2"></i>
                            <Link className='anchor' to='/profile'>{user && user.name}</Link>
                        </div>
                    </div>
                    <div className='body'>
                        {children}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Layout