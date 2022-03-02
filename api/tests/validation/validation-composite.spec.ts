import { ValidationComposite } from '@/validation/validators'
import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import { mock, MockProxy } from 'jest-mock-extended'

describe('Validation Composite', () => {
  let validationStub: MockProxy<Validation>
  let fakeValidations: Validation[]
  let sut: ValidationComposite
  const field = 'any_value'
  beforeEach(() => {
    validationStub = mock()
    validationStub.validate.mockReturnValue(new MissingParamError('field'))
    fakeValidations = [
      validationStub,
      validationStub
    ]
    sut = new ValidationComposite(fakeValidations)
  })
  it('Should return an error if any validation fails', () => {
    const error = sut.validate({ [field]: 'invalid_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
  test('Should not return if validation success', () => {
    validationStub.validate.mockReturnValue(null)
    const error = sut.validate({ [field]: 'any_value' })
    expect(error).toBe(null)
  })
})
