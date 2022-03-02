import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from '@/validation/validators'

const makeSut = (): RequiredFieldValidation => {
  const sut = new RequiredFieldValidation('field')
  return sut
}
describe('RequiredField Validation', () => {
  it('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
  it('Should return null if validation success', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
