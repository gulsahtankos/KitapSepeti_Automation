class SearchPage {
  searchInput = 'input[placeholder="Aradığınız ürünün adını yazınız."]'
  searchButton = '#live-search-btn'
  productItem = '.product-item'
  productTitle = 'a.product-title'
  priceSelectors = '.product-price, .current-price, .price, [class*="price"]'
  sortSelect = '#sort'
  brandFilter = 'input[id^="brand_"]'
  filterButtonText = 'Seçimi Filtrele'

  searchProduct(productName) {
    cy.get(this.searchInput, { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(productName)

    cy.get(this.searchButton)
      .should('be.visible')
      .click({ force: true })
  }

  verifyBodyContains(text) {
    cy.get('body', { timeout: 10000 })
      .should('contain.text', text)
  }

  verifySearchPageOpened() {
    cy.url({ timeout: 10000 })
      .should('include', 'arama')

    cy.get('body', { timeout: 10000 })
      .should('be.visible')
  }

  verifyFirstProductCard(productName) {
    cy.get(this.productItem, { timeout: 10000 })
      .first()
      .should('be.visible')
      .within(() => {
        cy.get('img')
          .should('be.visible')

        cy.get(this.productTitle)
          .should('be.visible')
          .and('contain.text', productName)

        cy.get(this.priceSelectors)
          .filter(':visible')
          .should('contain.text', 'TL')
      })
  }

  hoverFirstProduct() {
    cy.get(this.productItem, { timeout: 10000 })
      .first()
      .scrollIntoView()
      .trigger('mouseover', { force: true })
  }

  verifyAddToCartButtonVisible() {
    cy.contains('Sepete Ekle', { timeout: 10000 })
      .should('exist')
  }

  clickAddToCart() {
    cy.contains('Sepete Ekle', { timeout: 10000 })
      .first()
      .click({ force: true })
  }

  verifyAddedToCartMessage() {
    cy.contains('Ürün Başarıyla Sepete Eklendi', { timeout: 10000 })
      .should('be.visible')
  }

  selectSortOption(optionText) {
    cy.get(this.sortSelect, { timeout: 10000 })
      .should('be.visible')
      .select(optionText)

    cy.get(this.sortSelect)
      .find(':selected')
      .should('contain.text', optionText)
  }

  applyFirstBrandFilter() {
    cy.get(this.brandFilter, { timeout: 10000 })
      .first()
      .check({ force: true })

    cy.contains(this.filterButtonText)
      .click({ force: true })
  }

  verifyProductListVisible() {
    cy.get(this.productItem, { timeout: 10000 })
      .should('have.length.greaterThan', 0)

    cy.get(this.productItem)
      .first()
      .should('be.visible')
  }

  scrollToBottomAndVerifyProducts() {
    cy.get(this.productItem, { timeout: 10000 })
      .should('have.length.greaterThan', 0)

    cy.scrollTo('bottom')

    cy.wait(2000)

    cy.get(this.productItem)
      .should('have.length.greaterThan', 0)
      .last()
      .scrollIntoView()
      .should('be.visible')
  }

  waitForVideo() {
    cy.wait(2000)
  }
}

export default SearchPage