export interface GuestSessionRepository {
  newSession: () => Promise<GuestSessionRepository.Result>
}

export namespace GuestSessionRepository {
  export type Result = string | null
}
