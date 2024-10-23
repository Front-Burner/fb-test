import {FeatureType} from "@/types/documents/feature-type";
import {client} from "@/lib/client";
import {getFeatured} from "@/queries/feature-query";
import {useEffect, useState} from "react";
import SanityImage from "@/components/sanity-image";


/*
    Further Optimization:
    - Potential Edge case: if a user does not select a featured menu item or something similiar, then
    the way that this component is set up will not display ANY information. We could further optimize this by
    destructuring the way we handle the text info vs. the info for the SanityImage or we could refactor the way
    that the Sanity Image handles null and undefined sources (a placeholder image with the FB logo in case there is no image)
*/

const MenuItemFeature = () => {
    const [featuredItem, setFeaturedItem] = useState<FeatureType>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchFeaturedItem = async () => {
            try {
                const response = await client.fetch(getFeatured)
                setFeaturedItem(response[0]["featuredItem"])
                return response

            } catch (e: any) {
                console.error("Error: ", e)
            }
        }
        fetchFeaturedItem().then((res) => {
            setFeaturedItem(res[0]["featuredItem"]);
            setIsLoading(false);
        })
    }, [])

    if (isLoading) {
        return (
            <div>Featured item goes here...</div>
        )
    } else {
        return (

            <div>
                <div className={'text-2xl'}>
                    This week's feature:
                </div>
                <div className={"text-3xl font-bold text-center"}>
                    {featuredItem?.title}
                </div>
                <SanityImage source={featuredItem!.image}
                             alt={featuredItem!.image.alt}
                             width={200}
                             height={200}
                             componentIndex={1}
                             role='none'
                             sizes={`(min-width: 1024px) 1024px, 100vw`}/>
                <div>${featuredItem?.price}</div>
                <div className={"w-32 truncate overflow-hidden ..."}>{featuredItem?.description}</div>
            </div>
        )
    }
}
export default MenuItemFeature
