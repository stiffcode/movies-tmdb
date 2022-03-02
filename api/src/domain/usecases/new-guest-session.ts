export interface NewGuestSession {
  new: () => Promise<NewGuestSession.Result>
}

export namespace NewGuestSession {
  export type Result = string | null
}
