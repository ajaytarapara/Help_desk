// src/hooks/useCommentSignalR.ts
import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

export type CommentCreatedHandler<T> = (comment: T) => void;
export type CommentEditedHandler<T> = (comment: T) => void;
export type CommentDeletedHandler = (payload: {
  ticketId: number;
  deletedIds: number[];
}) => void;

interface UseCommentSignalROptions<T> {
  ticketId: number;
  onCreated?: CommentCreatedHandler<T>;
  onEdited?: CommentEditedHandler<T>;
  onDeleted?: CommentDeletedHandler;
  hubUrl?: string;
}

export const useCommentSignalR = <T = any>({
  ticketId,
  onCreated,
  onEdited,
  onDeleted,
  hubUrl = "http://localhost:5214/hubs/comments",
}: UseCommentSignalROptions<T>) => {
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    if (!ticketId) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        // For cookie-based auth
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;

    const start = async () => {
      try {
        await connection.start();
        // Join the ticket group
        await connection.invoke("JoinTicketGroup", ticketId);
      } catch (err) {
        console.error("SignalR connection error:", err);
      }
    };

    // Register handlers
    connection.on("CommentCreated", (comment: T) => {
      onCreated?.(comment);
    });

    connection.on("CommentEdited", (comment: T) => {
      onEdited?.(comment);
    });

    connection.on(
      "CommentDeleted",
      (payload: {
        TicketId?: number;
        ticketId?: number;
        DeletedIds?: number[];
        deletedIds?: number[];
      }) => {
        // Normalize
        const ticketIdProp = payload.ticketId ?? payload.TicketId ?? ticketId;
        const deletedIds = payload.deletedIds ?? payload.DeletedIds ?? [];
        onDeleted?.({ ticketId: ticketIdProp, deletedIds });
      }
    );

    start();

    return () => {
      const cleanup = async () => {
        try {
          if (connection.state === signalR.HubConnectionState.Connected) {
            await connection.invoke("LeaveTicketGroup", ticketId);
          }
          await connection.stop();
        } catch (err) {
          // ignore
        }
      };
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketId, hubUrl, onCreated, onEdited, onDeleted]);
};
