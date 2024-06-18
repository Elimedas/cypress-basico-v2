
///<reference types = "Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html') 
    })
    it('verifica o título da aplicação', function() {
        //cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.fillMandatoryFieldsAndSubmit()
    })

    
    it('preencher os campos', function() {
    const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'   
        cy.get('#firstName').type('Eliesio')
        cy.get('#lastName').type('dos Santos Medas')
        cy.get('#email').type('eliesio.dsn.pack@alterdata.com.br')
        cy.get('#phone').type(21975999999)
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
        
    })
    
    it('exibe mensagem de erro ao submeter o formulário com o email inválido', function() {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste.'
            cy.get('#firstName').type('Eliesio')
            cy.get('#lastName').type('dos Santos Medas')
            cy.get('#email').type('eliesio.dsn.pack*alterdata.com.br')
            cy.get('#phone').type(21975999999)
            cy.get('#open-text-area').type(longText, {delay: 0})
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible')
    })

    it('campo telefone permanecer vazio se preenchido com não-numérico', function() {
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#phone')
        cy.get('#phone-checkbox').check()
        cy.get('button[type="submit"]').click({delay:0})
        cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Eliesio')
        .should('have.value', 'Eliesio')
        .clear()
        .should('have.value', '')
        cy.get('#lastName').type('dos Santos Medas')
        .should('have.value', 'dos Santos Medas')
        .clear()
        .should('have.value', '')
        cy.get('#email').type('eliesio.dsn.pack@alterdata.com.br')
        .should('have.value', 'eliesio.dsn.pack@alterdata.com.br')
        .clear()
        .should('have.value', '')
        cy.get('#phone').type(21975999999)
        .should('have.value', '21975999999') 
        .clear()
        .should('have.value', '')
        cy.get('button[type="submit"]').click({delay:0})
        cy.get('.error').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('verifica o título da aplicação', function() {
        //cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        //comentado para utilizar o comando personalizado de testes
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })


    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product').select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product').select(1)
        .should('have.value', 'blog')
    })


    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"]')
            .check('feedback')
            .should('be.checked')
    })


    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .check('ajuda')
        .should('be.checked')
    
        cy.get('input[type="radio"]')
        .check('elogio')
        .should('be.checked')

        cy.get('input[type="radio"]')
        .check('feedback')
        .should('be.checked')
    })

    it('marca cada tipo de atendimento', function(){
        //entrar no radio todos
        cy.get('input[type="radio"]')
        //achar quantidade de radio
        .should('have.length', 3)

        //each = vai pegar cada um dos 3 radio

        .each(function($radio) {
            //wrap = empacota cada um dos radio e check = marca
            cy.wrap($radio).check()
            // wrap = empacota cada um dos radio e be.checked = vai ver se realmente foram marcados
            cy.wrap($radio).should('be.checked')
        
        })
    })
    
    it('marca ambos checkboxes, depois desmarca o último', function(){            
      cy.get('input[type="checkbox"]')
        .check()
        //last = foca no último checkbox
        .last()
        //unchek = Desmarca o checkbox
        .uncheck()
        //not.be.checked = verifica se foi desmarcado
        .should('not.be.checked')
    })


    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
       //verificar e confirmar o arquivo esperado
        .should(function ($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
       //verificar e confirmar o arquivo esperado
        .should(function ($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    }) 
    
    
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('Eliesio')
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('@Eliesio')
       //verificar e confirmar o arquivo esperado
        .should(function ($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })    
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function (){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')

        //<a href="privacy.html" target="_blank">Política de Privacidade</a>
    })

    
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function (){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
        //remover o atributo target para que possa prosseguir com o teste, visto que o Cypress não reconhece abertura de outra aba do navegador
        .invoke('removeAttr', 'target')
        .click()
        //verifica se contém o texto informado
        cy.contains('Talking About Testing').should('have.visible')
    })
   
})