export function formatDateRange(startDate: Date, endDate: Date){

    const startDateString = startDate.toISOString().split('T')[0];
    const endDateString = endDate.toISOString().split('T')[0];

    return `${startDateString}:${endDateString}`
}