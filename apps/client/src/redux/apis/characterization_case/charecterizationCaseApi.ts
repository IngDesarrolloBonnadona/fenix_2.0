import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const characterizationCaseApi = createApi({
  reducerPath: "characterizationCaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/characterization-case`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllCharacterizationCases: builder.query<CharacterizationCase[], null>({
      query: () => "listCharacterizationsCase",
    }),

    createCharacterizationCase: builder.mutation({
      query: (newCharacterizationCase) => ({
        url: "createCharacterizationCase/",
        method: "POST",
        body: newCharacterizationCase,
      }),
    }),

    updateCharacterizationCase: builder.mutation<
      any,
      { id: number; updateCharacterizationCase: Partial<CharacterizationCase> }
    >({
      query: ({ id, updateCharacterizationCase }) => ({
        url: `updateCharacterizationCase/${id}/`,
        method: "PATCH",
        body: updateCharacterizationCase,
      }),
    }),

    deleteCharacterizationCase: builder.mutation({
      query: (id) => ({
        url: `deleteCharacterizationCase/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllCharacterizationCasesQuery,
  useCreateCharacterizationCaseMutation,
  useUpdateCharacterizationCaseMutation,
  useDeleteCharacterizationCaseMutation,
} = characterizationCaseApi;
