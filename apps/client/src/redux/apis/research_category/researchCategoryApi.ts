import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const researchCategoryApi = createApi({
  reducerPath: "researchCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/research-category`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    getAllResearchCategories: builder.query<ResearchCategory[], null>({
      query: () => "listResearchCategories",
    }),

    getResearchCategoryByResearchInstrumentId: builder.query<
      ResearchCategory[],
      number
    >({
      query: (Id) => `findResearchCategoryByResearchInstrumentId/${Id}`,
    }),

    createResearchCategory: builder.mutation({
      query: (newResearchCategory) => ({
        url: "createResearchCategory/",
        method: "POST",
        body: newResearchCategory,
      }),
    }),

    updateResearchCategory: builder.mutation<
      any,
      { id: number; updateResearchCategory: Partial<ResearchCategory> }
    >({
      query: ({ id, updateResearchCategory }) => ({
        url: `updateResearchCategory/${id}/`,
        method: "PATCH",
        body: updateResearchCategory,
      }),
    }),

    deleteResearchCategory: builder.mutation({
      query: (id) => ({
        url: `deleteResearchCategory/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useCreateResearchCategoryMutation,
  useGetAllResearchCategoriesQuery,
  useGetResearchCategoryByResearchInstrumentIdQuery,
  useUpdateResearchCategoryMutation,
  useDeleteResearchCategoryMutation,
} = researchCategoryApi;
