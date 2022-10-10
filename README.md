<div align="center">
<a href="https://www.fiap.com.br" target="blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Fiap-logo-novo.jpg" height="100px" alt="FIAP" class="center"/>
</a>

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![AmazonDynamoDB](https://img.shields.io/badge/Amazon%20DynamoDB-4053D6?style=for-the-badge&logo=Amazon%20DynamoDB&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)


</div>

# FIAP Avaliação Final - Serverless Architecture


### Projeto é uma Lambda Function da AWS, feita em Node.JS 16.x

> **Solução:**
> 
> É uma aplicação para calcular lucratividade baseada no CDI.
>
> A requisição chega até o API gateway criado, é direcionada a 
> Lambda Function que se integra com a API pública do banco central
> para consultar o valor atual do CDI. Realiza o calculo e persiste as infomações em um DinamoDB.

<div align="center">
<img src="./doc/lambdaFunction.jpeg" class="center" height="300px">
</div>



## Para executar o projeto foi utilizado:


### 1 - [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) e [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html).

### 2 - Configure AWS e o SAM com sua conta AWS
* #### Com o SAM, é possível executar a Lambda Function localmente.

### 3 - Utilize os comandos para buildar e realizar o deploy:
  
 ~~~shell
  sam build
 ~~~

 ~~~shell
  sam deploy -g
 ~~~

### 4 - Crie uma tabela no DynamoDB com o nome "investment"
<img src="./doc/dynamoDB.png" class="center" height="300px">

### 5 - Após a criação e deploy, dê a permissão a função da sua Lambda para ter acesso ao seu DynamoDB no IAM.

* #### Na pasta raiz do projeto está a collection do Postman para executar o projeto.