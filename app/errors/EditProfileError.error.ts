export class EditProfileError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EditProfileError'
  }
}
