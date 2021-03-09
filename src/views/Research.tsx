import React, { ChangeEvent } from 'react'
import { Alert, Button, Col, Input, Label, Row, Spinner } from 'reactstrap'
import api from '../services/api'

interface Props {}
interface State {
    feedAt: null,
    food: string | null
    foodKind: string | null
    foodAmount: number | null
    where: string | null
    howManyDucks: number | null
    error?: string | null
    success?: string | null
    loading: boolean
}

export default class Research extends React.Component<Props, State> {
    state: Readonly<State> = {
        loading: false,
        feedAt: null,
        food: null,
        foodKind: null,
        foodAmount: null,
        where: null,
        howManyDucks: null,
    }

    setField(e: ChangeEvent<HTMLInputElement>, field: string) {
        let value = e.currentTarget.value

        if(field === 'foodAmount' || field === 'howManyDucks') {
            value = value.replace(/\D/g, '')
        }

        this.setState({
            ...this.state,
            [field]: value,
            error: null,
            success: null
        })
    }

    setSuccess(success: string) {
        this.setState({ success })
    }

    setError(error: string) {
        this.setState({ error })
    }

    reset() {
        this.setState({
            feedAt: null,
            food: null,
            foodKind: null,
            foodAmount: null,
            where: null,
            howManyDucks: null,
            error: null,
            loading: false
        });
    }

    save() {
        if(!this.state || !this.state.feedAt || !this.state.food || !this.state.foodKind || !this.state.foodAmount || !this.state.where || !this.state.howManyDucks) {
            this.setError('Please, fill all the fields')
        } else {
            if(this.state.foodAmount <= 0) {
                this.setError('Food amount cannot be 0')
            } else if(this.state.howManyDucks <= 0) {
                this.setError('Ducks amount cannot be 0')
            } else {
                this.setState({ error: null, success: null, loading: true })

                api.post('/save', {
                    feed_at: this.state.feedAt,
                    food: this.state.food,
                    food_kind: this.state.foodKind,
                    food_amount: this.state.foodAmount,
                    where: this.state.where,
                    how_many_ducks: this.state.howManyDucks
                })
                    .then((res: any) => {
                        if(res.data) {
                            this.setSuccess('Data registered successfully')
                            this.reset()
                        } else {
                            this.setError('Something happened on save. Try again later.')
                            this.setState({ loading: false })
                        }
                    })
                    .catch((err: any) => {
                        this.setError(err)
                        this.setState({ loading: false })
                    })
                    .finally(() => {
                        this.reset()
                    })
            }
        }
    }

    render() {
        const { loading, feedAt, food, foodKind, foodAmount, where, howManyDucks, error, success } = this?.state || {}

        if(loading) {
            return (
                <Row>
                    <Col xs={12} className="text-center">
                        <Spinner color="dark" />
                    </Col>
                </Row>
            )
        }

        return (
            <Row>
                {success ? (
                    <Col xs={12}>
                        <Alert color="success" isOpen={true}>
                            {success}
                        </Alert>
                    </Col>
                ) : null}

                {error ? (
                    <Col xs={12}>
                        <Alert color="danger" isOpen={true}>
                            {error}
                        </Alert>
                    </Col>
                ) : null}
                <Col xs={12} className="mb-3">
                    <Label>Feed at</Label>
                    <Input type="datetime-local" value={feedAt || ''} onChange={(e) => this.setField(e, 'feedAt')}/>
                </Col>
                <Col xs={12} className="mb-3">
                    <Label>Food</Label>
                    <Input value={food || ''} onChange={(e) => this.setField(e, 'food')} />
                </Col>
                <Col xs={12} className="mb-3">
                    <Label>Food Kind</Label>
                    <Input value={foodKind || ''} onChange={(e) => this.setField(e, 'foodKind')} />
                </Col>
                <Col xs={12} className="mb-3">
                    <Label>Food Amount</Label>
                    <Input value={foodAmount || ''} onChange={(e) => this.setField(e, 'foodAmount')} />
                </Col>
                <Col xs={12} className="mb-3">
                    <Label>Location</Label>
                    <Input value={where || ''} onChange={(e) => this.setField(e, 'where')} />
                </Col>
                <Col xs={12} className="mb-3">
                    <Label>How many Ducks?</Label>
                    <Input value={howManyDucks || ''} onChange={(e) => this.setField(e, 'howManyDucks')} />
                </Col>
                <Col xs={12}>
                    <Button size="lg" color="success" className="mr-3" onClick={() => this.save()}>Save</Button>
                    <Button size="sm" color="danger" onClick={() => this.reset()}>Cancel</Button>
                </Col>
            </Row>
        )
    }
}