import { z } from "zod";
const emailSchema = z.preprocess(
  (val) => {
    if (typeof val !== 'string') return val;
    return val.trim().toLowerCase();
  },
  // aquí ponés las validaciones sobre string directamente
  z.string().max(254, 'El email es demasiado largo').email({ message: 'El email no tiene un formato válido' })
);

// Esquema de validación para el login
export const loginSchema = z.object({
  /*   email: z
        .string()
        .min(1, "El email es requerido")
        .max(254, "El email es demasiado largo")
        .refine(
            (email) => !email.includes(" "),
            "El email no puede contener espacios"
        ), */

   email: emailSchema,
    password: z
        .string()
        .min(1, "La contraseña es requerida")
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(128, "La contraseña es demasiado larga")
        .refine((s) => !/^\s|\s$/.test(s), "La contraseña no puede empezar ni terminar con espacios")
        .refine(
            (s) => typeof s === 'string' && /[a-z]/.test(s),
            "La contraseña debe contener al menos una letra minúscula"
        )
        .refine(
            (s) => /[A-Z]/.test(s),
            "La contraseña debe contener al menos una letra mayúscula"
        )
        .refine(
            (s) => /\d/.test(s),
            "La contraseña debe contener al menos un dígito"
        )
        .refine(
            (s) => /^[A-Za-z\d]+$/.test(s),
            "No se permiten caracteres especiales en la contraseña"
        )
});

// Esquema de validación para registro (más estricto)
export const registerSchema = z
    .object({
        name: z
            .string()
            .min(1, "El nombre es requerido")
            .min(2, "El nombre debe tener al menos 2 caracteres")
            .max(50, "El nombre es demasiado largo")
            .refine(
                (name) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name),
                "El nombre solo puede contener letras y espacios"
            ),

        email: z
            .string()
            .min(1, "El email es requerido")
            .email("Formato de email inválido")
            .max(254, "El email es demasiado largo")
            .refine(
                (email) => !email.includes(" "),
                "El email no puede contener espacios"
            ),

        password: z
            .string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .max(128, "La contraseña es demasiado larga")
            .refine(
                (password) => /[A-Z]/.test(password),
                "La contraseña debe contener al menos una mayúscula"
            )
            .refine(
                (password) => /[a-z]/.test(password),
                "La contraseña debe contener al menos una minúscula"
            )
            .refine(
                (password) => /[0-9]/.test(password),
                "La contraseña debe contener al menos un número"
            )
            .refine(
                (password) => /[^a-zA-Z0-9]/.test(password),
                "La contraseña debe contener al menos un carácter especial"
            )
            .refine(
                (password) => !/^\s|\s$/.test(password),
                "La contraseña no puede empezar o terminar con espacios"
            ),

        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

// Tipos TypeScript derivados de los esquemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
