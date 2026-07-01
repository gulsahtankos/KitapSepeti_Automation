Cypress.on('uncaught:exception', () => false)

describe('User Story 04 - Cart', () => {

  beforeEach(() => {
    cy.visit('/')

    cy.get('body').then(($body) => {
      if ($body.text().includes('Tümünü Kabul Et')) {
        cy.contains('Tümünü Kabul Et').click({ force: true })
      }
    })

    cy.get('input[placeholder="Aradığınız ürünün adını yazınız."]')
      .type('Nutuk{enter}', { force: true })

    cy.contains('Nutuk')
      .first()
      .click({ force: true })

    cy.contains('Sepete Ekle')
      .click({ force: true })

    cy.contains('Sepete Git')
      .click({ force: true })
  })
it('TC-01 Kullanıcı sepet sayfasına erişebilmelidir', () => {


  cy.url()
    .should('include', 'sepet')

})
it('TC-02 Kullanıcı sepet sayfasındaki ürün bilgilerini görüntüleyebilmelidir', () => {

  cy.get('.cart-item-title')
    .should('contain', 'Nutuk')

  cy.get('.price-sell')
    .should('be.visible')

  cy.get('.cart-item-qty input')
    .should('be.visible')

  cy.get('.cart-price-box .row.fw-bold .text-right')
    .should('be.visible')


})
it('TC-03 Kullanıcı sepetteki ürün adedini artırabilmelidir', () => {

  cy.get('.cart-item-qty .ti-plus')
    .click()

  cy.get('.cart-item-qty input')
    .should('have.value', '2')

  cy.get('.cart-price-box .row.fw-bold .text-right')
    .should('be.visible')

})
it('TC-04 Kullanıcı sepetteki ürün adedini azaltabilmelidir', () => {

  cy.scrollTo('top')

  cy.get('.cart-item-qty input')
    .should('be.visible')
    .should('have.value', '1')

  cy.wait(1000)

  cy.get('.cart-item-qty .ti-plus')
    .click()

  cy.scrollTo('top')

  cy.get('.cart-item-qty input')
    .should('have.value', '2')

  cy.wait(1000)

  cy.get('.cart-item-qty .ti-minus')
    .click()

  cy.scrollTo('top')

  cy.get('.cart-item-qty input')
    .should('have.value', '1')

})
it('US04-TC05 Kullanıcı sepet ikonuna veya "Sepete Git" butonuna tıklayarak sepet sayfasına erişebilmelidir', () => {

  cy.contains('Nutuk').click()

  cy.contains('Sepete Ekle')
    .click({ force: true })

  cy.get('.custom-cart')
    .click()
    cy.get('body').then(($body) => {
  if ($body.find('#cart-popup-go-cart').length) {
    cy.get('#cart-popup-go-cart').click({ force: true })
  }
})

  cy.contains('Genel Toplam')
    .should('be.visible')

  cy.url()
    .should('include', '/sepet')

  cy.contains('Sepet Toplamı')
    .should('be.visible')

})
it('US04-TC06 Kullanıcı sepetindeki tüm ürünleri sildiğinde boş sepet ekranını görüntüleyebilmelidir', () => {

  cy.visit('/sepet')

  cy.contains('Sepeti Temizle')
    .click({ force: true })

  cy.contains('Sepetinizde Ürün Bulunmamaktadır')
    .should('be.visible')

  cy.contains('Alışverişe Devam Et')
    .should('be.visible')

})
it('US04-TC07 Kullanıcı "Satın Al" butonunu kullanarak sipariş onay sürecine ilerleyebilmelidir', () => {

  cy.get('#cart-buy-btn')
    .click({ force: true })

  cy.url()
    .should('include', '/siparis-uye-giris')

  cy.contains('Üye Girişi')
    .should('be.visible')

  cy.contains('Üye Olmadan Devam Et')
    .should('be.visible')

})
})