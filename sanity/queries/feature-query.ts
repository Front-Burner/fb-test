import {groq} from 'next-sanity'

export const getFeatured = groq`*[_type == 'page' && title == 'Home']{
_id,
_type,
_rev,
seo,
title,
_updatedAt,
slug,
featuredItem->{
    ...,
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
},
}`
