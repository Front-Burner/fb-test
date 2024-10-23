import { groq } from 'next-sanity'


export const getLocation = groq`*[_type == "location"]{
  _id,
  _createdAt,
  _updatedAt,
  title,
  _type,
  _rev,
  description,
  image {
    alt,
    caption,
    crop {
      ...
    },
    hotspot {
      x,
      y
    },
    asset-> {
      ...,
      url,
      metadata
    },
  },
}`
