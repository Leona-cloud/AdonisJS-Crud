import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim(),
    email: vine.string().email().toLowerCase().trim(),
    password: vine.string(),
  })
)