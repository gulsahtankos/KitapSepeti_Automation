import SearchPage from '../pages/SearchPage'

Cypress.on('uncaught:exception', () => false)

describe('User Story 02 - Search', () => {
  const searchPage = new SearchPage()

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/')

    cy.acceptCookies()
  })

  it('US02-TC01 Geçerli ürün adı ile arama yapılabilmelidir', () => {
    searchPage.searchProduct('Nutuk')
    searchPage.verifyBodyContains('Nutuk')
    searchPage.waitForVideo()
  })

  it('US02-TC02 Geçersiz ürün adı ile arama yapılabilmelidir', () => {
    searchPage.searchProduct('asdfqwerty123')
    searchPage.verifySearchPageOpened()
    searchPage.waitForVideo()
  })

  it('US02-TC03 Geçerli arama sonucunda ürün kartı bilgileri görüntülenmelidir', () => {
    searchPage.searchProduct('Nutuk')
    searchPage.verifyFirstProductCard('Nutuk')
    searchPage.waitForVideo()
  })

  it('US02-TC04 Ürün kartındaki Sepete Ekle butonu görüntülenmelidir', () => {
    searchPage.searchProduct('Nutuk')
    searchPage.hoverFirstProduct()
    searchPage.verifyAddToCartButtonVisible()
    searchPage.waitForVideo()
  })

  it('US02-TC05 Ürün Sepete Ekle butonuna tıklanarak sepete eklenebilmelidir', () => {
    searchPage.searchProduct('Nutuk')
    searchPage.hoverFirstProduct()
    searchPage.clickAddToCart()
    searchPage.verifyAddedToCartMessage()
    searchPage.waitForVideo()
  })

  it('US02-TC06 Kullanıcı sıralama seçeneklerini kullanarak ürünleri sıralayabilmelidir', () => {
    searchPage.searchProduct('Nutuk')
    searchPage.selectSortOption('Fiyat Artan')
    searchPage.waitForVideo()
  })

  it('US02-TC07 Kullanıcı filtreleme seçeneklerini kullanarak ürünleri filtreleyebilmelidir', () => {
    searchPage.searchProduct('Nutuk')
    searchPage.applyFirstBrandFilter()
    searchPage.verifyProductListVisible()
    searchPage.waitForVideo()
  })

  it('US02-TC08 Kullanıcı sayfayı aşağı kaydırdığında yeni ürünler yüklenmelidir', () => {
    searchPage.searchProduct('Nutuk')
    searchPage.scrollToBottomAndVerifyProducts()
    searchPage.waitForVideo()
  })
})