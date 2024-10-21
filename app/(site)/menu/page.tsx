// Tools
import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'

// Queries
import { getPage } from '@/sanity/queries/page-query'
import { getGlobal } from '@/sanity/queries/global-query'
import { getNavigation } from '@/sanity/queries/navigation-query'
import { getMenu } from '@/sanity/queries/menu-query'

// Types
import { PageType } from '@/types/documents/page-type'

// Components
import { urlFor } from '@/components/sanity-image/url'
import MenuPage from '@/components/pages/menu-page'
import { metadata as defaultMetadata } from '@/app/(site)/layout';

export const generateMetadata = async (): Promise<Metadata> => {
	const page = await client.fetch<PageType>(getPage, { slug: 'menu' });
	const global = await client.fetch(getGlobal);

	// Use default metadata as a fallback
	const result = {
		title: page.seo?.metaTitle
			? `${page.seo.metaTitle} | ${global[0].seo.metaTitle}`
			: page.title
			? `${page.title} | ${global[0].seo.metaTitle}`
			: defaultMetadata.title,
		description: page.seo?.metaDesc
			? page.seo.metaDesc
			: defaultMetadata.description,
		image: page.seo?.shareGraphic?.asset.url
			? page.seo.shareGraphic.asset.url
			: defaultMetadata.openGraph.images[0].url,
	};

	return {
		metadataBase: defaultMetadata.metadataBase,
		title: result.title,
		description: result.description,
		openGraph: {
			title: result.title,
			description: result.description,
			images: [
				{
					url: urlFor(result.image).width(1920).height(630).url(),
					width: 1920,
					height: 630,
					alt: result.title,
				},
			],
		},
		alternates: {
			canonical: `/${page.slug}`,
		},
	};
};


export default async function Home() {
	const global = await client.fetch(getGlobal)
	const navigation = await client.fetch(getNavigation)
  const menu = await client.fetch(getMenu)

	return (
		<MenuPage
			global={global}
			navigation={navigation}
      menu={menu}
		/>
	)
}