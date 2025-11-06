import 'cypress-xpath'

describe('selecionar produtos', () => {
  // atributos

  beforeEach(() => {
    cy.visit('/')                             // abre o browser na url informada em cypress.config.js
  }) // termina before

  it('selecionar Sauce labs Backpack', () => {

    cy.title()                                // verifica se o título da página é Swag Labs
      .should('eq', 'Swag Labs')

    // realizar login
    cy.get('input[data-test="username"]')     // preencher o usuário
      .type('standard_user')

    cy.get('#password')
      .type('secret_sauce')                   // preencher a senha 

    cy.get('input[name="login-button"]')
      .click()                                // clica no botão login

    // carregar a pagina de inventario

    cy.get('span.title')
      .should('have.text', 'Products')        // verifica se o elemento contém Products 

    cy.get('img[alt="Sauce Labs Backpack"]')
      .click()                                // clica na imagem do produto mochila 
 
    // carregar a pagina de item de inventario  

    // apenas para demonstrar como fariamos com XPath Absoluto
    // verifica se no elemento via Xpath contem o texto Back to products 
    // Tem pelo menos 7 formas mais praticas e legiveis do que isso 
    cy.xpath('/html/body/div/div/div/div[1]/div[2]/div/button')
      .should('have.text', 'Back to products')

    cy.get('div.inventory_details_name.large_size') // Verifica titulo
      .should('have.text', 'Sauce Labs Backpack')

    cy.get('div.inventory_details_price')  // Verifica preço
      .should('have.text', '$29.99')

    cy.get('#add-to-cart')
        .click() // clica no botao adicionar carrinho 

    cy.get('a.shopping_cart_link')
      .should('have.text', '1') // verifica se exibe o numero 1
      .click()

    //cy.get('a', 'shopping_cart_link')
    //.click() // clica no botao carrinho 

    cy.get('span.title')
      .should('have.text', 'Your Cart') // verificar o titulo da sessão

    cy.get('div.inventory_item_name')
      .should('have.text', 'Sauce Labs Backpack') // verifica o titulo do produto

    cy.get('div.inventory_item_price')
      .should('have.text', '$29.99') // verifica o preço do produto

    cy.get('div.cart_quantity')
      .should('have.text', '1') // verificar quantidade de itens

  }) // termina o it

  afterEach(() => {
    cy.get('#remove-sauce-labs-backpack') // remove o produto do carrinho 
      .click()

    cy.get('#react-burger-menu-btn') // clica no incone 3 traços 
      .click()

    cy.get('#logout_sidebar_link', { timeout: 10000 }) // clica na opção logout
      .should('be.visible')                  // espera o menu realmente aparecer
      //.should('not.be.disabled')      // garante que o botão está pronto pra clicar
      .click()

      cy.get('#login-button')
      .should('be.visible') // verificar se está novamente na tela de login
  })

}) // termina describe'