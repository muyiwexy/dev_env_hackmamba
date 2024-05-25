import { NextRequest, NextResponse } from "next/server";
import { Pool } from "@neondatabase/serverless";

import zod from "zod";
import sqlstring from "sqlstring";

export const runtime = "edge";

const schema = zod.object({
  member_number: zod.string().min(5).max(12), // Adjust based on the typical length of member numbers
  created_at: zod.string(), // If this should be a date, consider using zod.date()
  name: zod.string().min(1, "Name is required").max(100, "Name is too long"),
  email: zod
    .string()
    .email("Invalid email format")
    .min(5, "Email is too short")
    .max(100, "Email is too long"),
  phone_number: zod
    .string()
    .min(7, "Phone number is too short")
    .max(15, "Phone number is too long"),
  gender: zod
    .string()
    .min(1, "Gender is required")
    .max(6, "Gender is too long"), // Assume "male" or "female" or similar
  zone: zod.string().min(1, "Zone is required").max(50, "Zone is too long"),
  service_unit: zod
    .string()
    .min(1, "Service Unit is required")
    .max(50, "Service Unit is too long"),
  conference_shirt: zod
    .string()
    .min(1, "Conference shirt size is required")
    .max(5, "Conference shirt size is too long"), // Assuming sizes like S, M, L, XL
  fee_payment: zod
    .string()
    .min(1, "Fee Payment info is required")
    .max(50, "Fee Payment info is too long"),
  paid: zod.boolean(),
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// export async function GET(req: NextRequest) {

//   return NextResponse.json(
//     { now },
//     {
//       status: 200,
//     }
//   );
// }

export async function POST(req: any) {
  try {
    const data = await req.json();

    const {
      member_number,
      created_at,
      name,
      email,
      phone_number,
      gender,
      zone,
      service_unit,
      conference_shirt,
      fee_payment,
      paid,
    } = schema.parse(data);

    const sql = sqlstring.format(
      `
    INSERT INTO user_details (
      member_number,
      created_at,
      name,
      email,
      phone_number,
      gender,
      zone,
      service_unit,
      conference_shirt,
      fee_payment,
      paid
  ) VALUES (?,?,?,?,?,?,?,?,?,?,?)
    `,
      [
        member_number,
        created_at,
        name,
        email,
        phone_number,
        gender,
        zone,
        service_unit,
        conference_shirt,
        fee_payment,
        paid,
      ]
    );

    console.log("sql", sql);

    await pool.query(sql);

    await pool.end();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Failed to save user details" },
      { status: 500 }
    );
  }
}
