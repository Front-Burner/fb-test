export const UpdateLocation = (
    location: any,
) => {
    const newLocationState = {
        _id: location._id,
        title: location.title,
        description: location.description,
    }

    return newLocationState
}
