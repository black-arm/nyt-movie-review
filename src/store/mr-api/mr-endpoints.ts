
class MrEndpoints {
    baseUrl = 'https://api.nytimes.com/svc/movies/v2'
    movieReviewEndpoint = `${this.baseUrl}/reviews/search.json`;
    reviewerEndpoint = (reviewer: string) => `${this.baseUrl}/critics/${reviewer}.json`
}

export const mrEndpoints = new MrEndpoints();