import { useState, useEffect, useCallback } from 'react'
import { getAllCountries } from '../services/api'

const ITEMS_PER_PAGE = 8

export function useCountries() {
  const [allCountries, setAllCountries] = useState([])
  const [displayed, setDisplayed] = useState([])
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    getAllCountries()
      .then((res) => {
        const sorted = [...res.data].sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        )
        setAllCountries(sorted)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    let filtered = allCountries

    if (region) {
      filtered = filtered.filter((c) => c.region === region)
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      filtered = filtered.filter(
        (c) =>
          c.name?.common?.toLowerCase().includes(q) ||
          c.capital?.[0]?.toLowerCase().includes(q)
      )
    }

    const total = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
    setTotalPages(total)

    const safePage = Math.min(page, total)
    const start = (safePage - 1) * ITEMS_PER_PAGE
    setDisplayed(filtered.slice(start, start + ITEMS_PER_PAGE))
  }, [allCountries, search, region, page])

  const handleSearch = useCallback((val) => {
    setSearch(val)
    setPage(1)
  }, [])

  const handleRegion = useCallback((val) => {
    setRegion(val)
    setPage(1)
  }, [])

  return {
    countries: displayed,
    loading,
    error,
    search,
    setSearch: handleSearch,
    region,
    setRegion: handleRegion,
    page,
    setPage,
    totalPages,
  }
}
