# [Stage 1] Build 환경: Gradle과 Java 17이 포함된 이미지 사용
FROM gradle:8.5-jdk17 AS builder
WORKDIR /project

# 의존성 캐싱을 위해 설정 파일만 먼저 복사
COPY build.gradle settings.gradle ./
# 소스 코드 복사
COPY src ./src

# 빌드 실행
RUN gradle clean build --no-daemon

# [Stage 2] Run 환경: 가벼운 Java 17 런타임 이미지 사용
FROM openjdk:17-jdk-slim
WORKDIR /app

# Stage 1에서 빌드된 Jar 파일만 복사해옴
COPY --from=builder /project/build/libs/*.jar app.jar

# 실행
ENTRYPOINT ["sh", "-c", "exec java -Dspring.profiles.active=${PROFILES} -jar app.jar"]