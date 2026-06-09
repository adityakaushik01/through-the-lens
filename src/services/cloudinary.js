const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

export async function fetchGallery() {
  const res = await fetch(`https://res.cloudinary.com/${CLOUD_NAME}/image/list/aditya-photography.json`)
  if (!res.ok) throw new Error('Failed to fetch gallery')
  const data = await res.json()
  return data.resources
}

export function buildUrl(publicId, options = {}) {
  const {
    width = 800,
    height = 600,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
  } = options
  const transforms = `w_${width},h_${height},c_${crop},q_${quality},f_${format}`
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`
}

export function getThumbUrl(publicId) {
  return buildUrl(publicId, { width: 400, height: 300, quality: 'auto:low' })
}

export function getFullUrl(publicId) {
  return buildUrl(publicId, { width: 1920, height: 1080, quality: 'auto:best', crop: 'limit' })
}

export function getFrameSize(aspectRatio, maxWidth = 2.4) {
  if (aspectRatio >= 1) {
    const w = Math.min(maxWidth, 2.4)
    return [w, parseFloat((w / aspectRatio).toFixed(3))]
  } else {
    const h = Math.min(maxWidth * 1.3, 2.6)
    return [parseFloat((h * aspectRatio).toFixed(3)), h]
  }
}