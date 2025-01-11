"use server";

export default async function handleSubmitUsername(formData: FormData) {
  // TODO: Add zod validation

  const username = formData.get("username");

  console.log("Serer received username: ", username);
}
