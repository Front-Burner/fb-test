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
    const [locationSelect, setLocationSelect] = useState<LocationType>()

    /* === LOCATION LOGIC === */

    const {locationContext, updateLocationContext} = useContext(
        LocationContext,
    ) as LocationContextType

    const handleLocationSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
        const selectedLocation = e.target.value
        const selectedOption = locations.find(option => option.title === selectedLocation)
        setLocationSelect(selectedOption)
        handleUpdateLocationContext(selectedOption)
    }
    const handleUpdateLocationContext = (location: LocationType) => {
        HandleLocation(location, updateLocationContext, setCookie)
    } // change to LocationType

    //I was trying to handle the context with this hook, but I instead implemented the context with the handleLocationSelect function
    // This useEffect is inactive
    useEffect(() => {
        // handleUpdateLocationContext(locationSelect)
    }, [locationContext])
    /* === END LOCATION LOGIC === */

    return (
        <div className={"mx-2 p-2"}>
            <div>Preferred Location: {locationContext?.title}</div>
            <select value={locationSelect?.title} onChange={handleLocationSelectChange}>
                <option></option>
                {locations.map((location) => (
                    <option key={location.title} value={location.title}>{location.title}</option>
                ))}
            </select>
            <div className={"flex flex-col p-2"}>
                Your Location:
                {locations.filter((location) => location.title == locationSelect?.title).map((location) => (
                    <div key={location.title} className={"flex flex-col"}>
                        <div className={"italic"}>
                            {location.title}
                        </div>
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
