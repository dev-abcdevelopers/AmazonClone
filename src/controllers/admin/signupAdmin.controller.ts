import { Request, Response } from 'express';
import { prisma } from '../../config/db';
import bcrypt from 'bcryptjs';

function generateUsername(firstName: string, lastName: string, email: string, mobile: string) {
  // Simple: lowercase first+last + first 3 email chars + last 4 mobile
  const safeFirst = firstName.trim().toLowerCase();
  const safeLast = lastName.trim().toLowerCase();
  const safeEmail = email.split('@')[0].slice(0, 3).toLowerCase();
  const safeMobile = mobile.replace(/\D/g, '').slice(-4);
  return `${safeFirst}${safeLast}${safeEmail}${safeMobile}`;
}

export const showSignupForm = (_: Request, res: Response): void => {
  res.render('signup/create', { error: null, success: false, form: {} });
};

export const handleSignupForm = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, mobile, password } = req.body;
  const form = { firstName, lastName, email, mobile };

  // Basic validation
  if (!firstName || !lastName || !email || !mobile || !password) {
    res.render('signup/create', { error: 'All fields are required.', success: false, form });
    return;
  }

  // Unique check for email/mobile
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: email.trim().toLowerCase() },
        { mobile: mobile.trim() }
      ]
    }
  });
  if (existingUser) {
    res.render('signup/create', { error: 'Email or mobile already registered.', success: false, form });
    return;
  }

  // Hash password
  const hashed = await bcrypt.hash(password, 10);

  // Generate username
  let username = generateUsername(firstName, lastName, email, mobile);
  // Make sure username is unique (add random if collision)
  let tries = 0;
  while (await prisma.user.findUnique({ where: { username } })) {
    tries++;
    username = generateUsername(firstName, lastName, email, mobile) + Math.floor(Math.random() * 10000);
    if (tries > 3) break; // avoid infinite loop
  }

  await prisma.user.create({
    data: {
      firstName, lastName, email: email.trim().toLowerCase(), mobile: mobile.trim(), password: hashed, username
    }
  });

  res.render('signup/create', { error: null, success: true, form: {} });
};
