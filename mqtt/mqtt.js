var mqtt = require('mqtt')
var client  = mqtt.connect('tcp://ec2-54-235-235-199.compute-1.amazonaws.com:1883')
var localClient = mqtt.connect('tcp://localhost:1883')

module.exports = function(app){
    localClient.on('connect', function(){
      console.log("Connected to Local MQTT Broker");
    });


    //Conectar ao broker remote e assinar o topico dos devices
    client.on('connect', function () {
        console.log("Connected to Remote MQTT Broker");

        client.subscribe('devices/action/switch-1', function (err) {
          if (!err) {
            console.log("Subscribe device/action/switch-1")
          }
        })
    });

    //Ao receber mensagem do broker remoto essa mensagem deve ser repassada para o broker local
    client.on('message', function (topic, message) {
      // message is Buffer
      console.log(message.toString())

      localClient.publish(topic, message.toString())

      client.end()
    })



    return client;
}