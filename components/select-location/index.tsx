'use client'
import {LocationType} from '@/types/documents/location-type'
import {LocationContext, LocationContextType} from '@/context/location'
import {
    useContext,
    useEffect,
    useState,
} from 'react'
import {useCookies} from 'react-cookie'
import HandleLocation from '@/helpers/handle-location'
import SanityImage from "@/components/sanity-image";

interface ILocationSelect extends Array<LocationType> {
} // update to LocationType

const LocationMenuSelect = ({locations}: { locations: ILocationSelect }) => {
    const [cookies, setCookie] = useCookies(['nearestLocation'])
    const [locationSelect, setLocationSelect] = useState<string>()

    /* === LOCATION LOGIC === */

    const {locationContext, updateLocationContext} = useContext(
        LocationContext,
    ) as LocationContextType

    const handleLocationSelectChange = (e: React.FormEvent<HTMLOptionElement>) => {
        setLocationSelect(e.target.value)
    }
    const handleUpdateLocationContext = (location: LocationType) => {
        HandleLocation(location, updateLocationContext, setCookie)
    } // change to LocationType

    useEffect(() => {
        // handleUpdateLocationContext(locationContext)
    }, [locationContext])
    /* === END LOCATION LOGIC === */
    return (
        <div className={"mx-2 p-2"}>
            <div>Preferred location:</div>
            <select value={locationSelect} onChange={handleLocationSelectChange}>
                <option></option>
                {locations.map((location, index) => (
                    <option key={index} value={location.title}>{location.title}</option>
                ))}
            </select>
            <div className={"flex flex-col p-2"}>
                Your Location:
                {locations.filter((location) => location.title === locationSelect).map((location) => (
                    <div key={location.title} className={"flex flex-col"}>
                        <div className={"italic"}>
                            {location.title}
                        </div>
                        <SanityImage source={location.image}
                                     alt={location.image.alt}
                                     width={100}
                                     height={100}
                                     componentIndex={1}
                                     role='none'
                                     sizes={`(min-width: 1024px) 1024px, 100vw`}
                        />
                        <div className={"truncate ... w-32"}>
                            {location.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LocationMenuSelect
