export async function safeFetch(url) {
  console.log(url)
  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.warn(`⚠️ safeFetch: Failed ${url} - Status ${res.status}`);
      return null;  // return safe value
    }

    return await res.json();
  } catch (err) {
    console.error(`❌ safeFetch error for ${url}:`, err);
    return null;  // return safe value when server is down
  }
}
