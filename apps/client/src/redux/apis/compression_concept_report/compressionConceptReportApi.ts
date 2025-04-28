import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const compressionConceptReportApi = createApi({
  reducerPath: "compressionConceptReportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/compression-concept-report`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  //   refetchOnMountOrArgChange: true,

  //   refetchOnFocus: true,

  //   refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllCompressionConceptReports: builder.query<
      CompressionConceptReport[],
      null
    >({
      query: () => "listCompressionConceptReports",
    }),

    createCompressionConceptReport: builder.mutation({
      query: (newCompressionConceptReport) => ({
        url: "createCompressionConceptReport",
        method: "POST",
        body: newCompressionConceptReport,
      }),
    }),
  }),
});

export const {
  useGetAllCompressionConceptReportsQuery,
  useCreateCompressionConceptReportMutation,
} = compressionConceptReportApi;
