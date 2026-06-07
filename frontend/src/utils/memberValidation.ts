export const validateMember = (
  member: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  }
): string | null => {

  if (!member.first_name.trim()) {
    return "First Name is required";
  }

  if (!member.last_name.trim()) {
    return "Last Name is required";
  }

  if (!member.email.trim()) {
    return "Email is required";
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(member.email)) {
    return "Enter a valid email";
  }

  if (!member.phone.trim()) {
    return "Phone Number is required";
  }

  if (!/^\d{10}$/.test(member.phone)) {
    return "Phone Number must be 10 digits";
  }

  return null;
};