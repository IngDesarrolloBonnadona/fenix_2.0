import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const safetyBarrierApi = createApi({
  reducerPath: "safetyBarrierApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/safety-barriers`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllSafetyBarriers: builder.query<SafetyBarrier[], null>({
      query: () => "listSafetyBarriers",
    }),

    createSafetyBarrier: builder.mutation({
      query: (newSafetyBarrier) => ({
        url: "createSafetyBarrier/",
        method: "POST",
        body: newSafetyBarrier,
      }),
    }),

    updateSafetyBarrier: builder.mutation<any, { id: number; updateSafetyBarrier: Partial<SafetyBarrier> }>({
      query: ({ id, updateSafetyBarrier }) => ({
        url: `updateSafetyBarrier/${id}/`,
        method: "PATCH",
        body: updateSafetyBarrier,
      }),
    }),

    deleteSafetyBarrier: builder.mutation({
      query: (id) => ({
        url: `deleteSafetyBarrier/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllSafetyBarriersQuery,
  useCreateSafetyBarrierMutation,
  useUpdateSafetyBarrierMutation,
  useDeleteSafetyBarrierMutation,
} = safetyBarrierApi;
