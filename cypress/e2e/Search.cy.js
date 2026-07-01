import user from '../fixtures/user.json'

Cypress.on('uncaught:exception', () => false)

describe('User Story 02 - Search', () => {

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/')

    cy.acceptCookies()
  })

  it('US02-TC01 Geçerli ürün adı ile arama yapılabilmelidir', () => {
    cy.get('input[placeholder="Aradığınız ürünün adını yazınız."]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type('Nutuk')

    cy.get('#live-search-btn')
      .should('be.visible')
      .click({ force: true })

    cy.get('body', { timeout: 10000 })
      .should('contain.text', 'Nutuk')
  })

  it('US02-TC02 Geçersiz ürün adı ile arama yapılabilmelidir', () => {
    cy.get('input[placeholder="Aradığınız ürünün adını yazınız."]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type('asdfqwerty123')

    cy.get('#live-search-btn')
      .should('be.visible')
      .click({ force: true })

    cy.url({ timeout: 10000 })
      .should('include', 'arama')

    cy.get('body', { timeout: 10000 })
      .should('be.visible')
  })

  it('US02-TC03 Geçerli arama sonucunda ürün kartı bilgileri görüntülenmelidir', () => {
    cy.get('input[placeholder="Aradığınız ürünün adını yazınız."]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type('Nutuk')

    cy.get('#live-search-btn')
      .should('be.visible')
      .click({ force: true })

    cy.get('.product-item', { timeout: 10000 })
      .first()
      .should('be.visible')
      .within(() => {
        cy.get('img')
          .should('be.visible')

        cy.get('a.product-title')
          .should('be.visible')
          .and('contain.text', 'Nutuk')

        cy.get('.product-price, .current-price, .price, [class*="price"]')
          .filter(':visible')
          .should('contain.text', 'TL')
      })
  })

  it('US02-TC04 Ürün kartındaki Sepete Ekle butonu görüntülenmelidir', () => {
  cy.get('input[placeholder="Aradığınız ürünün adını yazınız."]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type('Nutuk')

  cy.get('#live-search-btn')
    .should('be.visible')
    .click({ force: true })

  cy.get('.product-item', { timeout: 10000 })
    .first()
    .scrollIntoView()
    .trigger('mouseover', { force: true })

  cy.contains('Sepete Ekle', { timeout: 10000 })
    .should('exist')
  })
  it('US02-TC05 Ürün Sepete Ekle butonuna tıklanarak sepete eklenebilmelidir', () => {

  cy.get('input[placeholder="Aradığınız ürünün adını yazınız."]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type('Nutuk')

  cy.get('#live-search-btn')
    .should('be.visible')
    .click({ force: true })

  cy.get('.product-item', { timeout: 10000 })
    .first()
    .scrollIntoView()
    .trigger('mouseover', { force: true })

  cy.contains('Sepete Ekle')
    .first()
    .click({ force: true })

  cy.contains('Ürün Başarıyla Sepete Eklendi', { timeout: 10000 })
    .should('be.visible')
})
it('US02-TC06 Kullanıcı sıralama seçeneklerini kullanarak ürünleri sıralayabilmelidir', () => {

  cy.get('input[placeholder="Aradığınız ürünün adını yazınız."]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type('Nutuk')

  cy.get('#live-search-btn')
    .click({ force: true })

  cy.get('#sort', { timeout: 10000 })
    .should('be.visible')
    .select('Fiyat Artan')

  cy.get('#sort')
    .find(':selected')
    .should('contain.text', 'Fiyat Artan')
})
it('US02-TC07 Kullanıcı filtreleme seçeneklerini kullanarak ürünleri filtreleyebilmelidir', () => {
  cy.get('input[placeholder="Aradığınız ürünün adını yazınız."]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type('Nutuk')

  cy.get('#live-search-btn')
    .should('be.visible')
    .click({ force: true })

  cy.get('input[id^="brand_"]', { timeout: 10000 })
    .first()
    .check({ force: true })

  cy.contains('Seçimi Filtrele')
    .click({ force: true })

  cy.get('.product-item', { timeout: 10000 })
    .should('have.length.greaterThan', 0)

  cy.get('.product-item')
    .first()
    .should('be.visible')

})
it('US02-TC08 Kullanıcı sayfayı aşağı kaydırdığında yeni ürünler yüklenmelidir', () => {

  cy.get('input[placeholder="Aradığınız ürünün adını yazınız."]')
    .clear()
    .type('Nutuk')

  cy.get('#live-search-btn').click()

  cy.get('.product-item')
    .should('have.length.greaterThan', 0)

  cy.scrollTo('bottom')

  cy.wait(2000)

  cy.get('.product-item')
    .should('have.length.greaterThan', 0)
    .last()
    .scrollIntoView()
    .should('be.visible')

})

})