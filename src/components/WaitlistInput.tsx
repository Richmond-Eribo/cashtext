import { useRef, useState, type FormEvent } from "react"
import Button from "./ui/Button.tsx"

const WaitlistInput = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    const formData = new FormData(e.currentTarget)

    // Uncomment and modify as needed:
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        body: formData,
      })
      const result = await response.json()
      setLoading(false)
      inputRef.current!.value = ""
      setsuccessMessage(result.message)
    } catch (error: any) {
      //   alert(error)
      setLoading(false)
      inputRef.current!.value = ""
      setErrorMessage(error.errors.message)
    }
  }

  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setsuccessMessage] = useState("")

  return (
    <>
      <form id="waitlist" className="waitlist-input" onSubmit={handleSubmit}>
        <input
          data-activate="false"
          className="ghost-input"
          type="tel"
          placeholder="Enter your phone number"
          name="phone"
          ref={inputRef}
        />
        <Button disabled={loading}>
          {loading ? "Sending" : "Join Waitlist"}
        </Button>
      </form>
      <div className="form-error" data-error="role">
        {errorMessage && errorMessage}
      </div>

      <div className="form-success" data-error="role">
        {successMessage && successMessage}
      </div>

      <style>{`
        .waitlist-input {
          display: flex;
          background-color: var(--Base-White);
          max-width: 100%;
          min-width: 200px;
          padding: var(--Spacing-spacing-sm, 8px)
            var(--Spacing-spacing-md, 12px);
          align-items: center;
          gap: var(--Spacing-spacing-sm, 8px);
          border-radius: 37px;
          border: 1px solid var(--color-border, #e4e4e7);
          background: var(--color-bg, #fff);
          box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
        }

        input {
          flex-grow: 1;
          min-width: 150px;
          border: none;
          background: transparent;
          outline: none;
        }

        .form-error {
        width: 100%;
          color: red;
          font-size: 12px;
          margin-top: 10px;
          text-align: center;
        }

         .form-success {
         width: 100%;
          color: gray;
          font-size: 12px;
          margin-top: 10px;
          text-align: center;
        }

        button {
          flex-shrink: 0;
        }
      
         button:disabled {
        background-color: gray;
        }
      `}</style>
    </>
  )
}

export default WaitlistInput
