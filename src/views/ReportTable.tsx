import React from 'react'
import { Table } from 'reactstrap'
import ReportModel from '../models/report_model'
import ReportTableItem from './ReportTableItem'

type Props = {
    reports: ReportModel[],
    setOrder: Function
}

const ReportTable = ({reports, setOrder}: Props) => (
    <Table dark striped hover responsive>
        <thead>
            <tr>
                <th onClick={() => setOrder('feed_at')}>Date/Time</th>
                <th onClick={() => setOrder('food')}>Food</th>
                <th onClick={() => setOrder('food_kind')}>Food Kind</th>
                <th onClick={() => setOrder('food_amount')}>Food Amount</th>
                <th onClick={() => setOrder('where')}>Location</th>
                <th onClick={() => setOrder('how_many_ducks')}>Number of Ducks</th>
            </tr>
        </thead>
        <tbody>
            {reports.map((res: ReportModel, idx: number) => (
                <tr key={idx}>
                    <ReportTableItem report={res} />
                </tr>
            ))}
        </tbody>
    </Table>
)

export default ReportTable