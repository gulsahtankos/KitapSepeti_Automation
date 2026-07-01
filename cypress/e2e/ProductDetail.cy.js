Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
describe('User Story 03 - Ürün Detay Sayfası', () => {

  beforeEach(() => {
    cy.visit('/')

    cy.get('body').then(($body) => {
      if ($body.find('.fancybox-close-small').length > 0) {
        cy.get('.fancybox-close-small').click({ force: true })
      }

      if ($body.text().includes('Tümünü Kabul Et')) {
        cy.contains('Tümünü Kabul Et').click({ force: true })
      }
    })
  })

  Cypress.on('uncaught:exception', () => false)

describe('User Story 03 - Product Detail', () => {

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/')

    cy.acceptCookies()
  })

  it('US03-TC01 Ürün listesinde ürün görseline veya ürün adına tıklanarak ürün detay sayfasına yönlendirilebilmelidir', () => {
    cy.get('input[placeholder="Aradığınız ürünün adını yazınız."]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type('Nutuk')

    cy.get('#live-search-btn')
      .should('be.visible')
      .click({ force: true })

    cy.get('a.product-title', { timeout: 10000 })
      .first()
      .should('be.visible')
      .click({ force: true })

    cy.url({ timeout: 10000 })
      .should('include', 'nutuk')

    cy.get('body', { timeout: 10000 })
      .should('contain.text', 'Nutuk')
  })
it('US03-TC02 Kullanıcı ürün detay sayfasında ürün bilgilerini ve ürün özelliklerini görüntüleyebilmelidir', () => {
  cy.get('input[placeholder="Aradığınız ürünün adını yazınız."]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type('Nutuk')

  cy.get('#live-search-btn')
    .should('be.visible')
    .click({ force: true })

  cy.get('a.product-title', { timeout: 10000 })
    .first()
    .click({ force: true })

  cy.get('#product-title', { timeout: 10000 })
    .should('be.visible')
    .and('contain.text', 'Nutuk')

  cy.get('#model-title')
    .should('be.visible')
    .and('contain.text', 'Mustafa Kemal Atatürk')

  cy.get('#brand-title')
    .should('be.visible')
    .and('contain.text', 'Yuva Yayınları')

  cy.get('.product-current-price .product-price')
    .should('be.visible')
  cy.get('#addToCartBtn')
    .should('be.visible')
    .and('contain.text', 'Sepete Ekle')

})
it('TC-03 Kullanıcı ürünü ürün detay sayfasından sepete ekleyebilmelidir', () => {

  cy.get('#live-search')
    .type('Nutuk')

  cy.get('#live-search-btn')
    .click()

  cy.contains('a', 'Nutuk')
    .first()
    .click()

  cy.get('#addToCartBtn')
    .should('be.visible')
    .and('not.be.disabled')
    .click()

})
it('TC-04 Sepete ekleme sonrası başarı mesajı, Sepete Git ve Satın Al butonları görüntülenmelidir', () => {

  cy.get('#live-search')
    .type('Nutuk')

  cy.get('#live-search-btn')
    .click()

  cy.contains('a', 'Nutuk')
    .first()
    .click()

  cy.get('#addToCartBtn')
    .should('be.visible')
    .click()

  cy.contains('Ürün Başarıyla Sepete Eklendi')
    .should('be.visible')

  cy.get('#cart-popup-go-cart')
    .should('be.visible')

  cy.get('#cart-popup-continue-shopping')
    .should('be.visible')


})
it('TC-05 Sepete ekleme sonrası sepet ikonundaki ürün sayısı güncellenmelidir', () => {

  cy.get('#live-search')
    .type('Nutuk')

  cy.get('#live-search-btn')
    .click()

  cy.contains('a', 'Nutuk')
    .first()
    .click()

  cy.get('#addToCartBtn')
    .click()

  cy.contains('Ürün Başarıyla Sepete Eklendi')
    .should('be.visible')

  cy.get('.cart-soft-count')
    .should('contain', '1')


})
})
})
