import { getTokenWorkaround } from '@/app/auctions/authActions'

const baseUrl = process.env.API_URL

async function get(url: string) {
  const requestOptions = {
    method: 'GET',
    headers: await getHeaders(),
  }

  const response = await fetch(baseUrl + url, requestOptions)

  return await handleResponse(response)
}

async function getHeaders() {
  const token = await getTokenWorkaround()

  const headers = { 'Content-type': 'application/json' } as any

  if (token) {
    headers.Authorization = `Bearer ${token.access_token}`
  }

  return headers
}

async function post(url: string, body: {}) {
  const requestOptions = {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(body),
  }

  const response = await fetch(baseUrl + url, requestOptions)

  return await handleResponse(response)
}

async function put(url: string, body: {}) {
  const requestOptions = {
    method: 'PUT',
    headers: await getHeaders(),
    body: JSON.stringify(body),
  }

  const response = await fetch(baseUrl + url, requestOptions)

  return await handleResponse(response)
}

async function del(url: string) {
  const requestOptions = {
    method: 'DELETE',
    headers: await getHeaders(),
  }

  const response = await fetch(baseUrl + url, requestOptions)

  return await handleResponse(response)
}

async function handleResponse(response: Response) {
  const text = await response.text()

  let data

  try {
    data = JSON.parse(text)
  } catch (error) {
    data = text
  }

  if (response.ok) {
    return data || response.statusText
  } else {
    const error = {
      status: response.status,
      message:
        typeof data === 'string' && data.length > 0
          ? data
          : response.statusText,
      errors: data.errors,
      title: data.title,
    }

    return { error }
  }
}

export const fetchWrapper = {
  get,
  post,
  put,
  del,
}
