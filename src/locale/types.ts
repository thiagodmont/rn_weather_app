import { en } from './en'
import { ptBr } from './pt_BR'

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType &
    (string | number)]: ObjectType[Key] extends Array<object>
    ? `${Key}[${number}].${NestedKeyOf<ObjectType[Key][number]>}`
    : ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

export type KeyTranslation = NestedKeyOf<typeof en> | NestedKeyOf<typeof ptBr>
