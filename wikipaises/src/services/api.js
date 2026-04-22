import axios from 'axios'

const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 8000,
})

export const getAllCountries = () =>
  api.get('/all?fields=name,capital,region,subregion,population,flags,cca3,languages,currencies,area')

export const getCountryByCode = (code) =>
  api.get(`/alpha/${code}`)

export default api
