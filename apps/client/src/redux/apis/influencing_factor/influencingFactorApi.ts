import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const influencingFactorApi = createApi({
  reducerPath: "influencingFactorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/influencing-factor`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllInfluencingFactors: builder.query<InfluencingFactor[], null>({
      query: () => "listInfluencingFactors",
    }),

    createInfluencingFactor: builder.mutation({
      query: (newInfluencingFactor) => ({
        url: "createInfluencingFactor/",
        method: "POST",
        body: newInfluencingFactor,
      }),
    }),

    updateInfluencingFactor: builder.mutation<
      any,
      { id: number; updateInfluencingFactor: Partial<InfluencingFactor> }
    >({
      query: ({ id, updateInfluencingFactor }) => ({
        url: `updateInfluencingFactor/${id}/`,
        method: "PATCH",
        body: updateInfluencingFactor,
      }),
    }),

    deleteInfluencingFactor: builder.mutation({
      query: (id) => ({
        url: `deleteInfluencingFactor/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllInfluencingFactorsQuery,
  useCreateInfluencingFactorMutation,
  useUpdateInfluencingFactorMutation,
  useDeleteInfluencingFactorMutation,
} = influencingFactorApi;
