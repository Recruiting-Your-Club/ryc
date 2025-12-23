# [Stage 1] Build 환경
FROM gradle:8.5-jdk17 AS builder
WORKDIR /project

# 1. 의존성 파일들만 먼저 복사 (소스코드보다 변경이 적음)
COPY build.gradle settings.gradle ./

# 2. [핵심] 소스 코드 없이 라이브러리만 미리 다운로드 (레이어 캐싱 활용)
# dependencies: 의존성만 다운로드하는 Gradle task
RUN gradle dependencies --no-daemon

# 3. 소스 코드 복사 (이 부분이 바뀌어도 위 2번 단계는 캐시된 걸 씀)
COPY src ./src

# 4. 실제 빌드 실행
# --mount=type=cache: Gradle 캐시를 로컬에 저장해두고 재사용 (반복 빌드 속도 향상)
# -x test: 테스트 제외
RUN --mount=type=cache,target=/home/gradle/.gradle/caches \
    gradle clean build --no-daemon -x test \
    -Dorg.gradle.jvmargs="-Xmx512m -XX:+UseSerialGC"

# [Stage 2] Run 환경
FROM amazoncorretto:17
WORKDIR /app
COPY --from=builder /project/build/libs/*.jar app.jar

# 실행 명령어
ENTRYPOINT ["sh", "-c", "exec java -Dspring.profiles.active=${PROFILES} -Dspring.config.location=file:/app/config/application.yml -jar app.jar"]