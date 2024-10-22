import {FeatureType} from "@/types/documents/feature-type";
import {client} from "@/lib/client";
import {getFeatured} from "@/queries/feature-query";
import {useEffect, useState} from "react";
import SanityImage from "@/components/sanity-image";


interface FeatureProps {
    feature: FeatureType
}

const MenuItemFeature = () => {
    const [featuredItem, setFeaturedItem] = useState<FeatureType>()

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
        fetchFeaturedItem().then(res => setFeaturedItem(res[0]["featuredItem"]))

    }, [])

    return (

        <div>
            This week's feature
            <div className={"text-3xl font-bold"}>
                {featuredItem?.title}
            </div>
            {/*<SanityImage source={featuredItem!.image}*/}
            {/*             alt={featuredItem!.image.alt}*/}
            {/*             width={200}*/}
            {/*             height={200}*/}
            {/*             componentIndex={1}*/}
            {/*             role='none'*/}
            {/*             sizes={`(min-width: 1024px) 1024px, 100vw`} />*/}
            <div>${featuredItem?.price}</div>
            <div className={"w-32 truncate overflow-hidden ..."}>{featuredItem?.description}</div>
        </div>


    )
}
export default MenuItemFeature
