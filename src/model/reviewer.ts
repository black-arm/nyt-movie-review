export interface Reviewer {
    display_name?: string;
    sort_name?: string;
    status?: string;
    bio?: string;
    seo_name?: string;
    multimedia?: {
      resource?: MultimediaResource;
    };
  }

export interface MultimediaResource {
    type?: string;
    src?: string;
    height?: number;
    width?: number;
    credit?: string;
  }