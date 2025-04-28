import NextAuth from "next-auth";

let dynamicMaxAge: number = 720;

const cache = { maxAge: dynamicMaxAge, lastUpdated: Date.now() };

async function updateMaxAge() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BONNA_HUB_BACKEND_URL}/password-policy/getPasswordPolicy`
    );

    if (response.ok) {
      const data = await response.json();

      cache.maxAge = data.maximum_minutes_of_inactivity_in_application * 60;

      cache.lastUpdated = Date.now();
    }
  } catch (error) {
    console.error("Error al actualizar MaxAge:", error);
  }
}

async function getDynamicMaxAge() {
  if (Date.now() - cache.lastUpdated > 60000 * 5) {
    await updateMaxAge();
  }
  return cache.maxAge;
}

async function refreshAccessToken(token: any) {
  try {
    if (!token || !token.refresh_token) {
      throw new Error("Token de refresco no válido.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BONNA_HUB_BACKEND_URL}/auth/refreshToken`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token?.refresh_token}`,
        },
      }
    );

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      refresh_token: refreshedTokens.refresh_token,
      access_token_expires_in:
        Date.now() + refreshedTokens.access_token_expires_in * 1000,
    };
  } catch (error) {
    throw new Error("Error al refrescar el token de acceso");
  }
}

export const GET = async (req: any, res: any) => {
  const updatedMaxAge = await getDynamicMaxAge();

  return NextAuth(req, res, {
    providers: [],
    jwt: {
      secret: process.env.NEXTAUTH_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, user, account }) {
        if (account && user && token) {
          return {
            ...token,
            ...user,
            access_token_expires_in: Date.now() + 60 * 1000,
          };
        }

        if (
          token?.access_token_expires_in &&
          typeof token.access_token_expires_in === "number"
        ) {
          if (Date.now() < (token.access_token_expires_in || 0)) {
            return token;
          }

          const refreshedToken = await refreshAccessToken(token);

          if (refreshedToken.error) {
            return { ...token, error: refreshedToken.error };
          }

          return refreshedToken;
        }
      },
      async session({ session, token }) {
        if (token) {
          session.user = token;
        } else {
          session.user;
        }

        return session;
      },
    },
    pages: {
      signIn: `${process.env.NEXT_PUBLIC_BONNA_HUB_URL}/login`,
    },
    session: {
      strategy: "jwt",
      maxAge: updatedMaxAge,
    },
  });
};

export const POST = GET;
