const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function apiPost<T = any>(endpoint: string, data: any): Promise<T> {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || `HTTP ${response.status}`)
  }

  return response.json()
}

export async function apiGet<T = any>(endpoint: string): Promise<T> {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || `HTTP ${response.status}`)
  }

  return response.json()
}

// Export PDF - returns blob for file download
export async function exportPdf(resume: any, template: string, options?: any): Promise<Blob> {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_BASE_URL}/api/pdf/export`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ resume, template, options }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to export PDF' }))
    throw new Error(error.error || 'Failed to export PDF')
  }

  return response.blob()
}

// Legacy placeholder functions for compatibility
export async function placeholderGet<T = any>(): Promise<T | null> {
  return null
}

export async function placeholderPost<T = any>(): Promise<T | null> {
  return null
}
