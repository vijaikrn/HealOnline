import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import {toast} from 'react-hot-toast'
import axios from "axios";
import { Table,Button, Modal } from "antd";
import moment from "moment";

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [reason, setReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
 
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dispatch = useDispatch();
  const getDoctorsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("http://localhost:5000/api/admin/get-all-doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.data.success) {
        setDoctors(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeDoctorStatus = async (record, status,reason) => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
        "http://localhost:5000/api/admin/change-doctor-account-status",
        { doctorId: record._id, userId: record.userId, status: status ,experience:reason },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getDoctorsData();
      }
    } catch (error) {
      toast.error('Error changing doctor account status');
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getDoctorsData();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.name} 
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "mobile",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record , text) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <h1
              className="anchor"
              onClick={() => changeDoctorStatus(record, "approved")}
            >
              Approve
            </h1>
          )}
          {record.status === "approved" && (
            <h1
              className="anchor"
              onClick={() => changeDoctorStatus(record, "blocked")}
            >
              Block
            </h1>
          )}
          {record.status === "blocked" && (
            <h1
              className="anchor"
              onClick={() => changeDoctorStatus(record, "approved")}
            >
              Unblock
            </h1>
          )}
        </div>
      ),
    },
    {
      title: "Decline",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            
            <>
      <Button type="primary" style={{backgroundColor:"#28808c"}} onClick={showModal}>
        Decline
      </Button>
      <Modal title="Reason for decline" cancelButtonProps={{ style: { backgroundColor: '#28808c',color:"white" } }} okButtonProps={{ style: { backgroundColor: '#28808c' } }} open={isModalOpen} onOk={() => {changeDoctorStatus(record, "declined",reason);setIsModalOpen(false);}}
 onCancel={handleCancel}>
   
        <input type="text" style={{width:"100%"}} placeholder="State the reason for decline" value={reason} onChange={handleReasonChange} />
      </Modal>
    </>
          )}
          
          
        </div>
      ),
    }
  ];
  return (
    <Layout>
      <h1 className="page-header">Doctors List</h1>
      <hr />
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
}

export default DoctorsList;
