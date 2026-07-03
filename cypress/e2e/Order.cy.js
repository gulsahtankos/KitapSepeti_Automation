import OrderPage from '../pages/OrderPage'

Cypress.on('uncaught:exception', () => false)

describe('US06 - Sipariş Tamamlama', () => {
  const orderPage = new OrderPage()

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('/')

    orderPage.acceptCookiesAndCloseModal()

    cy.addNutukToCart()
  })

  it('US06-TC01 Kullanıcı giriş yapmadan satın alma işlemini başlattığında giriş/üye ol sayfasına yönlendirilmelidir', () => {
    orderPage.clickBuyButton()
    orderPage.verifyLoginPage()
    orderPage.waitForVideo()
  })

  it('US06-TC02 Kullanıcı "Üye Olmadan Devam Et" seçeneği ile misafir satın alma akışına devam edebilmelidir', () => {
    orderPage.clickBuyButton()
    orderPage.verifyLoginPage()
    orderPage.continueWithoutLogin()
    orderPage.verifyAddressPage()
    orderPage.waitForVideo()
  })

  it('US06-TC03 Misafir satın alma adres formunda zorunlu alanlar görüntülenebilmelidir', () => {
    orderPage.clickBuyButton()
    orderPage.continueWithoutLogin()
    orderPage.verifyRequiredAddressFields()
    orderPage.waitForVideo()
  })

  it('US06-TC04 Kullanıcı zorunlu alanları boş bıraktığında hata mesajı görüntülenmelidir', () => {
    orderPage.clickBuyButton()
    orderPage.continueWithoutLogin()
    orderPage.clickSaveAddress()
    orderPage.verifyRequiredFieldError()
    orderPage.waitForVideo()
  })

  it('US06-TC05 Kullanıcı geçerli adres bilgilerini girerek ödeme adımına ilerleyebilmelidir', () => {
    orderPage.clickBuyButton()
    orderPage.continueWithoutLogin()
    orderPage.verifyRequiredAddressFields()
    orderPage.fillAddressForm()
    orderPage.clickSaveAddress()
    orderPage.verifyPaymentPage()
    orderPage.waitForVideo()
  })
})