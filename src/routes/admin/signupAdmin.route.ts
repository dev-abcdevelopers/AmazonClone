import { Router } from "express";
import { showSignupForm, handleSignupForm } from "../../controllers/admin/signupAdmin.controller";

export const adminSignupRouter = Router();

adminSignupRouter.get('/signup', showSignupForm);
adminSignupRouter.post('/signup', handleSignupForm);
