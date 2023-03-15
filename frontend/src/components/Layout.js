import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./layout.css";
import { Badge } from "antd";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const {doctor} = useSelector((state)=> state.doctor)
  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-smile-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-hospital-fill",
    },
    {
      name: "Book a Doc",
      path: "/book",
      icon: "ri-calendar-check-line",
    },
    {
      name: "profile",
      path: "/profile",
      icon: "ri-user-line",
    },
    {
      name: "Doctor Registration",
      path: "/apply-doctor",
      icon: "ri-shield-cross-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-smile-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-shield-cross-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
      icon: "ri-calendar-check-line",
    },
    {
      name: "profile",
      path: "/profile",
      icon: "ri-user-line",
    },
  ];
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-smile-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-hospital-fill",
    },
    {
      name: "Book a Doc",
      path: "/book",
      icon: "ri-calendar-check-line",
    },
    {
      name: "profile",
      path: "/profile",
      icon: "ri-user-line",
    },
    {
      name: "Doctor Registration",
      path: "/apply-doctor",
      icon: "ri-shield-cross-line",
    },
  ];

  // const menuToBeRendered = (user && user.isAdmin)?adminMenu:userMenu
  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
  return (
    <div className="main ">
      <div className="d-flex layout">
        <div className={`${collapsed ? "collapsed-sidebar" : "sidebar"}`}>
          <div className="sidebar-header">
            {!collapsed && <h3>HEAL-ONLINE</h3>}
            {collapsed && <h3>H-O</h3>}
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${isActive && "active-menu-item"
                    }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
          </div>
          <div
            className={`d-flex menu-item`}
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            <i className="ri-logout-box-line"></i>
            {!collapsed && <Link to="/login">Logout</Link>}
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-line header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            ) : (
              <i
                className="ri-close-line close-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="d-flex align-items-center px-4">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-line header-action-icon px-3"></i>
              </Badge>





              <span className="visually-hidden">unread messages</span>


              <Link className="anchor1" to="/profile">
                {user && user.name}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
