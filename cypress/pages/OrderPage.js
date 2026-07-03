class OrderPage {
  modalCloseButton = '#t-modal-close-1'
  buyButton = '#cart-buy-btn'
  guestButtonText = 'Üye Olmadan Devam Et'

  fullNameInput = 'input[name="fullname"]'
  emailInput = 'input[name="email"]'
  citySelect = 'select[name="city_code"]'
  townSelect = 'select[name="town_code"]'
  districtSelect = 'select[name="district_code"]'
  addressInput = 'textarea[name="address"]'
  phoneInput = '#mobile_phone'

  acceptCookiesAndCloseModal() {
    cy.get('body').then(($body) => {
      if ($body.find(this.modalCloseButton).length) {
        cy.get(this.modalCloseButton).click({ force: true })
      }

      if ($body.text().includes('Tümünü Kabul Et')) {
        cy.contains('Tümünü Kabul Et').click({ force: true })
      }
    })
  }

  clickBuyButton() {
    cy.get(this.buyButton, { timeout: 10000 })
      .click({ force: true })
  }

  verifyLoginPage() {
    cy.url({ timeout: 10000 })
      .should('include', '/siparis-uye-giris')
  }

  continueWithoutLogin() {
    cy.contains(this.guestButtonText, { timeout: 10000 })
      .click({ force: true })
  }

  verifyAddressPage() {
    cy.url({ timeout: 10000 })
      .should('include', '/order')

    cy.contains('Adres Bilgileri', { timeout: 10000 })
      .should('be.visible')
  }

  verifyRequiredAddressFields() {
    cy.url({ timeout: 10000 })
      .should('include', '/order/address')

    cy.get(this.fullNameInput).should('be.visible')
    cy.get(this.emailInput).should('be.visible')
    cy.get(this.citySelect).should('be.visible')
    cy.get(this.addressInput).should('be.visible')
  }

  clickSaveAddress() {
    cy.contains('button', 'Adresi Kaydet', { timeout: 10000 })
      .click({ force: true })
  }

  verifyRequiredFieldError() {
    cy.contains('Lütfen', { timeout: 10000 })
      .should('be.visible')

    cy.url()
      .should('include', '/order/address')
  }

  fillAddressForm() {
    cy.get(this.fullNameInput)
      .type('Gülşah Tankoş', { force: true })

    cy.get(this.emailInput)
      .type('gulsah.qa.test@gmail.com', { force: true })

    cy.get(this.citySelect)
      .select('İstanbul', { force: true })

    cy.get(this.townSelect)
      .select(1, { force: true })

    cy.get(this.districtSelect)
      .select(1, { force: true })

    cy.get(this.addressInput)
      .type('Test Mahallesi Test Sokak No: 1 Esenyurt İstanbul', { force: true })

    cy.get(this.phoneInput)
      .type('5554443322', { force: true })
  }

  verifyPaymentPage() {
    cy.url({ timeout: 10000 })
      .should('include', '/order/payment')
  }

  waitForVideo() {
    cy.wait(3000)
  }
}

export default OrderPage