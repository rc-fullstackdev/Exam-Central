import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import HandleClasses from '../components/HandleClasses'
import { useCreateExamMutation, useGetPaperNameQuery, useUpdateExamMutation } from '../../redux/api/admin.api'
import Loading from '../components/Loading'
import { toast } from "react-toastify"
import { Link, useLocation, useNavigate } from 'react-router-dom'

const AdminExam = () => {

    const navigate = useNavigate()

    const location = useLocation()
    const updateData = location.state
    const examData = updateData?.exam


    const [examId, setExamId] = useState(null)

    const [examCreate, { isSuccess, isLoading, isError, error }] = useCreateExamMutation()
    const [examUpdate, { isSuccess: updateIsSuccess, isLoading: updateIsLoading, isError: updateIsError, error: updateError }] = useUpdateExamMutation()
    const { data } = useGetPaperNameQuery()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            question: updateData ? updateData.question : "",
            firstoption: updateData ? updateData.firstoption : "",
            secondoption: updateData ? updateData.secondoption : "",
            thirdoption: updateData ? updateData.thirdoption : "",
            fourthoption: updateData ? updateData.fourthoption : "",
            correctAnswer: updateData ? updateData.correctAnswer : "",
            marks: updateData ? updateData.marks : "",
        },
        validationSchema: yup.object({
            question: yup.string().required(),
            firstoption: yup.string().required(),
            secondoption: yup.string().required(),
            thirdoption: yup.string().required(),
            fourthoption: yup.string().required(),
            correctAnswer: yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            if (updateData) {
                examUpdate({ exam: examData, ...values, _id: updateData._id })
            } else {
                examCreate({ exam: examId, ...values })
            }
            resetForm()
        }
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Exam Create Successfully")
            navigate(`/admin/exam-dashboard/${examId}`)
        }
    }, [isSuccess])

    useEffect(() => {
        if (updateIsSuccess) {
            toast.success("Exam Update Successfully")
            navigate(`/admin/exam-dashboard/${examData} `)
        }
    }, [updateIsSuccess])


    useEffect(() => {
        if (isError) {
            toast.error(error.data.message || "unable to Create")
        }
    }, [isError])

    useEffect(() => {
        if (updateIsError) {
            toast.error(updateError.data.message || "unable to Update")
        }
    }, [updateIsError])

    if (isLoading || updateIsLoading) {
        return <Loading />
    }

    return <>

        <select class="container form-select mb-5 w-25" onChange={e => setExamId(e.target.value)}>
            <option value="" selected disabled>Select Exam Name</option>
            {
                data && data.result.map(item =>
                    <option
                        value={item._id}
                        id={item._id}>
                        {item.examName}
                    </option>)
            }
        </select>

        <div class="container mb-5">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <div class="card">
                        <div class="card-header bg-primary text-light fs-5 text-center">Exam Panel</div>
                        <form onSubmit={formik.handleSubmit} autoComplete='off'>
                            <div class="card-body">
                                <div>
                                    <label for="qusetion" class="form-label">Enter Question</label>
                                    <input
                                        {...formik.getFieldProps("question")}
                                        type="text"
                                        class={HandleClasses(formik, "question")}
                                        id="question"
                                        placeholder="Enter Your Question"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.question}</div>
                                </div>

                                <div>
                                    <label for="firstoption" class="form-label">Enter First Answer</label>
                                    <input
                                        {...formik.getFieldProps("firstoption")}
                                        type="text"
                                        class={HandleClasses(formik, "firstoption")}
                                        id="firstoption"
                                        placeholder="Enter First Answer"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.firstoption}</div>
                                </div>

                                <div>
                                    <label for="secondoption" class="form-label">Enter Second Answer </label>
                                    <input
                                        {...formik.getFieldProps("secondoption")}
                                        type="text"
                                        class={HandleClasses(formik, "secondoption")}
                                        id="secondoption"
                                        placeholder="Enter Second Answer"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.secondoption}</div>
                                </div>

                                <div>
                                    <label for="thirdoption" class="form-label">Enter Third Answer</label>
                                    <input
                                        {...formik.getFieldProps("thirdoption")}
                                        type="text"
                                        class={HandleClasses(formik, "thirdoption")}
                                        id="thirdoption"
                                        placeholder="Enter Third Answer"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.thirdoption}</div>
                                </div>

                                <div>
                                    <label for="fourthoption" class="form-label">Enter Fourth Answer</label>
                                    <input
                                        {...formik.getFieldProps("fourthoption")}
                                        type="text"
                                        class={HandleClasses(formik, "fourthoption")}
                                        id="fourthoption"
                                        placeholder="Enter Fourth Answer"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.fourthoption}</div>
                                </div>


                                <div>
                                    <label for="correctAnswer" class="form-label">Enter Correct Answer</label>
                                    <input
                                        {...formik.getFieldProps("correctAnswer")}
                                        type="text"
                                        class={HandleClasses(formik, "correctAnswer")}
                                        id="correctAnswer"
                                        placeholder="Enter Correct Answer"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.correctAnswer}</div>
                                </div>


                                <div>
                                    <label for="marks" class="form-label">Enter Marks</label>
                                    <input
                                        {...formik.getFieldProps("marks")}
                                        type="text"
                                        class={HandleClasses(formik, "marks")}
                                        id="marks"
                                        placeholder="Enter Marks"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.marks}</div>
                                </div>

                                {
                                    updateData
                                        ? <button type="submit" class="btn btn-warning text-light w-100 mt-3">Update</button>
                                        : <button type="submit" class="btn btn-primary w-100 mt-3">Submit</button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AdminExam