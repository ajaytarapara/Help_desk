// src/services/CommentSignalRService.ts
import * as signalR from "@microsoft/signalr";
import { Comments } from "../features/ticket/types";


export interface CommentDeletedPayload {
  ticketId: number;
  deletedIds: number[];
}

export class CommentSignalRService {
  private connection: signalR.HubConnection | null = null;

  constructor(private hubUrl: string) {}

  // Connect to SignalR
  async connect(
    ticketId: number,
    handlers: {
      onCreated?: (comment: Comments) => void;
      onEdited?: (comment: Comments) => void;
      onDeleted?: (payload: CommentDeletedPayload) => void;
    }
  ) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl, { withCredentials: true })
      .withAutomaticReconnect()
      .build();

    // Register handlers
    if (handlers.onCreated) {
      this.connection.on("CommentCreated", handlers.onCreated);
    }

    if (handlers.onEdited) {
      this.connection.on("CommentEdited", handlers.onEdited);
    }

    if (handlers.onDeleted) {
      this.connection.on("CommentDeleted", handlers.onDeleted);
    }

    await this.connection.start();
    await this.connection.invoke("JoinTicketGroup", ticketId);
  }

  // Disconnect
  async disconnect(ticketId: number) {
    if (!this.connection) return;
    try {
      await this.connection.invoke("LeaveTicketGroup", ticketId);
    } catch {}
    await this.connection.stop();
  }
}
