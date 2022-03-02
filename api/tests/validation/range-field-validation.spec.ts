import { InvalidParamError } from '@/presentation/errors'
import { RangeFieldValidation } from '@/validation/validators'

const makeSut = (): RangeFieldValidation => {
  const sut = new RangeFieldValidation('field', 0, 5)
  return sut
}
describe('RangeField Validation', () => {
  it('Should return a InvalidParam if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 50 })
    expect(error).toEqual(new InvalidParamError('field'))
  })
  it('Should return null if validation success', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 1 })
    expect(error).toBeFalsy()
  })
})
