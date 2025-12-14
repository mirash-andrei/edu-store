export interface AddToBasketPayload {
  id: string | number;
  count: number;
}

export interface ChangeCountPayload {
  id: string | number;
  count: number;
}

export interface PongMessage {
  id: string | number;
  count: number;
  allClear: boolean;
}

export type WebSocketEvent = 'add-to-basket' | 'change-count' | 'clear-basket' | 'pong';

