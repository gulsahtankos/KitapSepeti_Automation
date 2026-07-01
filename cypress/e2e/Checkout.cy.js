import user from '../fixtures/user.json'

Cypress.on('uncaught:exception', () => false)

describe('User Story 05 - Checkout', () => {

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('/')

    cy.login()

    cy.addNutukToCart()
  })

  it('US05-TC01 Kullanıcı "Satın Al" butonuna tıkladığında adres bilgileri sayfasına yönlendirilmelidir', () => {

    cy.contains('Satın Al', { timeout: 10000 })
      .click({ force: true })

    cy.url().then((url) => {
      if (url.includes('/siparis-uye-giris')) {
        cy.get('input[placeholder="E-posta adresinizi giriniz"]')
          .clear({ force: true })
          .type(user.email, { force: true })

        cy.get('input[placeholder="Şifrenizi giriniz"]')
          .clear({ force: true })
          .type(user.password, { force: true })

        cy.contains('GİRİŞ YAP')
          .click({ force: true })
      }
    })

    cy.url({ timeout: 10000 })
      .should('include', '/order')

    cy.contains('Adres Bilgileri', { timeout: 10000 })
      .should('be.visible')

  })

  it('US05-TC02 Kullanıcı ödeme sayfasında mevcut ödeme yöntemlerini görüntüleyebilmelidir', () => {

    cy.contains('Satın Al', { timeout: 10000 })
      .click({ force: true })

    cy.url().then((url) => {
      if (url.includes('/siparis-uye-giris')) {
        cy.get('input[placeholder="E-posta adresinizi giriniz"]')
          .clear({ force: true })
          .type(user.email, { force: true })

        cy.get('input[placeholder="Şifrenizi giriniz"]')
          .clear({ force: true })
          .type(user.password, { force: true })

        cy.contains('GİRİŞ YAP')
          .first()
          .click({ force: true })
      }
    })

    cy.url({ timeout: 10000 })
      .should('include', '/order')

    cy.contains('Ödeme Bilgileri', { timeout: 10000 })
      .click({ force: true })

    cy.url({ timeout: 10000 })
      .should('include', '/order/payment')

    cy.get('input[type="radio"]', { timeout: 10000 })
      .should('have.length.at.least', 1)

  })
  it('US05-TC03 Kullanıcı kredi kartı alanlarını görüntüleyebilmelidir', () => {

  cy.contains('Satın Al')
    .click({ force: true })

  cy.url({ timeout: 10000 })
    .should('include', '/order')

  cy.contains('Ödeme Bilgileri')
    .click({ force: true })

  cy.url({ timeout: 10000 })
    .should('include', '/order/payment')

  cy.get('iframe', { timeout: 10000 })
    .should('exist')
})
it('US05-TC04 Kullanıcı geçerli kart bilgilerini girdiğinde Siparişi Tamamla butonu aktif olmalıdır', () => {

  cy.contains('Satın Al')
  .click({ force: true })
  cy.contains('button', /Ödeme|Devam|İlerle|Sonraki/i, { timeout: 10000 })
  .click({ force: true })

cy.url().should('include', '/order/payment')
  
cy.contains('Ön Bilgilendirme Formunu', { timeout: 10000 })
  .click({ force: true })
  cy.get('#t-modal-close-1', { timeout: 10000 })
  .click({ force: true })

  cy.get('#ccnumber', { timeout: 10000 })
    .should('be.visible')
    .type('4111111111111111', { force: true })

  cy.get('#ccexp')
    .should('be.visible')
    .type('12/30', { force: true })

  cy.get('#cccvc')
    .should('be.visible')
    .type('123', { force: true })

  cy.contains('button', 'ÖDE')
    .should('be.visible')
    .and('not.be.disabled')
})
it('US05-TC05 Zorunlu kart bilgileri eksik bırakıldığında kullanıcı hata mesajı görmeli ve siparişi tamamlayamamalıdır', () => {

  cy.contains('Satın Al')
    .click({ force: true })

  cy.contains('button', /Ödeme|Devam|İlerle|Sonraki/i, { timeout: 10000 })
    .click({ force: true })

  cy.url().should('include', '/order/payment')

  cy.contains('Ön Bilgilendirme Formunu', { timeout: 10000 })
    .click({ force: true })
  cy.get('#t-modal-close-1', { timeout: 10000 })
  .click({ force: true })
  cy.get('#ccnumber', { timeout: 10000 })
    .should('be.visible')
    .should('have.value', '')

  cy.get('#ccexp')
    .should('be.visible')
    .should('have.value', '')

  cy.get('#cccvc')
    .should('be.visible')
    .should('have.value', '')

  cy.contains('button', 'ÖDE')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true })

  cy.url().should('include', '/order/payment')
})
it('US05-TC06 Kullanıcı ödeme adımında sipariş özetini ve toplam tutarı görüntüleyebilmelidir', () => {
  cy.scrollTo('right', { ensureScrollable: false })
  cy.contains('Satın Al')
    .click({ force: true })

  cy.contains('button', /Ödeme|Devam|İlerle|Sonraki/i, { timeout: 10000 })
    .click({ force: true })

  cy.url().should('include', '/order/payment')

 cy.contains('Sepet Toplamı', { timeout: 10000 })
  .should('exist')

cy.contains('Kargo Ücreti')
  .should('exist')

cy.contains('Genel Toplam')
  .should('exist')

  // Ürün adı görünmelidir
  cy.contains('Nutuk')
    .should('be.visible')

  // Genel Toplam alanı görünmelidir
  cy.contains('Genel Toplam')
    .should('be.visible')
})
})