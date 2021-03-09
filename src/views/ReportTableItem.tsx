import React from 'react'
import ReportModel from '../models/report_model'

type Props = {
    report: ReportModel
}

const ReportTableItem = ({report}: Props) => (
    <>
        <td>{report.feedAt.toLocaleString()}</td>
        <td>{report.food}</td>
        <td>{report.foodKind}</td>
        <td>{report.foodAmount}</td>
        <td>{report.where}</td>
        <td>{report.howManyDucks}</td>
    </>
)

export default ReportTableItem