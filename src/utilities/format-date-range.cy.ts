import { formatDateRange } from "./format-date-range"

describe('format date range', () => {

    const startDate = new Date('2023-04-05')
    const endDate = new Date('2023-05-05')

    it('convert date to string', () => {

        const result = formatDateRange(startDate, endDate)
        expect(result).to.equal('2023-04-05:2023-05-05')
    })
})