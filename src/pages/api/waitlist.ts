import type { APIRoute } from "astro"
import { z } from "zod"
import { rateLimit } from "express-rate-limit"
import { google } from "googleapis"

// export const prerender = false
const waitlistSchema = z.object({
  phone: z.number({ message: "must be a valid phone number" }),
  // .min(10, "phone number too short")
  // .max(14, "phone number too long"),
})

const credentials = {
  type: import.meta.env.GOOGLE_SERVICE_ACCOUNT_TYPE,
  project_id: import.meta.env.GOOGLE_PROJECT_ID,
  private_key_id: import.meta.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: import.meta.env.GOOGLE_PRIVATE_KEY,
  client_email: import.meta.env.GOOGLE_CLIENT_EMAIL,
  client_id: import.meta.env.GOOGLE_CLIENT_ID,
  auth_uri: import.meta.env.GOOGLE_AUTH_URI,
  token_uri: import.meta.env.GOOGLE_TOKEN_URI,
  auth_provider_x509_cert_url: import.meta.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: import.meta.env.GOOGLE_CLIENT_CERT_URL,
  universe_domain: import.meta.env.GOOGLE_UNIVERSE_DOMAIN,
}

// Authenticate Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
})
const sheets = google.sheets({ version: "v4", auth })
const sheetID = import.meta.env.GOOGLE_SHEET_ID

export const POST: APIRoute = async ({ request }) => {
  // --- validation
  const data = await request.formData()
  const phoneNumber = data.get("phone")

  const validatedData = waitlistSchema.safeParse({
    phone: Number(phoneNumber),
  })

  if (!validatedData.success) {
    return new Response(
      JSON.stringify({
        message: "Invalid phone number",
        errors: validatedData.error.errors,
      }),
      {
        status: 400,
      }
    )
  }
  // ---

  try {
    const res = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetID,
      range: "Sheet1!A:A", // Adjust range if necessary
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[phoneNumber]],
      },
    })

    console.log(res)
    return new Response(
      JSON.stringify({
        message: "Successfully joined the waitlist",
      }),
      { status: res.status }
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: "Failed to join waitlist",
        error: error,
      }),
      {
        status: 400,
      }
    )
  }

  //
}

// export const POST: APIRoute = async ({ request, clientAddress }) => {
//   const data = await request.formData()
//   const phoneNumber = data.get("phone")
//   console.log(request, data)

//   return new Response(
//     JSON.stringify({
//       message: "ji",
//     })
//   )
// }
