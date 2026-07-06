import user from '../fixtures/user.json'
import CheckoutPage from '../pages/CheckoutPage'

Cypress.on('uncaught:exception', () => false)

describe('User Story 05 - Checkout', () => {
  const checkoutPage = new CheckoutPage()

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/')

    cy.login()
    cy.addNutukToCart()
  })

  it('US05-TC01 Kullanıcı "Satın Al" butonuna tıkladığında adres bilgileri sayfasına yönlendirilmelidir', () => {
    checkoutPage.clickBuyButton()
    checkoutPage.loginIfRedirected(user.email, user.password)
    checkoutPage.verifyOrderPage()
    checkoutPage.verifyAddressInfoVisible()
    checkoutPage.waitForVideo()
  })

  it('US05-TC02 Kullanıcı ödeme sayfasında mevcut ödeme yöntemlerini görüntüleyebilmelidir', () => {
    checkoutPage.clickBuyButton()
    checkoutPage.loginIfRedirected(user.email, user.password)
    checkoutPage.verifyOrderPage()
    checkoutPage.goToPaymentPage()
    checkoutPage.verifyPaymentMethodsVisible()
    checkoutPage.waitForVideo()
  })

  it('US05-TC03 Kullanıcı kredi kartı alanlarını görüntüleyebilmelidir', () => {
    checkoutPage.clickBuyButton()
    checkoutPage.loginIfRedirected(user.email, user.password)
    checkoutPage.verifyOrderPage()
    checkoutPage.goToPaymentPage()
    checkoutPage.openCardPaymentForm()
    checkoutPage.verifyCardFieldsVisible()
    checkoutPage.waitForVideo()
  })

  it.only('US05-TC04 Kullanıcı geçerli kart bilgilerini girdiğinde ödeme butonu aktif olmalıdır', () => {
    checkoutPage.clickBuyButton()
    checkoutPage.loginIfRedirected(user.email, user.password)
    checkoutPage.verifyOrderPage()
    checkoutPage.goToPaymentPage()
    checkoutPage.openCardPaymentForm()
    checkoutPage.fillCardInfo()
    checkoutPage.verifyPayButtonActive()
    checkoutPage.waitForVideo()
  })

  it('US05-TC05 Zorunlu kart bilgileri eksik bırakıldığında kullanıcı siparişi tamamlayamamalıdır', () => {
    checkoutPage.clickBuyButton()
    checkoutPage.loginIfRedirected(user.email, user.password)
    checkoutPage.verifyOrderPage()
    checkoutPage.goToPaymentPage()
    checkoutPage.openCardPaymentForm()
    checkoutPage.clickPayButton()
    checkoutPage.verifyStillOnPaymentPage()
    checkoutPage.waitForVideo()
  })

  it('US05-TC06 Kullanıcı ödeme adımında sipariş özetini ve toplam tutarı görüntüleyebilmelidir', () => {
    checkoutPage.clickBuyButton()
    checkoutPage.loginIfRedirected(user.email, user.password)
    checkoutPage.verifyOrderPage()
    checkoutPage.goToPaymentPage()
    checkoutPage.verifyOrderSummary()
    checkoutPage.waitForVideo()
  })
})