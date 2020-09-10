/**
 * 모바일 앱 서버 Entry point
 * 서버 초기화 작업을 수행한다.
 * - Log 설정
 * - DB 접속
 * - HTTP 접속, WebSocket 접속 초기화
 * - Klaytn 접속 확인
 * - Firebase 메시징 초기화
 *
 * - 초기 데이터 설정 작업은 Admin Server에서 실행한다.
 */
import express from "express";
import { ApolloServer, ApolloError, gql } from "apollo-server-express";
import http from "http";
import config from "config";

const initConfig = config.get("init");

const app = express();

const server = new ApolloServer({
  typeDefs: gql`
    type Book {
      title: String
      author: String
    }
    type Query {
      books: [Book]
    }
  `,
  context: async ({ req, connection }) => {
    throw new ApolloError("몇시부터 몇시까지 점!검!", "SERVER_MAINTENANCE");
  },
  engine: {
    reportSchema: true,
  },
  tracing: true,
});

server.applyMiddleware({ app });

const httpServer = http.createServer(app);

const PORT = initConfig.server.port;
httpServer.listen(PORT, async () => {
  console.log("maintenance server start");
});
