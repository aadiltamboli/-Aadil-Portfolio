import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/testimonials.json");

export async function GET() {
  try {
    const fileContents = await fs.readFile(DATA_FILE_PATH, "utf8");
    const testimonials = JSON.parse(fileContents);
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error reading testimonials:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.author || !body.quote || !body.role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Read existing
    const fileContents = await fs.readFile(DATA_FILE_PATH, "utf8");
    const testimonials = JSON.parse(fileContents);

    // Create new testimonial
    const newTestimonial = {
      id: Date.now().toString(),
      author: body.author,
      role: body.role,
      quote: body.quote,
      timestamp: new Date().toISOString()
    };

    // Add to array (newest first)
    testimonials.unshift(newTestimonial);

    // Write back to file
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(testimonials, null, 2));

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error("Error saving testimonial:", error);
    return NextResponse.json({ error: "Failed to save testimonial" }, { status: 500 });
  }
}
