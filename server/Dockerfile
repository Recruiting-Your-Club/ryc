# [Stage 1] Build 환경: Gradle 공식 이미지 사용
FROM gradle:8.5-jdk17 AS builder
WORKDIR /project

# 의존성 캐싱을 위해 설정 파일만 먼저 복사
COPY build.gradle settings.gradle ./
# 소스 코드 복사
COPY src ./src

# 빌드 실행
# --no-daemon: 일회성 빌드에서 데몬을 띄우지 않아 메모리 절약
RUN gradle clean build --no-daemon -x test

# [Stage 2] Run 환경: AWS 및 일반 환경에서 가장 안정적인 Amazon Corretto 17 사용
# 기존 openjdk:17-jdk-slim은 Deprecated 되어 삭제됨
FROM amazoncorretto:17
WORKDIR /app

# Stage 1에서 빌드된 Jar 파일만 복사해옴
COPY --from=builder /project/build/libs/*.jar app.jar

# 실행 명령어
ENTRYPOINT ["sh", "-c", "exec java -Dspring.profiles.active=${PROFILES} -Dspring.config.location=file:/app/config/application.yml -jar app.jar"]