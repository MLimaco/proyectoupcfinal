import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { DefaultSession } from "next-auth";

// Extender tipos para Auth.js v5
declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      isRegistered: boolean;
      userId?: string;
    } & DefaultSession["user"];
  }

  // Definición de User para Auth.js v5
  interface User {
    role?: string;
    isRegistered?: boolean;
    userId?: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // En Auth.js v5, jwt sigue siendo usado pero maneja internamente las conversiones
    async jwt({ token, user, account }) {
      console.log("Callback JWT ejecutado");

      // Si es la primera vez que se genera el token (login)
      if (user && account) {
        try {
          // TEMPORAL: Simular existencia del usuario basado en el email
          const isRegistered = false; // Por defecto, asumir que es un usuario nuevo

          // Determinar el rol basado en email específico
          const isAdmin = user.email === "m.limaco0191@gmail.com";

          // Añadir información adicional al token
          token.role = isAdmin ? "admin" : "user";
          token.isRegistered = isRegistered;
          token.userId = "temp-user-id"; // ID temporal

          console.log("Token generado:", token); // Depuración
        } catch (error) {
          console.error("Error verificando usuario:", error);
        }
      }

      return token;
    },

    // Añadir información adicional a la sesión
    async session({ session, token }) {
      console.log("Callback Session ejecutado");

      if (session.user) {
        // Añadir información al objeto de sesión
        session.user.role = token.role as string;
        session.user.isRegistered = token.isRegistered as boolean;
        session.user.userId = token.userId as string | undefined;

        console.log("Sesión generada:", session); // Depuración
      }

      return session;
    },

    // Registrar login/signup en callback signIn
    async signIn({ user, account }) {
      try {
        // TEMPORAL: Solo registrar en consola
        console.log("Usuario autenticado:", user.email);
        console.log("Proveedor:", account?.provider);
      } catch (error) {
        console.error(`Error en el proceso de autenticación:`, error);
      }

      return true; // Continuar con el proceso de autenticación
    },

    // Redirección personalizada basada en el estado del usuario
    async redirect({ url, baseUrl }) {
      // Si es nuestra URL de redirección específica, permitirla
      if (url.includes("/auth-redirect")) {
        return url;
      }

      // Si es una URL relativa, adjuntar el baseUrl
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      // Si es una URL del mismo origen, permitirla
      if (new URL(url).origin === baseUrl) {
        return url;
      }

      // Por defecto, redirigir a la raíz
      return baseUrl;
    },
  },
  pages: {
    signIn: '/', // Página de login personalizada
    error: '/auth/error', // Página de error de autenticación
  }
});