import type { FormEvent } from "react"
import Button from "./ui/Button.tsx"

const WaitlistInput = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    console.log(formData.get("phone"))

    // Uncomment and modify as needed:
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        body: formData,
      })
      const result = await response.json()
      console.log(result)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <form id="waitlist" className="waitlist-input" onSubmit={handleSubmit}>
        <input
          data-activate="false"
          className="ghost-input"
          type="tel"
          placeholder="Enter your phone number"
          name="phone"
        />
        <Button>Join Waitlist</Button>
      </form>
      <div className="form-error" data-error="role"></div>

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
          color: red;
          font-size: 12px;
          margin-top: 4px;
        }

        button {
          flex-shrink: 0;
        }
      `}</style>
    </>
  )
}

export default WaitlistInput
