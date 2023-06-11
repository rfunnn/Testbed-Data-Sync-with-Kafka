# Testbed-Data-Sync-with-Kafka

Data synchronisation between databases is a challenging task to maintain the ACID 
properties during transactions. In a connected application that consists of on-premise and 
cloud storage, data synchronisation is one of the important issues to be addressed to 
maintain the functionality of the application. During the loss of internet connection that 
occurs due to a disaster, the local operation machine has high chances of being unable to 
synchronise the real-time operation data on the cloud database. The objective of this 
project is to develop a testbed to evaluate the feasibility and performance of utilising 
Apache Kafka to sync the databases. This project used TypeScript and the NestJs 
framework to create the testbed's backend code. Code was executed within a Docker 
container to simulate a production-like environment, allowing for performance analysis 
between a local machine and a cloud database during network interruptions. As a result, 
the testbed was able to synchronise data in real-time between a local Kafka broker and a 
cloud database. It demonstrated exceptional performance, with 100% data synchronisation 
and no data loss. The outcomes also demonstrated minimal latency and high 
throughput. Thus, the testbed for this project successfully demonstrated the ability to 
achieve complete synchronisation between a local machine and a cloud database. Using 
Apache Kafka as the streaming platform, it demonstrated its ability to facilitate the 
transmission of data between on-premise and cloud databas


![image](https://github.com/rfunnn/Testbed-Data-Sync-with-Kafka/assets/81603864/ac232050-1f11-4ba4-ac59-c2f8a581d10b)
