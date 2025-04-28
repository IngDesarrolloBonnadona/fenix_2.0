import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const quarterYearApi = createApi({
  reducerPath: "quarterYearApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/quarter-year`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllQuarterYears: builder.query<QuarterYear[], null>({
      query: () => "listQuarterYear",
    }),
  }),
});

export const { useGetAllQuarterYearsQuery } = quarterYearApi;
