const { z } = require("zod");

const signupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
});

const validateSignup = (req, res, next) => {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
        const errors = result.error.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
        }));
        return res.status(400).json({ errors });
    }
    req.validatedBody = result.data;
    next();
};
module.exports = validateSignup;
