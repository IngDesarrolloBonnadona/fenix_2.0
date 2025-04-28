import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const riskLevelApi = createApi({
  reducerPath: "riskLevelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/risk-level`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllRiskLevels: builder.query<RiskLevel[], null>({
      query: () => "listRiskLevels",
    }),

    createRiskLevel: builder.mutation({
      query: (newRiskLevel) => ({
        url: "createRiskLevel/",
        method: "POST",
        body: newRiskLevel,
      }),
    }),

    updateRiskLevel: builder.mutation<
      any,
      { id: number; updateRiskLevel: Partial<RiskLevel> }
    >({
      query: ({ id, updateRiskLevel }) => ({
        url: `updateRiskLevel/${id}/`,
        method: "PATCH",
        body: updateRiskLevel,
      }),
    }),

    deleteRiskLevel: builder.mutation({
      query: (id) => ({
        url: `deleteRiskLevel/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllRiskLevelsQuery,
  useCreateRiskLevelMutation,
  useUpdateRiskLevelMutation,
  useDeleteRiskLevelMutation,
} = riskLevelApi;
