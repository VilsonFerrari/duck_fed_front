
type TReport = {
    id: string
    where: string
    how_many_ducks: number
    food: string
    food_kind: string
    food_amount: number
    feed_at: Date
    created_at: Date
}

export default class ReportModel {
    id: string
    where: string
    howManyDucks: number
    food: string
    foodKind: string
    foodAmount: number
    feedAt: Date
    createdAt: Date

    constructor(values: TReport) {
        this.id = values.id
        this.where = values.where
        this.howManyDucks = values.how_many_ducks
        this.food = values.food
        this.foodKind = values.food_kind
        this.foodAmount = values.food_amount
        this.feedAt = new Date(values.feed_at)
        this.createdAt = new Date(values.created_at)
    }
}