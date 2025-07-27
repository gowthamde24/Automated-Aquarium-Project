
// This code is designed to be compiled and uploaded using the Arduino IDE.

// --- 1. Include Necessary Libraries ---
#include <WiFi.h>
#include <PubSubClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <ESP32Servo.h>

// --- 2. Hardware Pin Definitions (matches the wiring diagram) ---
#define TEMP_SENSOR_PIN 4
#define PH_SENSOR_PIN 36 // Use an ADC-capable pin (e.g., VP)
#define SERVO_PIN 15
#define LED_PIN 13

// --- 3. Wi-Fi & MQTT Configuration ---
// IMPORTANT: Replace with your actual credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
// Use a public broker like "broker.hivemq.com" for testing
const char* mqtt_server = "broker.hivemq.com"; 

// --- 4. Initialize Hardware and Client Objects ---
OneWire oneWire(TEMP_SENSOR_PIN);
DallasTemperature tempSensor(&oneWire);
Servo feederServo;
WiFiClient espClient;
PubSubClient client(espClient);

// --- 5. Global Variables for Timers ---
unsigned long lastMsg = 0;
const long interval = 10000; // Interval at which to send messages (10 seconds)

// --- 6. Function Declarations ---
void callback(char* topic, byte* payload, unsigned int length);
void reconnect();

// --- 7. Setup Function (runs once on startup) ---
void setup() {
  Serial.begin(115200); // Start serial monitor for debugging
  
  // Initialize sensors and actuators
  tempSensor.begin();
  feederServo.attach(SERVO_PIN);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW); // Start with light off

  // Connect to Wi-Fi
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // Configure MQTT client
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback); // Set the function to handle incoming messages
}

// --- 8. Callback Function (handles commands from the app) ---
void callback(char* topic, byte* payload, unsigned int length) {
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  Serial.println(message);

  // Handle manual feed command
  if (String(topic) == "aquarium/feed") {
    if(message == "TRIGGER"){
      Serial.println("Manual feed activated!");
      feederServo.write(90); // Rotate servo to dispense food
      delay(1000); // Wait for a second
      feederServo.write(0);  // Rotate back
    }
  }

  // Handle light control command
  if (String(topic) == "aquarium/light") {
    if (message == "ON") {
      Serial.println("Turning light ON");
      digitalWrite(LED_PIN, HIGH);
    } else if (message == "OFF") {
      Serial.println("Turning light OFF");
      digitalWrite(LED_PIN, LOW);
    }
  }
}

// --- 9. Reconnect Function (for MQTT connection) ---
void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP32Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Subscribe to topics to listen for commands
      client.subscribe("aquarium/feed");
      client.subscribe("aquarium/light");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

// --- 10. Main Loop (runs continuously) ---
void loop() {
  // Check MQTT connection and reconnect if necessary
  if (!client.connected()) {
    reconnect();
  }
  client.loop(); // Listen for incoming messages

  // Use a non-blocking timer to send data every 'interval' milliseconds
  unsigned long now = millis();
  if (now - lastMsg > interval) {
    lastMsg = now;

    // --- Read Sensor Data ---
    tempSensor.requestTemperatures(); 
    float temperatureC = tempSensor.getTempCByIndex(0);
    
    // Read pH sensor (this is a simplified reading)
    int phRaw = analogRead(PH_SENSOR_PIN);
    // You would need a calibration formula to convert raw value to actual pH
    float phValue = map(phRaw, 0, 4095, 0, 14); // Example mapping

    // --- Print data for debugging ---
    Serial.print("Temperature: ");
    Serial.print(temperatureC);
    Serial.println(" °C");
    Serial.print("pH Value: ");
    Serial.println(phValue);

    // --- Publish data to MQTT topics ---
    client.publish("aquarium/temperature", String(temperatureC).c_str(), true);
    client.publish("aquarium/ph", String(phValue).c_str(), true);
  }
}
