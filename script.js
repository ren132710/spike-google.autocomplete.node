/*
 * spike
 * -works consistently with parcel v2
 * -eliminates process not defined error
 * -effectively hides api key from github
 */

import { Loader } from '@googlemaps/js-api-loader'

const loader = new Loader({
  apiKey: process.env.API_KEY,
  libraries: ['places'],
})

console.log('loader: ', loader)

const placeSearch = document.querySelector('[data-place-search]')
const placeResult = document.querySelector('[data-place-result]')

loader.load().then((google) => {
  const autocomplete = new google.maps.places.Autocomplete(placeSearch, {
    types: ['geocode'],
    fields: ['place_id', 'name', 'geometry.location'],
  })
  console.log('autocomplete: ', autocomplete)

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    if (!place.geometry) return
    placeResult.textContent = JSON.stringify(place, null, 2)
    const location = place.name
    const lat = place.geometry.location.lat()
    const long = place.geometry.location.lng()
    const maps_place_id = place.place_id
    console.log('params: ', location, lat, long, maps_place_id)
  })
})
