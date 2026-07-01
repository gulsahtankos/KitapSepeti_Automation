Cypress.on('uncaught:exception', () => false)

describe('US06 - Sipariş Tamamlama', () => {

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('/')

    cy.get('body').then(($body) => {
      if ($body.find('#t-modal-close-1').length) {
        cy.get('#t-modal-close-1').click({ force: true })
      }

      if ($body.text().includes('Tümünü Kabul Et')) {
        cy.contains('Tümünü Kabul Et').click({ force: true })
      }
    })

    cy.addNutukToCart()
  })

  it('US06-TC01 Kullanıcı giriş yapmadan satın alma işlemini başlattığında giriş/üye ol sayfasına yönlendirilmelidir', () => {

    cy.contains('Satın Al')
      .click({ force: true })

    cy.url().should('include', '/siparis-uye-giris')
  })
  it('US06-TC02 Kullanıcı "Üye Olmadan Devam Et" seçeneği ile misafir satın alma akışına devam edebilmelidir', () => {

  cy.contains('Satın Al')
    .click({ force: true })

  cy.url().should('include', '/siparis-uye-giris')

  cy.contains('Üye Olmadan Devam Et')
    .click({ force: true })

  cy.url().should('include', '/order')

  cy.contains('Adres Bilgileri')
    .should('be.visible')
 })

 it('US06-TC03 Misafir satın alma adres formunda zorunlu alanlar görüntülenebilmelidir', () => {

  cy.get('#cart-buy-btn').click({ force: true })

  cy.contains('Üye Olmadan Devam Et')
    .click({ force: true })

  cy.url().should('include', '/order/address')

  // Ad Soyad
  cy.get('input[name="fullname"]').should('be.visible')

cy.get('input[name="email"]').should('be.visible')

cy.get('select[name="city_code"]').should('be.visible')

cy.get('textarea[name="address"]').should('be.visible')
})
it('US06-TC04 Kullanıcı zorunlu alanları boş bıraktığında hata mesajı görüntülenmelidir', () => {

  cy.get('#cart-buy-btn').click({ force: true })

  cy.contains('Üye Olmadan Devam Et')
    .click({ force: true })

  cy.url().should('include', '/order/address')

  cy.contains('button', 'Adresi Kaydet')
    .click({ force: true })

  cy.contains('Lütfen').should('be.visible')

  cy.url().should('include', '/order/address')
})
it('US06-TC05 Kullanıcı geçerli adres bilgilerini girerek ödeme adımına ilerleyebilmelidir', () => {

  cy.get('#cart-buy-btn').click({ force: true })

  cy.contains('Üye Olmadan Devam Et')
    .click({ force: true })

  cy.url().should('include', '/order/address')

  cy.get('input[name="fullname"]')
  .type('Gülşah Tankoş', { force: true })

cy.get('input[name="email"]')
  .type('gulsah.qa.test@gmail.com', { force: true })

cy.get('select[name="city_code"]')
  .select('İstanbul', { force: true })

cy.get('select[name="town_code"]')
  .select(1, { force: true })

cy.get('select[name="district_code"]')
  .select(1, { force: true })

cy.get('textarea[name="address"]')
  .type('Test Mahallesi Test Sokak No: 1 Esenyurt İstanbul', { force: true })

cy.get('#mobile_phone')
  .type('5554443322', { force: true })

  cy.contains('Adresi Kaydet', { timeout: 10000 })
  .click({ force: true })

cy.url({ timeout: 10000 })
  .should('include', '/order/payment')

})
})