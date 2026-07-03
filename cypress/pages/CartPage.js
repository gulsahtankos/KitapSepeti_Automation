class CartPage {
  searchInput = 'input[placeholder="Aradığınız ürünün adını yazınız."]'
  cartTitle = '.cart-item-title'
  price = '.price-sell'
  quantityInput = '.cart-item-qty input'
  plusButton = '.cart-item-qty .ti-plus'
  minusButton = '.cart-item-qty .ti-minus'
  totalPrice = '.cart-price-box .row.fw-bold .text-right'

  acceptCookies() {
    cy.get('body').then(($body) => {
      if ($body.text().includes('Tümünü Kabul Et')) {
        cy.contains('Tümünü Kabul Et').click({ force: true })
      }
    })
  }

  addNutukToCart() {
    cy.get(this.searchInput, { timeout: 10000 })
      .should('be.visible')
      .type('Nutuk{enter}', { force: true })

    cy.contains('Nutuk', { timeout: 10000 })
      .first()
      .click({ force: true })

    cy.contains('Sepete Ekle', { timeout: 10000 })
      .click({ force: true })

    cy.contains('Sepete Git', { timeout: 10000 })
      .click({ force: true })
  }

  verifyCartPage() {
    cy.url({ timeout: 10000 })
      .should('include', 'sepet')
  }

  verifyCartSummary() {
    cy.contains('Genel Toplam', { timeout: 10000 })
      .should('be.visible')

    cy.contains('Sepet Toplamı', { timeout: 10000 })
      .should('be.visible')
  }

  verifyProductInformation() {
    cy.get(this.cartTitle, { timeout: 10000 })
      .should('contain', 'Nutuk')

    cy.get(this.price)
      .should('be.visible')

    cy.get(this.quantityInput)
      .should('be.visible')

    cy.get(this.totalPrice)
      .should('be.visible')
  }

  increaseQuantity() {
    cy.get(this.plusButton, { timeout: 10000 })
      .click({ force: true })

    cy.wait(3000)

    cy.get(this.quantityInput)
      .should('have.value', '2')

    cy.get(this.totalPrice)
      .should('be.visible')
  }

  decreaseQuantity() {
    cy.get(this.quantityInput, { timeout: 10000 })
      .should('have.value', '1')

    cy.wait(1000)

    cy.get(this.plusButton)
      .click({ force: true })

    cy.wait(3000)

    cy.get(this.quantityInput)
      .should('have.value', '2')

    cy.get(this.minusButton)
      .click({ force: true })

    cy.wait(3000)

    cy.get(this.quantityInput)
      .should('have.value', '1')
  }

  clearCart() {
    cy.visit('/sepet')

    cy.contains('Sepeti Temizle', { timeout: 10000 })
      .click({ force: true })

    cy.contains('Sepetinizde Ürün Bulunmamaktadır', { timeout: 10000 })
      .should('be.visible')

    cy.contains('Alışverişe Devam Et')
      .should('be.visible')
  }

  clickBuyButton() {
    cy.get('#cart-buy-btn', { timeout: 10000 })
      .click({ force: true })

    cy.url({ timeout: 10000 })
      .should('include', '/siparis-uye-giris')

    cy.contains('Üye Girişi', { timeout: 10000 })
      .should('be.visible')

    cy.contains('Üye Olmadan Devam Et')
      .should('be.visible')
  }

  waitForVideo() {
    cy.wait(3000)
  }
}

export default CartPage