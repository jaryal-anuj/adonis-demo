declare module '@ioc:Adonis/Core/Validator' {
    interface Rules {
      currentPassword(oldPassword:string): Rule
    }
}