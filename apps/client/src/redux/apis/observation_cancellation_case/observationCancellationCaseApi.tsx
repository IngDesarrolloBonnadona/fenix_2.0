import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const observationCancellationCaseApi = createApi({
  reducerPath: "observationCancellationCaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/observation-cancellation-case`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllObservationCancellationCases: builder.query<
      ObservationCancellationCase[],
      null
    >({
      query: () => "listObservationCancellationCase",
    }),

    getObservationCancellationCaseById: builder.query<
      ObservationCancellationCase,
      number
    >({
      query: (Id) => `findObservationCancellationCase/${Id}`,
    }),

    getObservationCancellationByCaseValidateId: builder.query<
      ObservationCancellationCase,
      string
    >({
      query: (CaseValidateId) =>
        `findOneObservationCancellationByCaseValidateId/${CaseValidateId}`,
    }),

    createObservationCancellationCase: builder.mutation<
      any,
      {
        idUser: string;
        idCaseValidate: string;
        newReasonCancellationCase: Partial<ObservationCancellationCase>;
      }
    >({
      query: ({ idUser, idCaseValidate, newReasonCancellationCase }) => ({
        url: `createObservationCancellationCase/${idUser}/${idCaseValidate}`,
        method: "POST",
        body: newReasonCancellationCase,
      }),
    }),

    deleteObservationCancellationCase: builder.mutation({
      query: (id) => ({
        url: `deleteObservationCancellationCase/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useCreateObservationCancellationCaseMutation,
  useGetAllObservationCancellationCasesQuery,
  useGetObservationCancellationCaseByIdQuery,
  useGetObservationCancellationByCaseValidateIdQuery,
  useDeleteObservationCancellationCaseMutation,
} = observationCancellationCaseApi;
