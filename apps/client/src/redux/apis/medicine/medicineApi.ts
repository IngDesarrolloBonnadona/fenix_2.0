import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const medicineApi = createApi({
  reducerPath: "medicineApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/medicine`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    getExternalMedicine: builder.query<any, string>({
      query: (medicine) => `findExternalMedicine/?medicine=${medicine}`,
    }),
  }),
});

export const { useGetExternalMedicineQuery } = medicineApi;
