
import { useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    turnstile?: any;
  }
}

const TurnstileWidget = ({ siteKey, onSuccess }: { siteKey: string, onSuccess: (token: string) => void }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (window.turnstile) {
      setLoaded(true)
    } else {
      const script = document.createElement("script")
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"
      script.async = true
      script.onload = () => setLoaded(true)
      document.head.appendChild(script)
    }
  }, [])

  useEffect(() => {
    if (loaded && ref.current && window.turnstile) {
      window.turnstile.render(ref.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          onSuccess(token)
        },
      })
    }
  }, [loaded])

  return (<>
    <div ref={ref}></div>
  </>
  )
}

export default TurnstileWidget
