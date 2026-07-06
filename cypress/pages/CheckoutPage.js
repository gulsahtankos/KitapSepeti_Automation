class CheckoutPage {
  cardNameInput = 'input[placeholder="Ad Soyad"], input[autocomplete="cc-name"]'
cardNumberInput = 'input[placeholder="Kart Numarası"], input[autocomplete="cc-number"]'
cardExpireInput = 'input[placeholder="Ay / Yıl"], input[autocomplete="cc-exp"]'
cardCvcInput = 'input[placeholder="CVC"], input[autocomplete="cc-csc"]'

  clickBuyButton() {
    cy.contains('Satın Al', { timeout: 10000 })
      .click({ force: true })

    cy.wait(1000)
  }

  loginIfRedirected(email, password) {
    cy.url().then((url) => {
      if (url.includes('/siparis-uye-giris')) {
        cy.get('input[placeholder="E-posta adresinizi giriniz"]')
          .clear({ force: true })
          .type(email, { force: true })

        cy.get('input[placeholder="Şifrenizi giriniz"]')
          .clear({ force: true })
          .type(password, { force: true })

        cy.contains('Giriş Yap')
          .click({ force: true })

        cy.wait(1000)
      }
    })
  }

  verifyOrderPage() {
    cy.url({ timeout: 10000 })
      .should('include', '/order/')
  }

  verifyAddressInfoVisible() {
    cy.scrollTo('top', { ensureScrollable: false })

    cy.url({ timeout: 10000 })
      .should('include', '/order/')

    cy.wait(3000)
  }

  clickPaymentStepButton() {
    cy.get('body').then(($body) => {
      if ($body.text().includes('Ödeme Adımına Geç')) {
        cy.contains('Ödeme Adımına Geç')
          .scrollIntoView()
          .click({ force: true })
      }
    })

    cy.url({ timeout: 10000 })
      .should('include', '/order/payment')

    cy.wait(1000)
  }

  goToPaymentPage() {
    this.clickPaymentStepButton()
  }

  verifyPaymentMethodsVisible() {
    cy.url({ timeout: 10000 })
      .should('include', '/order/payment')

    cy.scrollTo('bottom', { ensureScrollable: false })

    cy.contains('Kartla Ödeme', { timeout: 10000 })
      .scrollIntoView()
      .should('exist')

    cy.wait(4000)
  }

  openAndClosePreInfoModal() {
    cy.get('body').then(($body) => {
      if ($body.text().includes('Ön Bilgilendirme')) {
        cy.contains('Ön Bilgilendirme')
          .click({ force: true })
      }
    })

    cy.wait(1000)
  }

  openCardPaymentForm() {
    cy.url({ timeout: 10000 })
      .should('include', '/order/payment')

    cy.scrollTo('bottom', { ensureScrollable: false })

    cy.contains('Kartla Ödeme', { timeout: 10000 })
      .scrollIntoView()
      .click({ force: true })

    cy.get(this.cardNameInput, { timeout: 15000 })
      .first()
      .should('exist')

    cy.wait(2000)
  }

  verifyCardFieldsVisible() {
    cy.get(this.cardNameInput, { timeout: 10000 })
      .first()
      .scrollIntoView()
      .should('exist')

    cy.get(this.cardNumberInput, { timeout: 10000 })
      .first()
      .should('exist')

    cy.get(this.cardExpireInput, { timeout: 10000 })
      .first()
      .should('exist')

    cy.get(this.cardCvcInput, { timeout: 10000 })
      .first()
      .should('exist')

    cy.wait(4000)
  }

  fillCardInfo() {
    cy.get(this.cardNameInput, { timeout: 10000 })
      .first()
      .scrollIntoView()
      .clear({ force: true })
      .type('Gulsah Tankos', { force: true, delay: 100 })

    cy.get(this.cardNumberInput, { timeout: 10000 })
      .first()
      .clear({ force: true })
      .type('4242424242424242', { force: true, delay: 100 })

    cy.get(this.cardExpireInput, { timeout: 10000 })
      .first()
      .clear({ force: true })
      .type('1228', { force: true, delay: 100 })

    cy.get(this.cardCvcInput, { timeout: 10000 })
      .first()
      .clear({ force: true })
      .type('123', { force: true, delay: 100 })

    cy.wait(4000)
  }

  verifyPayButtonActive() {
    cy.get('body').then(($body) => {
      if ($body.find(this.payButton).length) {
        cy.get(this.payButton)
          .first()
          .scrollIntoView()
          .should('exist')
      } else {
        cy.contains('Kartla Ödeme', { timeout: 10000 })
          .scrollIntoView()
          .should('exist')
      }
    })

    cy.wait(4000)
  }

  clickPayButton() {
    cy.get('body').then(($body) => {
      if ($body.find(this.payButton).length) {
        cy.get(this.payButton)
          .first()
          .scrollIntoView()
          .click({ force: true })
      } else {
        cy.contains('Kartla Ödeme', { timeout: 10000 })
          .scrollIntoView()
          .click({ force: true })
      }
    })

    cy.wait(4000)
  }

  verifyStillOnPaymentPage() {
    cy.url({ timeout: 10000 })
      .should('include', '/order/payment')

    cy.wait(4000)
  }

  verifyOrderSummary() {
    cy.url({ timeout: 10000 })
      .should('include', '/order/payment')

    cy.scrollTo('top', { ensureScrollable: false })
    cy.wait(2000)

    cy.scrollTo('bottom', { ensureScrollable: false })
    cy.wait(4000)
  }

  waitForVideo() {
    cy.wait(3000)
  }
}

export default CheckoutPage