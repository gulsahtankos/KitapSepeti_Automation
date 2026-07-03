import user from '../fixtures/user.json'
import LoginPage from '../pages/LoginPage'

Cypress.on('uncaught:exception', () => false)

describe('User Story 01 - Login', () => {
  const loginPage = new LoginPage()

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/')

    loginPage.closePopups()
  })

  it('US01-TC01 Geçerli kullanıcı giriş yapabilmelidir', () => {
    loginPage.login(user.email, user.password)
    loginPage.verifySuccessfulLogin()
  })

  it('US01-TC02 Yanlış şifre ile giriş yapılamamalıdır', () => {
    loginPage.login(user.email, 'YanlisSifre123')
    loginPage.verifyLoginFormVisible()
  })

  it('US01-TC03 Geçersiz e-posta formatı ile giriş yapılamamalıdır', () => {
    loginPage.login('gecersizmail', user.password)
    loginPage.verifyLoginError()
  })

  it('US01-TC04 E-posta alanı boş bırakılarak giriş yapılamamalıdır', () => {
    loginPage.openLoginForm()
    loginPage.typePassword(user.password)
    loginPage.clickLoginButton()
    loginPage.verifyLoginFormVisible()
  })

  it('US01-TC05 Şifre alanı boş bırakılarak giriş yapılamamalıdır', () => {
    loginPage.openLoginForm()
    loginPage.typeEmail(user.email)
    loginPage.clickLoginButton()
    loginPage.verifyLoginFormVisible()
  })

  it.skip('US01-TC06 Çoklu hatalı giriş denemesinde güvenlik kodu görüntülenmelidir', () => {
    loginPage.openLoginForm()
  })

  it('US01-TC07 Şifremi unuttum bağlantısı görüntülenmelidir', () => {
    loginPage.openLoginForm()
    loginPage.clickForgotPassword()
    loginPage.verifyForgotPasswordPage()
  })
})