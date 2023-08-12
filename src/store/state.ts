import { Reviewer } from "@/model";
import { MovieReview } from "@/model/movieReview";

export interface State {
    movies: MovieReview[] | null;
    loading: 'idle'| 'pending'| 'succeded'| 'failed';
    errorMessage: string | null;
    reviewer: Reviewer | null;
}

export const initialState: State = {
    movies: null,
    errorMessage: null,
    loading: 'idle',
    reviewer: null
}