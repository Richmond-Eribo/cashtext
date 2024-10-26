import type { APIRoute } from "astro"
import { z } from "zod"

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
  role: z.string().min(2, "Role must be at least 2 characters"),
})

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json()

    // Validate the data
    const validatedData = waitlistSchema.parse(data)

    // Send to Zapier webhook
    const response = await fetch("YOUR_ZAPIER_WEBHOOK_URL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    })

    if (!response.ok) {
      throw new Error("Failed to submit to waitlist")
    }

    return new Response(
      JSON.stringify({
        message: "Successfully joined waitlist",
      }),
      {
        status: 200,
      }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          message: "Validation failed",
          errors: error.errors,
        }),
        {
          status: 400,
        }
      )
    }

    return new Response(
      JSON.stringify({
        message: "Failed to join waitlist",
      }),
      {
        status: 500,
      }
    )
  }
}
