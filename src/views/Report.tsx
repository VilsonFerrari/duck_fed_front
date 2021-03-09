import React from 'react'
import { Col, Pagination, PaginationItem, PaginationLink, Row, Spinner } from 'reactstrap';
import ReportModel from '../models/report_model';
import api from '../services/api';
import ReportTable from './ReportTable';

interface State {
    results?: ReportModel[] | null
    limit?: number
    offset?: number
    total?: number
    p: number
    lastPage?: number
    order: {
        table: string
        direction: string
    }
}

interface Props {}

export default class Report extends React.Component<Props, State> {
    state: Readonly<State> = {
        p: 1,
        order: {
            table: 'feed_at',
            direction: 'desc'
        }
    }

    componentDidMount() {
        this.fetch()
    }

    componentDidUpdate(_: Props, prevState: State) {
        if(prevState.p !== this.state.p || prevState.order !== this.state.order) {
            this.setState({ results: null })
            this.fetch()
        }
    }

    fetch() {
        const { p, order } = this.state

        api.get('/reports', {
            params: { p, order }
        })
            .then(({ data }: any) => {
                if(data) {
                    let results: ReportModel[] = data.result.map((d: any) => new ReportModel(d))
                    
                    this.setState({ 
                        p: parseInt(data.page),
                        total: data.total,
                        offset: data.offset,
                        limit: data.limit,
                        lastPage: data.lastPage,
                        results
                    })
                }
            })

    }

    setOrder(table: string) {
        this.setState({
            order: {
                table,
                direction: this.state.order.table === table && this.state.order.direction === 'desc' ? 'asc' : 'desc'
            }
        })
    }

    setPage(p: number) {
        if(p < 1) {
            p = 1
        }

        if(this.state.lastPage && p > this.state?.lastPage) {
            p = this.state.lastPage
        }

        this.setState({ p: p as number })
    }

    render() {
        const { results, p, lastPage, total, limit, offset } = this.state

        return (
            <Row>
                {results ? (
                    <>
                        <Col xs={12}>
                            <ReportTable reports={results} setOrder={(table: string) => this.setOrder(table)} />
                        </Col>
                        <Col xs={12} md={6}>
                            {typeof offset === 'number' && typeof limit === 'number' ? (
                                <p>Showing {offset + 1} to {limit * p > (total || 0) ? total : limit * p} results of {total}.</p>
                            ) : null}
                        </Col>
                        <Col xs={12} md={6} className="d-flex justify-content-end">
                            <Pagination>
                                <PaginationItem>
                                    <PaginationLink first href="#" onClick={() => this.setPage(1)} />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink previous href="#" onClick={() => this.setPage(p - 1)} />
                                </PaginationItem>
                                {[...Array(lastPage)].map((_, i: number) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink href="#" onClick={() => this.setPage(i + 1)}>
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationLink next href="#" onClick={() => this.setPage(p + 1)} />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink last href="#" onClick={() => this.setPage(lastPage || 1)} />
                                </PaginationItem>
                            </Pagination>
                        </Col>
                    </>
                ) : (
                    <Col xs={12}>
                        <p className="text-center">
                            <Spinner color="dark" />
                        </p>
                    </Col>
                )}
            </Row>
        );
    }
}