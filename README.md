# Rate Limiter with RabbitMQ and Redis

## Introduction
This project implements a **rate limiter** using Redis and Rabbitmq for logging excessive API requests. It is fully containerized using Docker and Docker Compose. The objective is to efficiently control API request rates and log violations for monitoring.

---

## Getting Started
### Installation Process
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd Rate-Limiter
   ```
2. Start the services (Node.js, Redis, RabbitMq):
   ```sh
   docker-compose up -d
   ```

### Software Dependencies
- **Node.js** (v18+)
- **Docker & Docker Compose**
- **Redis** (for caching requests)
- **RabbitMq** (for logging excessive requests)


#### ** Example Request**
 To Generate token 
```sh
curl --location 'http://localhost:3009/E-commerce/api/v1/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user_name":"Vedant Maral",
    "user_id":123456,
    "user_email":"vedant.maral@gmail.com"
}'
```

To test Rate-limiter
```sh
curl --location 'http://localhost:3009/E-commerce/api/v1/items/list' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJWZWRhbnQgTWFyYWwiLCJ1c2VyX2lkIjoxMjM0NTYsInVzZXJfZW1haWwiOiJ2ZWRhbnQubWFyYWxAZ21haWwuY29tIiwiaWF0IjoxNzQ1Njk1MTUzLCJleHAiOjE3NDU3ODE1NTN9.sVP4ZjByuJrOgyusRps2FD4mS0-0xjPtXmmUgQrqAlJtKA3E0V4u6iayu_8rPxUtOaKq01g7VVjDF-ub4GF270aDLPvM8nPjOMJoMQWzNZqRyZQK6D4y84YEv49DbR2pyj8O4sgoICxl1lXgYwjyCQP2ndHjd2YczRzNJLSjy869nfhR_kDT0Ol63vW6Ck8GEnsGDL5pwEB3w4HuDlT9dRensUakP2AUE9tDuu6K78BaeOz4bpMSxB7tu9g3wA0RTNnIHNLeffSY9mGBJ1IMgizlwbDVL0KcU0QTYzLWp4_N0BOUGGXuJkTTRAyKh3cLmwfKSvnMi6uArta76xb0Og'
```


#### **3️⃣ Response (If within limit)**
```json
{"status":200,"message":"Success","data":{"itemsList":["Iphone 16","I-Watch","Apple adapter"]}}
```
#### **4️⃣ Response (If rate limit exceeded)**
```json
{"status":429,"message":"Too Many Request","error":{}}
```

---

## Build and Test
### **Building the Project**
To build the project, use:
```sh
docker-compose up -d --build
```

### **Running the Tests**
Currently, testing is done manually using **cURL** or **Postman**.

## Stopping the Services
To stop and remove containers:
```sh
docker-compose down
```

---
 To test locally with running rabbitmq container
docker run -d --hostname my-rabbit --name some-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management


### **Enjoy coding! 🚀**
