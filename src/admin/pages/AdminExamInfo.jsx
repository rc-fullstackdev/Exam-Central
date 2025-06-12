import React, { useEffect, useState } from 'react'
import { useExamDeleteTimeMutation, useGetExamTimeQuery } from '../../redux/api/admin.api'
import { format } from "date-fns"
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import { toast } from "react-toastify"
import { useDispatch } from 'react-redux'
import { useAdminLogoutMutation } from '../../redux/api/auth.api'

const AdminExamInfo = () => {

    const navigate = useNavigate()

    const { data, isError: examIsError, error: examError } = useGetExamTimeQuery()
    const [logout] = useAdminLogoutMutation()
    const [timeDelete, { isSuccess, isLoading, isError, error }] = useExamDeleteTimeMutation()

    useEffect(() => {
        if (isSuccess) {
            toast.error("Exam Time Delete Successfully")
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error(error.data.message || "unable to delete")
        }
    }, [isError])

    useEffect(() => {
        if (examIsError && examError.status === 401) {
            logout()
        }
    }, [examIsError])

    if (isLoading) {
        return <Loading />
    }


    return <>
        <div className='container-fluid'>
            {
                data && <table className='table table-bordered text-center table-hover table-light'>
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Exam Name</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Exam Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        data.result.map((item, index) => <tbody key={item._id}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.examName}</td>
                                <td>{format(new Date(item.startTime), 'hh:mm a')}</td>
                                <td>{format(new Date(item.endTime), 'hh:mm a')}</td>
                                <td>{format(item.examDate, "EEEE dd MMMM yyyy")}</td>
                                <td>
                                    <button type="button" onClick={() => navigate("/admin/exam-time", { state: item })} class="btn btn-warning me-3 text-light"><i class="bi bi-pencil-fill"></i></button>
                                    <button type="button" onClick={() => timeDelete(item._id)} class="btn btn-danger me-3"><i class="bi bi-trash-fill"></i></button>
                                    <button type="button" onClick={() => navigate(`/admin/exam-dashboard/${item._id}`)} class="btn btn-primary"><i class="bi bi-eye-fill"></i></button>
                                </td>
                            </tr>
                        </tbody>)
                    }
                </table>
            }
        </div >
    </>
}

export default AdminExamInfo