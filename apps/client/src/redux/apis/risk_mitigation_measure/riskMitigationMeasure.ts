import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const riskMitigationMeasureApi = createApi({
  reducerPath: "riskMitigationMeasureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/risk-mitigation-measure`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllRiskMitigationMeasures: builder.query<RiskMitigationMeasure[], null>({
      query: () => "listRiskMitigationMeasures",
    }),

    getRiskMitigationMeasureById: builder.query<RiskMitigationMeasure, string>({
      query: (id) => `findRiskMitigationMeasure/${id}`,
    }),

    getRiskMitigationMeasuresByEventId: builder.query<
      RiskMitigationMeasure,
      number
    >({
      query: (eventId) => `findRiskMitigationMeasureByEventId/${eventId}`,
    }),

    createRiskMitigationMeasure: builder.mutation<
      any,
      Partial<RiskMitigationMeasure>
    >({
      query: (newRiskMitigationMeasure) => ({
        url: "createRiskMitigationMeasure/",
        method: "POST",
        body: newRiskMitigationMeasure,
      }),
    }),

    updateRiskMitigationMeasure: builder.mutation<
      any,
      {
        id: number;
        updateRiskMitigationMeasure: Partial<RiskMitigationMeasure>;
      }
    >({
      query: ({ id, updateRiskMitigationMeasure }) => ({
        url: `updateRiskMitigationMeasure/${id}/`,
        method: "PATCH",
        body: updateRiskMitigationMeasure,
      }),
    }),

    deleteRiskMitigationMeasure: builder.mutation({
      query: (id) => ({
        url: `deleteRiskMitigationMeasure/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useCreateRiskMitigationMeasureMutation,
  useGetAllRiskMitigationMeasuresQuery,
  useGetRiskMitigationMeasureByIdQuery,
  useGetRiskMitigationMeasuresByEventIdQuery,
  useUpdateRiskMitigationMeasureMutation,
  useDeleteRiskMitigationMeasureMutation,
} = riskMitigationMeasureApi;
