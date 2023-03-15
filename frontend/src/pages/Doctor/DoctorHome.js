import { Button } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function DoctorHome() {
    const {doctor}  = useSelector((state) => state.doctor)
    const navigate = useNavigate()
    console.log(doctor);
    return (
        <>
        <div class='flex items-center justify-center min-h-screen from-[#F9F5F3] via-[#F9F5F3] to-[#F9F5F3]  px-2'  style={{backgroundColor:"#28808c"}}>
            <div class='w-full max-w-md  mx-auto bg-white rounded-3xl shadow-xl overflow-hidden'>
                <div class='max-w-md mx-auto'>
                  <div class='h-[270px]' style={{backgroundImage: 'url("https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg")',backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}>
                   </div>
                  <div class='p-4 sm:p-6'>
                    <p class='font-bold text-gray-700 text-[18px] leading-7 mb-1'>Welcome {doctor?.name}</p>
                    <div class='flex flex-row'>
                    { doctor?.hasApplied===true?( <p class='text-[#3C3C4399] text-[17px] mr-2 '>Applied for providing service in  </p>):null}
                      <p class='text-[17px] font-bold text-[#0FB478]'>{doctor?.specialization}</p>
                    </div>
                  { doctor?.hasApplied===true?(<p class='text-[#7C7C80] font-[15px] mt-2'>Your application status is {doctor?.status}</p>):null }
        
        
                    <div className="d-flex justify-content-center mt-6">
        {doctor?.hasApplied===true?null:(<Button onClick={()=>navigate("/doctor")} className="primary-button" htmlType="submit">
          Apply for Doctor
        </Button>)}
      </div>
                    
                  </div>
                </div>
            </div>
        </div> </>
    )
}

export default DoctorHome