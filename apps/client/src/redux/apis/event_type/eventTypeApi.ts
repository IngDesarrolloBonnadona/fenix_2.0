import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const eventTypeApi = createApi({
  reducerPath: "eventTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/event-type`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllEventTypes: builder.query<EventType[], null>({
      query: () => "listEventTypes",
    }),

    getEventTypeById: builder.query<EventType, number>({
      query: (Id) => `findEventType/${Id}`
    }),

    getEventTypeByCaseTypeId: builder.query<EventType[], number>({
      query: (caseTypeId) => `findEvenTypeByCaseType/${caseTypeId}`
    }),

    createEventType: builder.mutation<any, Partial<EventType>>({
      query: (newEventType) => ({
        url: "createEventType/",
        method: "POST",
        body: newEventType,
      }),
    }),

    updateEventType: builder.mutation<any, { id: number; updateEventType: Partial<EventType> }>({
      query: ({ id, updateEventType }) => ({
        url: `updateEventType/${id}/`,
        method: "PATCH",
        body: updateEventType,
      }),
    }),

    deleteEventType: builder.mutation({
      query: (id) => ({
        url: `deleteEventType/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllEventTypesQuery,
  useGetEventTypeByIdQuery,
  useGetEventTypeByCaseTypeIdQuery,
  useCreateEventTypeMutation,
  useUpdateEventTypeMutation,
  useDeleteEventTypeMutation,
} = eventTypeApi;
