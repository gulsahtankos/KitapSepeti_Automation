class LoginPage {
  accountButton = '#header-account'
  emailInput = '#header-email'
  passwordInput = '#header-password'
  modalCloseButton = '#t-modal-close-1'
  acceptCookiesText = 'Tümünü Kabul Et'
  loginErrorText = 'Giriş bilgileriniz hatalı'
  securityCodeText = 'Güvenlik kodunu doldurunuz'
  forgotPasswordText = 'Şifremi Unuttum'

  closePopups() {
    cy.get('body', { timeout: 10000 }).then(($body) => {
      if ($body.find(this.modalCloseButton).length) {
        cy.get(this.modalCloseButton).click({ force: true })
      }

      if ($body.text().includes(this.acceptCookiesText)) {
        cy.contains(this.acceptCookiesText).click({ force: true })
      }
    })
  }

  openLoginForm() {
    cy.get(this.accountButton, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true })

    cy.wait(1000)
  }

  typeEmail(email) {
    cy.get(this.emailInput, { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(email)
  }

  typePassword(password) {
    cy.get(this.passwordInput, { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(password)
  }

  clickLoginButton() {
    cy.get(this.emailInput)
      .parents('form')
      .find('button')
      .contains('Giriş')
      .click({ force: true })
  }

  login(email, password) {
    this.openLoginForm()
    this.typeEmail(email)
    this.typePassword(password)
    this.clickLoginButton()
  }

  verifySuccessfulLogin() {
    cy.wait(3000)

    cy.get('body', { timeout: 10000 })
      .should('not.contain.text', this.loginErrorText)
      .and('not.contain.text', this.securityCodeText)

    cy.get(this.accountButton, { timeout: 10000 })
      .should('be.visible')
  }

  verifyLoginError() {
    cy.get('body', { timeout: 10000 })
      .should('contain.text', this.loginErrorText)

    cy.wait(3000)
  }

  verifyLoginFormVisible() {
    cy.get(this.emailInput, { timeout: 10000 })
      .should('be.visible')

    cy.get(this.passwordInput)
      .should('be.visible')

    cy.wait(3000)
  }

  clickForgotPassword() {
    cy.contains(this.forgotPasswordText, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true })
  }

  verifyForgotPasswordPage() {
    cy.url({ timeout: 10000 })
      .should('include', 'uye-sifre-hatirlat')

    cy.get('body')
      .should('contain.text', 'E-posta')

    cy.wait(3000)
  }
}

export default LoginPage