import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const riskConsequenceApi = createApi({
  reducerPath: "riskConsequenceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/risk-consequences`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllRiskConsequences: builder.query<RiskConsequence[], null>({
      query: () => "listRiskConsequences",
    }),

    getRiskConsequenceById: builder.query<RiskConsequence, string>({
      query: (id) => `findRiskConsequence/${id}`,
    }),

    getRiskConsequencesByEventId: builder.query<RiskConsequence, number>({
      query: (eventId) => `findRiskConsequenceByEventId/${eventId}`,
    }),

    createRiskConsequence: builder.mutation<any, Partial<RiskConsequence>>({
      query: (newRiskConsequence) => ({
        url: "createRiskConsequence/",
        method: "POST",
        body: newRiskConsequence,
      }),
    }),

    updateRiskConsequence: builder.mutation<
      any,
      { id: number; updateRiskConsequence: Partial<RiskConsequence> }
    >({
      query: ({ id, updateRiskConsequence }) => ({
        url: `updateRiskConsequence/${id}/`,
        method: "PATCH",
        body: updateRiskConsequence,
      }),
    }),

    deleteRiskConsequence: builder.mutation({
      query: (id) => ({
        url: `deleteRiskConsequence/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useCreateRiskConsequenceMutation,
  useGetAllRiskConsequencesQuery,
  useGetRiskConsequenceByIdQuery,
  useGetRiskConsequencesByEventIdQuery,
  useUpdateRiskConsequenceMutation,
  useDeleteRiskConsequenceMutation,
} = riskConsequenceApi;
