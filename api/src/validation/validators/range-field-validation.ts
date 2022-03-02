import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class RangeFieldValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly minLenght: number,
    private readonly maxLenght: number
  ) {}

  validate (input: any): Error | null {
    return input[this.fieldName] >= this.minLenght && input[this.fieldName] <= this.maxLenght ? null : new InvalidParamError(this.fieldName)
  }
}
