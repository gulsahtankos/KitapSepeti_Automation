import user from '../fixtures/user.json'

Cypress.Commands.add('acceptCookies', () => {
  cy.get('body', { timeout: 10000 }).then(($body) => {

    if ($body.find('#t-modal-close-1').length) {
      cy.get('#t-modal-close-1').click({ force: true })
    }

    if ($body.text().includes('Tümünü Kabul Et')) {
      cy.contains('Tümünü Kabul Et').click({ force: true })
    }

  })
})

Cypress.Commands.add('login', () => {

  cy.acceptCookies()

  cy.get('#header-account')
    .click({ force: true })

  cy.get('#header-email')
    .clear({ force: true })
    .type(user.email, { force: true })

  cy.get('#header-password')
    .clear({ force: true })
    .type(user.password, { force: true })

  cy.contains('Giriş Yap')
    .click({ force: true })

  cy.contains('Hesabım', { timeout: 10000 })
    .should('exist')

  cy.wait(1000)

})

 Cypress.Commands.add('addNutukToCart', () => {
  cy.visit('/nutuk-569210')

  cy.contains('Sepete Ekle', { timeout: 10000 })
    .click({ force: true })

  cy.get('body').then(($body) => {
    if ($body.find('#cart-popup-go-cart').length) {
      cy.get('#cart-popup-go-cart')
        .click({ force: true })
    } else {
      cy.visit('/sepet')
    }
  })

  cy.url()
    .should('include', '/sepet')
})