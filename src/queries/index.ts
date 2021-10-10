export const HOME_CITY: string = `
    id,
    name,
    images
`

export const CITY: string = `
    id,
    name,
    images,
    description,
    population,
    area,
    currency,
    languages,
    state,
    country,
    is_covid_free,
    is_hill_station,
    is_beach_station,
    restaurants (
        id,
        name,
        images,
        likes (
           count
        ),
        price_for_two
    )
`

export const RESTAURANTS: string = `
    id,
    name,
    restaurants (
        id,
        name,
        images,
        likes (
           count
        ),
        price_for_two
    )
`

export const RESTAURANT: string = `
    id,
    name,
    images,
    cuisines,
    likes (
       count
    ),
    price_for_two,
    is_vegan,
    address,
    city:city_id (
        id,
        name
    )
`
