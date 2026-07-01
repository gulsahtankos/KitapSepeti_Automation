import user from '../fixtures/user.json'

Cypress.on('uncaught:exception', () => false)

describe('User Story 01 - Login', () => {

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/')

    cy.get('body', { timeout: 10000 }).then(($body) => {
      if ($body.find('#t-modal-close-1').length) {
        cy.get('#t-modal-close-1').click({ force: true })
      }

      if ($body.text().includes('Tümünü Kabul Et')) {
        cy.contains('Tümünü Kabul Et').click({ force: true })
      }
    })
  })

 it('US01-TC01 Geçerli kullanıcı giriş yapabilmelidir', () => {
  cy.get('#header-account', { timeout: 10000 }).click({ force: true })

  cy.get('#header-email', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type(user.email)

  cy.get('#header-password')
    .should('be.visible')
    .clear()
    .type(user.password)

  cy.get('#header-email')
    .parents('form')
    .find('button')
    .contains('Giriş')
    .click({ force: true })
  cy.wait(3000)
  cy.get('body', { timeout: 10000 })
    .should('not.contain.text', 'Giriş bilgileriniz hatalı')
    .and('not.contain.text', 'Güvenlik kodunu doldurunuz')

  cy.get('#header-account', { timeout: 10000 })
    .should('be.visible')
})
  it('US01-TC02 Yanlış şifre ile giriş yapılamamalıdır', () => {
    cy.get('#header-account', { timeout: 10000 }).click({ force: true })

    cy.get('#header-email', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(user.email)

    cy.get('#header-password')
      .should('be.visible')
      .clear()
      .type('YanlisSifre123')

    cy.get('#header-email')
      .parents('form')
      .find('button')
      .contains('Giriş')
      .click({ force: true })
  })

  it('US01-TC03 Geçersiz e-posta formatı ile giriş yapılamamalıdır', () => {
    cy.get('#header-account', { timeout: 10000 }).click({ force: true })

    cy.get('#header-email', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type('gecersizmail')

    cy.get('#header-password')
      .should('be.visible')
      .clear()
      .type(user.password)

    cy.get('#header-email')
      .parents('form')
      .find('button')
      .contains('Giriş')
      .click({ force: true })

    cy.get('body', { timeout: 10000 })
      .should('contain.text', 'Giriş bilgileriniz hatalı')
  })

  it('US01-TC04 E-posta alanı boş bırakılarak giriş yapılamamalıdır', () => {
    cy.get('#header-account', { timeout: 10000 }).click({ force: true })

    cy.get('#header-password', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(user.password)

    cy.get('#header-email')
      .parents('form')
      .find('button')
      .contains('Giriş')
      .click({ force: true })
  })

  it('US01-TC05 Şifre alanı boş bırakılarak giriş yapılamamalıdır', () => {
    cy.get('#header-account', { timeout: 10000 }).click({ force: true })

    cy.get('#header-email', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(user.email)

    cy.get('#header-email')
      .parents('form')
      .find('button')
      .contains('Giriş')
      .click({ force: true })
  })

  it.skip('US01-TC06 Çoklu hatalı giriş denemesinde güvenlik kodu görüntülenmelidir', () => {
    cy.get('#header-account', { timeout: 10000 }).click({ force: true })
  })

  it.only('US01-TC07 Şifremi unuttum bağlantısı görüntülenmelidir', () => {
  cy.get('#header-account', { timeout: 10000 }).click({ force: true })

  cy.contains('Şifremi Unuttum')
    .should('be.visible')
    .click()

  cy.url({ timeout: 10000 })
    .should('include', 'uye-sifre-hatirlat')

  cy.get('body')
    .should('contain.text', 'E-posta')
  })

})
