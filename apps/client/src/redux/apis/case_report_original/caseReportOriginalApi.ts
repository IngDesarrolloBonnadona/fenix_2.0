import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const caseReportOriginalApi = createApi({
  reducerPath: "caseReportOriginalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/case-report-original`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    getReportOriginalById: builder.query<CaseReportOriginal, string>({
      query: (Id) => `findReportOriginal/${Id}`,
    }),

    createcaseReportOriginal: builder.mutation<
      any,
      {
        newReportOriginal: Partial<CaseReportOriginal>;
        userName?: string;
        userEmail?: string | null | undefined;
      }
    >({
      query: ({ newReportOriginal, userName, userEmail }) => ({
        url: `createReportOriginal/${userName}/${userEmail}`,
        method: "POST",
        body: newReportOriginal,
      }),
    }),
  }),
});

export const {
  useCreatecaseReportOriginalMutation,
  useGetReportOriginalByIdQuery,
} = caseReportOriginalApi;
