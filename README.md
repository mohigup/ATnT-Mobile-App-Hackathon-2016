# ATnT-Mobile-App-Hackathon-2016 : Dexterous

  Every year a retail company spends about 1 Million dollars on energy saving. With Dexterous, companies can take advantage of the IoT devices and automatically scale up or down their resources, without spending much.
### What is Dexterous?
  We made Dexterous with the aim managing crowd in potential areas like Grocery shops and theatres. 
  This app helps the store managers and employees scale their possible reesources as the number of customers increase. 
  The increase in the number of people in an enclosed area is diretly related too the surrounding temperature.
  How does this work?
  1. The IoT device is responsible for sensing room temperature.
  2. We set three levels of crowd, Low, Medium and High
  3. The goal is to alert the store employees when the level reaches High.
  4. The IoT device also depicts the rising temperature levels with an LCD display attached (green for low, yellow for medium and red for high)
  5. As the number of people increase i,e, the threshold reaches the High mark, the IoT device sends an SMS to the registered users (store managers and employees) suggesting to open more checkout counter/exit gates 
  6. The mobile app, Dexterous :
    1. continuously polls the IoT device and shows the temperature levels in real time (using d3.js for charts)
    2. lets the user adjust the threshold temperature, the low and the high
    3. shows the "Hotspots", which are the areas where most people were crowded

--
### Technolgies Used:
  1. Front End: Using the Ionic Framework for building native app components with Angular
  2. Back End: Node.js
  3. IoT Device Used:  Intel® Edison board with [Grove Starter Kit](https://www.seeedstudio.com/Grove-Starter-Kit-for-Arduino-p-1855.html#)
  4. Twilio Messaging for real time updates

--

### Future Scope of Dexterous:
  1. S.O.S. : A feature which would allow employees to contact other employees to manage the crowd.
  2. Chatbot : To help the employees learn the potential features of Dexterous and give suggestions on potential threshold temperatures
  3. Analytics : A comprehensive view depicting the time when the spot is most crowded


