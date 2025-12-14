"use server";

export async function submitContactForm(prevState: any, formData: FormData) {
    // 1. Extract Data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // 2. Validate (Basic)
    if (!name || !email || !message) {
        return { success: false, message: "Please fill in all required fields." };
    }

    // 3. Log to Server Console (Proof of Life)
    console.log("--- CONTACT FORM SUBMISSION ---");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("-------------------------------");

    // 4. Simulate Network Delay (Optional, for UX testing)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 5. Return Success
    // In a real app, you would send an email here using Resend/SendGrid/etc.
    return { success: true, message: "Message sent successfully!" };
}
