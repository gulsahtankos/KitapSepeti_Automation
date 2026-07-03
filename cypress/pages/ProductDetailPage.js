class ProductDetailPage {
  searchInput = 'input[placeholder="Aradığınız ürünün adını yazınız."]'
  searchButton = '#live-search-btn'
  productTitleLink = 'a.product-title'

  productTitle = '#product-title'
  modelTitle = '#model-title'
  brandTitle = '#brand-title'
  productPrice = '.product-current-price .product-price'
  addToCartButton = '#addToCartBtn'
  cartSuccessMessage = 'Ürün Başarıyla Sepete Eklendi'
  goToCartButton = '#cart-popup-go-cart'
  continueShoppingButton = '#cart-popup-continue-shopping'
  cartCount = '.cart-soft-count'

  searchProduct(productName) {
    cy.get(this.searchInput, { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(productName)

    cy.get(this.searchButton)
      .should('be.visible')
      .click({ force: true })
  }

  openFirstProductDetail() {
    cy.get(this.productTitleLink, { timeout: 10000 })
      .first()
      .should('be.visible')
      .click({ force: true })
  }

  verifyProductDetailPage() {
    cy.url({ timeout: 10000 })
      .should('include', 'nutuk')

    cy.get('body', { timeout: 10000 })
      .should('contain.text', 'Nutuk')
  }

  verifyProductInformation() {
    cy.get(this.productTitle, { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Nutuk')

    cy.get(this.modelTitle)
      .should('be.visible')
      .and('contain.text', 'Mustafa Kemal Atatürk')

    cy.get(this.brandTitle)
      .should('be.visible')
      .and('contain.text', 'Yuva Yayınları')

    cy.get(this.productPrice)
      .should('be.visible')

    cy.get(this.addToCartButton)
      .should('be.visible')
      .and('contain.text', 'Sepete Ekle')
  }

  addProductToCart() {
    cy.get(this.addToCartButton, { timeout: 10000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click({ force: true })
  }

  verifyAddToCartSuccess() {
    cy.contains(this.cartSuccessMessage, { timeout: 10000 })
      .should('be.visible')

    cy.get(this.goToCartButton)
      .should('be.visible')

    cy.get(this.continueShoppingButton)
      .should('be.visible')
  }

  verifyCartCount() {
    cy.contains(this.cartSuccessMessage, { timeout: 10000 })
      .should('be.visible')

    cy.get(this.cartCount, { timeout: 10000 })
      .should('contain', '1')
  }

  waitForVideo() {
    cy.wait(3000)
  }
}

export default ProductDetailPage