
export interface MovieReview {
  display_title?: string;
  mpaa_rating?: string;
  critics_pick?: number;
  byline?: string;
  headline?: string;
  summary_short?: string;
  publication_date?: string | Date;
  opening_date?: string | Date;
  date_updated?: string | Date;
  link?: {
    type?: string;
    url?: string;
    suggested_link_text?: string;
  } | undefined | null;
  multimedia?: {
    type?: string;
    src?: string;
    height?: number;
    width?: number;
  } | undefined | null;
}
