import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const impactApi = createApi({
  reducerPath: "impactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/impact`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllImpacts: builder.query<Impact[], null>({
      query: () => "listImpacts",
    }),

    createImpact: builder.mutation<any, Partial<Impact>>({
      query: (newImpact) => ({
        url: "createImpact/",
        method: "POST",
        body: newImpact,
      }),
    }),

    updateImpact: builder.mutation<
      any,
      { id: number; updateImpact: Partial<Impact> }
    >({
      query: ({ id, updateImpact }) => ({
        url: `updateImpact/${id}/`,
        method: "PATCH",
        body: updateImpact,
      }),
    }),

    deleteImpact: builder.mutation({
      query: (id) => ({
        url: `deleteImpact/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useCreateImpactMutation,
  useGetAllImpactsQuery,
  useUpdateImpactMutation,
  useDeleteImpactMutation,
} = impactApi;
