'use client'

// Tools

// Types
import {GlobalType} from '@/types/documents/global-type'
import {NavigationType} from '@/types/documents/navigation-type'
import {LocationType} from "@/types/documents/location-type";

// Components
import Header from '@/components/header'
import SanityImage from "@/components/sanity-image";


interface PageProps {
    global: GlobalType[]
    navigation: NavigationType[]
    location: LocationType[]
}


const LocationsPage: React.FC<PageProps> = ({
                                                global,
                                                navigation,
                                                location
                                            }) => {
    return (
        <>
            <Header navigation={navigation} global={global}/>
            <main className='flex  min-h-[calc(100vh-328px)] w-full flex-col items-center justify-center'>
                <h1 className='text-7xl font-bold'>Locations</h1>
                {location.map((location, index) => (
                    <div key={location.title}
                         className={'flex flex-col bg-gray-100 m-auto w-1/3 h-fit p-2 rounded-3xl shadow-2xl'}>
                        <div className={'text-2xl text-center font-bold'}>
                            {location.title}:
                        </div>
                        <SanityImage
                            source={location.image}
                            alt={location.image.alt}
                            width={200}
                            height={200}
                            componentIndex={1}
                            role='none'
                            sizes={`(min-width: 1024px) 1024px, 100vw`}
                        />
                        {location.description}
                    </div>
                ))}
            </main>
        </>
    );
};

export default LocationsPage;
