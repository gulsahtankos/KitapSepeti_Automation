import ProductDetailPage from '../pages/ProductDetailPage'

Cypress.on('uncaught:exception', () => false)

describe('User Story 03 - Product Detail', () => {
  const productDetailPage = new ProductDetailPage()

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/')

    cy.acceptCookies()
  })

  it('US03-TC01 Ürün listesinde ürün adına tıklanarak ürün detay sayfasına yönlendirilebilmelidir', () => {
    productDetailPage.searchProduct('Nutuk')
    productDetailPage.openFirstProductDetail()
    productDetailPage.verifyProductDetailPage()
    productDetailPage.waitForVideo()
  })

  it('US03-TC02 Kullanıcı ürün detay sayfasında ürün bilgilerini görüntüleyebilmelidir', () => {
    productDetailPage.searchProduct('Nutuk')
    productDetailPage.openFirstProductDetail()
    productDetailPage.verifyProductInformation()
    productDetailPage.waitForVideo()
  })

  it('US03-TC03 Kullanıcı ürünü ürün detay sayfasından sepete ekleyebilmelidir', () => {
    productDetailPage.searchProduct('Nutuk')
    productDetailPage.openFirstProductDetail()
    productDetailPage.addProductToCart()
    productDetailPage.waitForVideo()
  })

  it('US03-TC04 Sepete ekleme sonrası başarı mesajı ve butonlar görüntülenmelidir', () => {
    productDetailPage.searchProduct('Nutuk')
    productDetailPage.openFirstProductDetail()
    productDetailPage.addProductToCart()
    productDetailPage.verifyAddToCartSuccess()
    productDetailPage.waitForVideo()
  })

  it('US03-TC05 Sepete ekleme sonrası sepet ikonundaki ürün sayısı güncellenmelidir', () => {
    productDetailPage.searchProduct('Nutuk')
    productDetailPage.openFirstProductDetail()
    productDetailPage.addProductToCart()
    productDetailPage.verifyCartCount()
    productDetailPage.waitForVideo()
  })
})