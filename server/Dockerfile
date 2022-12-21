FROM maven:3-jdk-11-slim
COPY src /server/src
COPY pom.xml /server
RUN mvn -f /server/pom.xml clean package