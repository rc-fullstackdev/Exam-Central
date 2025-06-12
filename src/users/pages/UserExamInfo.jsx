import React from 'react'
import { format } from "date-fns"
import { useExamTimeQuery } from '../../redux/api/user.api'
import { useNavigate } from 'react-router-dom'

const UserExamInfo = () => {

    const navigate = useNavigate()
    const { data } = useExamTimeQuery()


    // if (!examData || !examData.startTime || !examData.endTime) {
    //     return res.status(500).json({ message: "Exam time not set by admin" });
    // }

    // const currentTime = new Date().getTime();
    // const startTime = new Date(examData.startTime).getTime();
    // const endTime = new Date(examData.endTime).getTime();

    // // Before exam starts
    // if (currentTime < startTime) {
    //     const formattedDate = new Date(examData.examDate).toLocaleDateString();
    //     const formattedTime = new Date(examData.startTime).toLocaleTimeString();
    //     return res.status(401).json({
    //         message: `⏳ Exam starts on ${formattedDate} at ${formattedTime}`,
    //     });
    // }

    // // After exam ends
    // if (currentTime > endTime) {
    //     return res.status(401).json({
    //         message: `⏰ Exam time is over! You can't login now.`,
    //     });
    // }

    return <>
        <div className='container-fluid'>
            {/* {
                data && data.examData.map(item => <div class="card" key={item._id}>
                    <div class="card-header">header</div>
                    <div class="card-body">body</div>
                    <div class="card-footer">footer</div>
                </div>)
            } */}
            <div className='row gap-5 justify-content-center'>
                {
                    data && data.setTime.map(item => <div className='col-md-5 mb-5'>
                        <div class="card text-center">
                            <div class="card-header bg-primary text-light"><span className='fs-5'>{item.examName}</span></div>
                            <div class="card-body">
                                <p>Start Time : {format(new Date(item.startTime), 'hh:mm a')}</p>
                                <p>End Time : {format(new Date(item.endTime), 'hh:mm a')}</p>
                                <p>Date : {format(item.examDate, "EEEE dd MMMM yyyy")}</p>
                            </div>
                            <div class="card-footer d-flex justify-content-between align-content-center">
                                <button onClick={() => navigate(`/userexam/${item._id}`)} type="button" class="btn btn-primary w-100">View Questions</button>
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>
        </div >
    </>
}

export default UserExamInfo