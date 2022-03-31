import { genSaltSync, hashSync } from "bcrypt"
import { BCRYPT_DEFAULT_VALUES } from "../defaults/bcrypt"

export const encryptPassword = (password: string): string => {
  const salt = genSaltSync(BCRYPT_DEFAULT_VALUES.SALT_ROUNDS)
  const dataHash = hashSync(password, salt)
  return dataHash
}