import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info:{
            title: "API Usuários - UC13 | TDS242N",
            version: "1.0.0",
            description: `API RESTful desenvolvida na Unidade Curricular 13 (UC13)  do curso Técnico em Desenvolvimento de Sistemas. 
            
            Esta aplicação tem como finalidade demonstrar a construção de uma API utilizando Node.js com TypeScript, seguindo o padrão MVC. 

            A API realiza operações de gerenciamento de usuários (CRUD),  integrando-se a um banco de dados MySQL por meio de ORM TypeORM, garantindo a abstração de camada de persistência, organização de entidades e mapeamento objeto-relacional.

            Tecnologias e conceitos aplicados:

            - Node.js - ambiente de execução Javascript no servidor
            - TypeScript - tipagem estática e maior robustez no código
            - Express - framework para criação de APIs REST
            - TypeORM - ORM para mapeamento objeto-relacional
            - MySQL - sistema de gerenciamento 
            - dotenv - gerenciamento de vários 
            
            `,
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./src/routes/*.ts"]
})
