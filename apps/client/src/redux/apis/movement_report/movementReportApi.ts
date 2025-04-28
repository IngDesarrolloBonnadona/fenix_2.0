import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const movementReportApi = createApi({
  reducerPath: "movementReportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/movement-report`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllMovementReports: builder.query<MovementReport[], null>({
      query: () => "listMovementReports",
    }),

    createMovementReport: builder.mutation<any, Partial<MovementReport>>({
      query: (newMovementReport) => ({
        url: "createMovementReport/",
        method: "POST",
        body: newMovementReport,
      }),
    }),

    updateMovementReport: builder.mutation<
      any,
      { id: number; updateMovementReport: Partial<MovementReport> }
    >({
      query: ({ id, updateMovementReport }) => ({
        url: `updateMovementReport/${id}/`,
        method: "PATCH",
        body: updateMovementReport,
      }),
    }),

    deleteMovementReport: builder.mutation({
      query: (id) => ({
        url: `deleteMovementReport/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllMovementReportsQuery,
  useCreateMovementReportMutation,
  useUpdateMovementReportMutation,
  useDeleteMovementReportMutation,
} = movementReportApi;
