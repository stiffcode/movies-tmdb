import { GuestSessionRepository } from '@/data/protocols/guest'
import { NewGuestSession } from '@/domain/usecases'

export class HttpNewGuestSession implements NewGuestSession {
  constructor (
    private readonly guestSessionRepository: GuestSessionRepository
  ) {}

  async new (): Promise<NewGuestSession.Result> {
    const sessionId = await this.guestSessionRepository.newSession()
    return sessionId ?? null
  }
}
