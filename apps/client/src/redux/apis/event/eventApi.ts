import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/event`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllEvents: builder.query<Events[], null>({
      query: () => "listEvents",
    }),

    getAllRisksEvents: builder.query<Events[], null>({
      query: () => "listRisksEvents",
    }),

    getAllMaterializedAdverseEvents: builder.query<Events[], null>({
      query: () => "listMaterializedAdverseEvents",
    }),

    getAllMaterializedIncidents: builder.query<Events[], null>({
      query: () => "listMaterializedIncidents",
    }),

    getEventById: builder.query<Events, number>({
      query: (Id) => `findEvent/${Id}`,
    }),

    getAllEventsByEventTypeId: builder.query<Events[], number>({
      query: (eventTypeId) => `findEventsByEventTypeId/${eventTypeId}`,
    }),

    getAllEventsByEventTypeIdAndUnitId: builder.query<
      Events[],
      { eventTypeId: number; unitId?: number }
    >({
      query: ({ eventTypeId, unitId }) => {
        const unitQuery = unitId ? `${unitId}` : "";

        return `findEventsByEventTypeIdAndUnitId/${eventTypeId}/${unitQuery}`;
      },
    }),

    createEvent: builder.mutation<any, Partial<Events>>({
      query: (newEvent) => ({
        url: "createEvent/",
        method: "POST",
        body: newEvent,
      }),
    }),

    updateEvent: builder.mutation<
      any,
      { id: number; updateEvent: Partial<Events> }
    >({
      query: ({ id, updateEvent }) => ({
        url: `updateEvent/${id}/`,
        method: "PATCH",
        body: updateEvent,
      }),
    }),

    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `deleteEvent/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetAllRisksEventsQuery,
  useGetAllMaterializedAdverseEventsQuery,
  useGetAllMaterializedIncidentsQuery,
  useGetEventByIdQuery,
  useGetAllEventsByEventTypeIdQuery,
  useGetAllEventsByEventTypeIdAndUnitIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;
