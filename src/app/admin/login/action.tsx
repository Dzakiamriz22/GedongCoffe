// app/admin/login/action.tsx

'use server';

export async function loginAdmin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const dummyEmail = 'admin@gedongkopi.com';
  const dummyPassword = 'admin123';

  if (email === dummyEmail && password === dummyPassword) {
    // Simulasi session (nanti bisa diganti pakai Supabase atau NextAuth)
    return { success: true };
  }

  return {
    success: false,
    message: 'Email atau password salah.',
  };
}
