'use client'

// Tools

// Types
import {GlobalType} from '@/types/documents/global-type'
import {NavigationType} from '@/types/documents/navigation-type'
// Components
import Header from '@/components/header'
import MenuItemFeature from "@/components/menu-item-feature";
import LocationMenuSelect from "@/components/select-location";
import {LocationType} from "@/types/documents/location-type";


interface PageProps {
    global: GlobalType[]
    navigation: NavigationType[]
    location: LocationType[]
}


const HomePage: React.FC<PageProps> = ({
                                           global,
                                           navigation,
                                           location
                                       }) => {
    return (
        <>
            <Header navigation={navigation} global={global}/>
            <LocationMenuSelect locations={location}/>
            <main className='flex  min-h-[calc(100vh-328px)] w-full flex-col items-center justify-center'>
                <h1 className='text-7xl font-bold'>Welcome</h1>
                <MenuItemFeature/>
            </main>
        </>
    );
};

export default HomePage;
