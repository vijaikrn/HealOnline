import React from 'react'
import Layout from '../components/Layout'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import { setUser } from '../redux/userSlice';
function Notifications() {
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const markAllAsSeen = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post("http://localhost:5000/api/user/mark-all-notifications-as-seen", { userId: user._id }, {
                headers: {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                dispatch(setUser(response.data.data))
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error("Something went wrong")
        }
    }

    const deleteAll = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post("http://localhost:5000/api/user/delete-all-notifications", { userId: user._id }, {
                headers: {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                dispatch(setUser(response.data.data))
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error("Something went wrong")
        }
    }
    return (
        <Layout>
            <h1 className='page-title'>Notifications</h1>
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="Unseen" title="Unseen" key={0}>
                    <div className='d-flex justify-content-end'>
                        <h1 className='anchor'onClick={()=>markAllAsSeen()}>Mark all as seen</h1>
                    </div>
                    {user?.unseenNotifications.map((notification) => (
                        <div className='card p-2' onClick={() => navigate(notification.onClickPath)}>
                            <div className='card-text'>{notification.message}</div>
                        </div>
                    )

                    )}
                </Tab>
                <Tab eventKey="Seen" title="Seen" key={1}>
                    <div className='d-flex justify-content-end'>
                        <h1 className='anchor'onClick={()=>deleteAll()}>Delete all</h1>

                    </div>
                    {user?.seenNotifications.map((notification) => (
                        <div className='card p-2' onClick={() => navigate(notification.onClickPath)}>
                            <div className='card-text'>{notification.message}</div>
                        </div>))}
                </Tab>

            </Tabs>
        </Layout>
    )
}

export default Notifications