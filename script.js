const btn = document.getElementById("nextBtn")
const img = document.getElementById("meme")
const caption = document.getElementById("caption")
const statusEl = document.getElementById("status")
const subreddits = [
  "darkacademia",
  "dankmemes",
  "literaturememes",
  "classicalmemes",
  "chaoticacademia",
  "ProgrammerHumor",
  "codinghumor",
  "techhumor",
]
async function loadMeme() {
  try {
    btn.disabled = true
    statusEl.textContent = "Loading meme…"
    img.hidden = true
    caption.hidden = true

    const randomSub = subreddits[Math.floor(Math.random() * subreddits.length)]

    const res = await fetch(`https://meme-api.com/gimme/${randomSub}`, {
      cache: "no-store",
    })
    if (!res.ok) throw new Error("Network error")

    const data = await res.json()
    const imageUrl = data.url
    const title = data.title || "Random Meme"

    const preload = new Image()
    preload.onload = () => {
      img.src = imageUrl
      img.alt = title
      caption.textContent = `${title} (${data.subreddit})`

      img.hidden = false
      caption.hidden = false
      statusEl.textContent = ""
      btn.disabled = false
    }
    preload.onerror = () => {
      throw new Error("Image failed to load")
    }
    preload.referrerPolicy = "no-referrer"
    preload.src = imageUrl
  } catch (err) {
    console.error(err)
    statusEl.textContent = "Could not load meme. Try again."
    btn.disabled = false
  }
}

// First meme on page load + next button
document.addEventListener("DOMContentLoaded", loadMeme)
btn.addEventListener("click", loadMeme)
