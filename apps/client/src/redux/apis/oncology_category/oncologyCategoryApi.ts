import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const oncologyCategoryApi = createApi({
  reducerPath: "OncologyCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/oncology-category`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  //   refetchOnMountOrArgChange: true,

  //   refetchOnFocus: true,

  //   refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllOncologyCategories: builder.query<OncologyCategory[], null>({
      query: () => "listOncologyCategories",
    }),

    createOncologyCategory: builder.mutation({
      query: (newOncologyCategory) => ({
        url: "createOncologyCategory/",
        method: "POST",
        body: newOncologyCategory,
      }),
    }),

    updateOncologyCategory: builder.mutation<
      any,
      { id: number; updateOncologyCategory: Partial<OncologyCategory> }
    >({
      query: ({ id, updateOncologyCategory }) => ({
        url: `updateOncologyCategory/${id}/`,
        method: "PATCH",
        body: updateOncologyCategory,
      }),
    }),

    deleteOncologyCategory: builder.mutation({
      query: (id) => ({
        url: `deleteOncologyCategory/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllOncologyCategoriesQuery,
  useCreateOncologyCategoryMutation,
  useUpdateOncologyCategoryMutation,
  useDeleteOncologyCategoryMutation,
} = oncologyCategoryApi;
