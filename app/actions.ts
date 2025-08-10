"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be at most 500 characters"),
});

export type ContactFormResponse = {
  success: boolean;
  message: string;
  errors?: z.inferFlattenedErrors<typeof contactSchema>["fieldErrors"];
};

type PreviousStateType = ContactFormResponse | null;

export async function sendContactEmail(
  previousState: PreviousStateType,
  formData: FormData
) {
  const contactData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  const validatedData = contactSchema.safeParse(contactData);

  if (!validatedData.success) {
    return {
      success: false,
      message: "Please fix the errors in the form",
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = contactData;

  const logoUrl = "https://casa-de-oracion-ssd.vercel.app/email-logo.png";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; padding: 20px;">
          <div style="text-align: center; margin-bottom: 25px;">
          <img src="${logoUrl}" alt="CDO Logo" style="max-width: 150px; height: auto; border: 0;">
        </div>

      <h2 style="color: #a89076; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
      
      <p style="margin-bottom: 10px;">You received a new message from your website contact form:</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #a89076; margin-bottom: 20px;">
        <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #a89076; text-decoration: none;">${email}</a></p>
      </div>

      <h3 style="color: #555; margin-bottom: 10px;">Message:</h3>
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
        <p style="margin: 0; white-space: pre-wrap;">${message}</p> 
        
      </div> 
        
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      
      <p style="font-size: 0.9em; color: #777; text-align: center;">This email was sent via the contact form on your website.</p>

    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "",
      subject: `New Contact Form Submission from ${name}`,
      text: `Email: ${email}\n\nMessage:\n${message}`,
      html: htmlContent,
    });

    return {
      success: true,
      message: "Email sent successfully!",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "An error occurred while sending the email.",
    };
  }
}
