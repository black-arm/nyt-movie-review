import { MovieQuery } from ".";

export interface MovieFormProps {
    movieFormSubmit?(query: MovieQuery): void;
}