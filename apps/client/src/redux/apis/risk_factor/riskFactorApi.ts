import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const riskFactorApi = createApi({
  reducerPath: "riskFactorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/risk-factor`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllRiskFactors: builder.query<RiskFactor[], null>({
      query: () => "listRiskFactors",
    }),

    createRiskFactor: builder.mutation<any, Partial<RiskFactor>>({
      query: (newRiskFactor) => ({
        url: "createRiskFactor/",
        method: "POST",
        body: newRiskFactor,
      }),
    }),

    updateRiskFactor: builder.mutation<
      any,
      { id: number; updateRiskFactor: Partial<RiskFactor> }
    >({
      query: ({ id, updateRiskFactor }) => ({
        url: `updateRiskFactor/${id}/`,
        method: "PATCH",
        body: updateRiskFactor,
      }),
    }),

    deleteRiskFactor: builder.mutation({
      query: (id) => ({
        url: `deleteRiskFactor/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllRiskFactorsQuery,
  useCreateRiskFactorMutation,
  useUpdateRiskFactorMutation,
  useDeleteRiskFactorMutation,
} = riskFactorApi;
