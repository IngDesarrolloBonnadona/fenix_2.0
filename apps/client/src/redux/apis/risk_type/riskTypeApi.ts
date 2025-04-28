import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const riskTypeApi = createApi({
  reducerPath: "riskTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/risk-type`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllRiskTypes: builder.query<RiskType[], null>({
      query: () => "listRiskTypes",
    }),

    createRiskType: builder.mutation({
      query: (newRiskType) => ({
        url: "createRiskType/",
        method: "POST",
        body: newRiskType,
      }),
    }),

    updateRiskType: builder.mutation<
      any,
      { id: number; updateRiskType: Partial<RiskType> }
    >({
      query: ({ id, updateRiskType }) => ({
        url: `updateRiskType/${id}/`,
        method: "PATCH",
        body: updateRiskType,
      }),
    }),

    deleteRiskType: builder.mutation({
      query: (id) => ({
        url: `deleteRiskType/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllRiskTypesQuery,
  useCreateRiskTypeMutation,
  useUpdateRiskTypeMutation,
  useDeleteRiskTypeMutation,
} = riskTypeApi;
