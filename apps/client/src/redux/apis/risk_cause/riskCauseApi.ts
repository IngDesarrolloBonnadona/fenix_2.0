import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const riskCauseApi = createApi({
  reducerPath: "riskCauseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/risk-cause`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllRiskCauses: builder.query<RiskCause[], null>({
      query: () => "listRiskCauses",
    }),

    getRiskCauseById: builder.query<RiskCause, string>({
      query: (id) => `findRiskCause/${id}`,
    }),

    getRiskCausesByEventId: builder.query<RiskCause, number>({
      query: (eventId) => `findRiskCauseByEventId/${eventId}`,
    }),

    createRiskCause: builder.mutation<any, Partial<RiskCause>>({
      query: (newRiskCause) => ({
        url: "createRiskCause/",
        method: "POST",
        body: newRiskCause,
      }),
    }),

    updateRiskCause: builder.mutation<
      any,
      { id: number; updateRiskCause: Partial<RiskCause> }
    >({
      query: ({ id, updateRiskCause }) => ({
        url: `updateRiskCause/${id}/`,
        method: "PATCH",
        body: updateRiskCause,
      }),
    }),

    deleteRiskCause: builder.mutation({
      query: (id) => ({
        url: `deleteRiskCause/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useCreateRiskCauseMutation,
  useGetAllRiskCausesQuery,
  useGetRiskCauseByIdQuery,
  useGetRiskCausesByEventIdQuery,
  useUpdateRiskCauseMutation,
  useDeleteRiskCauseMutation,
} = riskCauseApi;
