export type ImageResult = {
  searchParameters: {
    q: string;
    gl: string;
    type: "images";
    engine: "google";
    num: number;
  },
  images: {
    title: string;
    imageUrl: string;
    imageWidth: number;
    imageHeight: number;
    thumbnailUrl: string;
    thumbnailWidth: number;
    thumbnailHeight: number;
    source: string;
    domain: string;
    link: string;
    googleUrl: string;
    position: number;
  }[];
  credits: number;
}

export type SearchResult = {
  searchParameters: {
    q: string;
    gl: string;
    hl: string;
    autocorrect: boolean;
    page: number;
    type: "search";
  },
  knowledgeGraph: {
    title: string;
    type: string;
    website: string;
    imageUrl: string;
    description: string;
    descriptionSource: string;
    descriptionLink: string;
    attributes: {
      [key: string]: string;
    }
  },
  organic: {
    title: string;
    link: string;
    snippet: string;
    sitelinks?: {
      title: string;
      link: string;
    }[];
    date?: string;
    attributes?: {
      [key: string]: string | number | boolean | null
    };
    position?: number
  }[];
  peopleAlsoAsk?: {
    question: string;
    snippet?: string;
    title?: string;
    link?: string
  }[];
  relatedSearches?: {
    query: string
  }[]
}
