import { useState, useEffect, useCallback } from 'react'
import { fetchGallery, buildUrl, getFullUrl, getThumbUrl } from '../services/cloudinary'

const FRAMES_PER_PAGE = 8

export function useGallery() {
  const [allImages, setAllImages] = useState([])
  const [page, setPage]           = useState(0)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  useEffect(() => {
    fetchGallery()
      .then(resources => {
        const formatted = resources.map(r => ({
          id: r.asset_id,
          publicId: r.public_id,
          url:      buildUrl(r.public_id, { width: 800, height: 600 }),
          thumbUrl: getThumbUrl(r.public_id),
          fullUrl:  getFullUrl(r.public_id),
          aspectRatio: r.width && r.height ? r.width / r.height : 1.5,
          title: r.public_id.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        }))
        setAllImages(formatted)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError('Could not load gallery.')
        setLoading(false)
      })
  }, [])

  const totalPages = Math.ceil(allImages.length / FRAMES_PER_PAGE)
  const pageImages = allImages.slice(page * FRAMES_PER_PAGE, (page + 1) * FRAMES_PER_PAGE)

  const goNext = useCallback(() => setPage(p => Math.min(p + 1, totalPages - 1)), [totalPages])
  const goPrev = useCallback(() => setPage(p => Math.max(p - 1, 0)), [])

  return {
    images: pageImages,
    allImages,
    loading,
    error,
    page,
    totalPages,
    totalCount: allImages.length,
    hasNext: page < totalPages - 1,
    hasPrev: page > 0,
    goNext,
    goPrev,
  }
}