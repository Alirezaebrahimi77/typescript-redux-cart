/// <reference types="cypress" />

describe("Ecommerce app cart functionality", () => {

    beforeEach(() => {
        cy.visit("http://localhost:3000")
    })

    it("Verify that we are able to add an item into our cart AND increase quantity by 1", () => {

        cy.get("[data-testId=62c73162ed85519b24d8639d]").children("button", "Add To Cart").then(($btn) => {
            
            const txt = $btn.text()
            // Get text of cart icon and compare after adding to cart
            cy.get("[data-testId=cartCount]").then($span => {
                const count = $span.text()

                cy.contains("Product added to cart successfully.").should("not.exist")
                cy.get("[data-testId=62c73162ed85519b24d8639d]").children("button", "Add To Cart").click()
                cy.contains("Product added to cart successfully.")
                cy.get("[data-setId=cartWrapper]").should("not.exist")
                cy.get("[data-testId=62c73162ed85519b24d8639d]").children("button", "Add To Cart").should(($btn2) => {
                    expect($btn2.text()).not.to.eq(txt)
                })
                cy.get("[data-testId=62c73162ed85519b24d8639d]").children("button", "Add To Cart").click()
                cy.get("[data-setId=cartWrapper]").should("exist")
                cy.get("[data-setId=cartWrapper]").find("[data-testId=62c73162ed85519b24d8639d]").should("exist")
    
                cy.get("[data-testId=cartCount]").then($span2 => {
                    expect($span2.text()).not.to.eq(count)
                })

                // Increase quantity
                cy.get("[data-testId=quantity]").then($quantity => {

                    // Capture what num is right now
                    const quantity = parseFloat($quantity.text())

                    cy.get("[data-testId=increaseBtn]").click().then(() => {
                        const quantity2 = parseFloat($quantity.text())

                        // Make sure it's what we expected
                        expect(quantity2).to.eq(quantity + 1)
                    })
                })

                // Decrease quantity
                cy.get("[data-testId=quantity]").then($quantity => {

                    // Capture what num is right now
                    const quantity = parseFloat($quantity.text())

                    cy.get("[data-testId=decreaseBtn]").click().then(() => {
                        const quantity2 = parseFloat($quantity.text())

                        // Make sure it's what we expected
                        expect(quantity2).to.eq(quantity - 1)
                    })
                })

                // Remove item from cart
                cy.get("[data-testId=decreaseBtn]").click()
                cy.get("[data-setId=cartWrapper] > [data-testId=62c73162ed85519b24d8639d]").should("not.exist")

                // Close cart
                cy.get("[data-testId=closeCart]").click()
          
            })
        })
    })

})