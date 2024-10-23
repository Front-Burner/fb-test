export const UpdateLocation = (
    location: any,
) => {
    //deleted the seo.description. Not sure if that is needed to be grabbed from seo??
    const newLocationState = {
        _id: location._id,
        title: location.title,
        description: location.description,
    }

    return newLocationState
}
