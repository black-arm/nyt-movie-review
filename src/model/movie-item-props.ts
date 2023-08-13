import { MovieReview } from "./movieReview";

export interface MovieItemProps {
    movie: MovieReview;
    clickReviewer?(reviewer: string): void;
}