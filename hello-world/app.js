const AWS = require('aws-sdk'); // importando o SDK
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({region: "us-east-1"}); // Configurando a região utilizada.
axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

const docCLient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
var successResponse = {
    statusCode: 201
}

var bcbApiFail = {
    statusCode: 500,
    body: "não foi possível calcular o CDI"
}

var failResponse = {
    statusCode: 500,
    body: "não foi possível salvar o investimento"
}




exports.lambdaHandler = async (event, context) => {
    console.info('received:', event);
    
    if (event.httpMethod === "POST") {
    
        const body = JSON.parse(event.body);
        var cdi;
    
        try {
            const response = await axios.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json');
            cdi = response.data[0].valor;
            } catch (error) {
                console.log(error.response.body);
                return bcbApiFail;
            }
            var anualPercentRentability = (cdi * body.profitability) / 100
            body.profit = (((body.value / 100) * anualPercentRentability) / 12) * body.deadline
    
        return await createItem(body);
    }else if (event.httpMethod === "GET") {
        console.log("Executar getItems");
        return await getItems();
    }else{
        throw new Error(`Metódo http não permitido, você tentou: ${event.httpMethod}`);
    }
};

    var getItems = async () => {

    let response = {};

    const params = {
        TableName: 'investment'
    };
    try {
        const data = await docCLient.scan(params).promise();
        console.log("Data: " + data);
        const items = data.Items
        console.log("items: " + items);
    
        response = {
            statusCode: 200,
            body: JSON.stringify(items) 
        }
    } catch (error) {
        console.error(error);
        response = failResponse;
    }

    return response;
}

    var createItem = async (body) => {

    
    var data = successResponse;
    var params = {
        TableName: 'investment',
        Item: {
            "id": uuidv4(),
            "asset_name": body.asset_name,
            "deadline": body.deadline,
            "profitability": body.profitability,
            "type": body.type,
            "value": body.value,
            "profit": body.profit
        }
    };

    try {
        await docCLient.put(params).promise();
    } catch (error) {
        console.error(error);
        data = failResponse
    }
    return data;
}
