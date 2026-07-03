import CartPage from '../pages/CartPage'

Cypress.on('uncaught:exception', () => false)

describe('User Story 04 - Cart', () => {
  const cartPage = new CartPage()

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/')

    cartPage.acceptCookies()
    cartPage.addNutukToCart()
  })

  it('US04-TC01 Kullanıcı sepet sayfasına erişebilmelidir', () => {
    cartPage.verifyCartPage()
    cartPage.waitForVideo()
  })

  it('US04-TC02 Kullanıcı sepet sayfasındaki ürün bilgilerini görüntüleyebilmelidir', () => {
    cartPage.verifyProductInformation()
    cartPage.waitForVideo()
  })

  it('US04-TC03 Kullanıcı sepetteki ürün adedini artırabilmelidir', () => {
    cartPage.increaseQuantity()
  })

  it('US04-TC04 Kullanıcı sepetteki ürün adedini azaltabilmelidir', () => {
    cartPage.decreaseQuantity()
  })

  it('US04-TC05 Kullanıcı sepet ikonuna veya "Sepete Git" butonuna tıklayarak sepet sayfasına erişebilmelidir', () => {
    cartPage.verifyCartPage()
    cartPage.verifyCartSummary()
    cartPage.waitForVideo()
  })

  it('US04-TC06 Kullanıcı sepetindeki tüm ürünleri sildiğinde boş sepet ekranını görüntüleyebilmelidir', () => {
    cartPage.clearCart()
    cartPage.waitForVideo()
  })

  it('US04-TC07 Kullanıcı "Satın Al" butonunu kullanarak sipariş onay sürecine ilerleyebilmelidir', () => {
    cartPage.clickBuyButton()
    cartPage.waitForVideo()
  })
})