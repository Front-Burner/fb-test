//import { LocationType } from '../types/documents/location-type'
import { UpdateLocation } from './update-location'

const HandleLocation = (
	location: any, // change to LocationType
	updateLocationContext: any,
	setCookie: any,
) => {
	const newLocation = UpdateLocation(location)
	const expDate = new Date()
	// we set the cookie to expire in 5 minutes and recheck — request by DSV
	expDate.setMinutes(expDate.getMinutes() + 5)
	updateLocationContext(newLocation)
	setCookie(
		'nearestLocation',
		newLocation,
		{
			path: '/',
			expires: expDate,
		},
	)
}

export default HandleLocation
