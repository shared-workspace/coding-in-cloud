import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

function resolveRef(ref: string, document: any): any {
  if (!ref) return null;
  const refPath = ref.replace(/^#\//, '').split('/');
  let schema = document;
  refPath.forEach((part) => {
    schema = schema[part];
  });
  return schema;
}

export async function generateRoutesTypeFile(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const routes = Object.entries(document.paths).map(([path, pathItem]) => ({
    [path]: pathItem,
  }));

  const dirPath = join(__dirname, '..', '..', 'front-end', 'types');
  const filePath = join(dirPath, 'routes.d.ts');

  // Ensure the directory exists
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }

  const API_ROUTE_TYPE_DEFINITION = {};
  routes.forEach((route) => {
    const path = Object.keys(route)[0];
    const methods = route[path];
    const query = {};
    const params = {};
    const body = {};
    const response = {};
    const from = {};
    Object.keys(methods).forEach((method) => {
      const { operationId, parameters, responses } = methods[method];
      const f = operationId.split('_');
      from[f[0]] = f[1];

      // for Request
      parameters.forEach((param) => {
        // console.log(JSON.stringify(param, null, 2));
        const { name, in: location, schema } = param;
        if (location === 'query') {
          query[name] = schema.type;
        } else if (location === 'path') {
          params[name] = schema.type;
        } else if (location === 'body') {
          body[name] = schema.type;
        }
      });

      // for Response
      const statusCodeKeys = Object.keys(responses);
      statusCodeKeys.forEach((statusCode) => {
        const { content, schema } = responses[statusCode];
        if (content) {
          const schemaType = content['application/json']?.schema?.type;
          const resOfstatusCode = {};
          if (schemaType) {
            if (schemaType === 'object' && schema && schema.properties) {
              const properties = schema.properties;
              Object.keys(properties).forEach((property) => {
                resOfstatusCode[property] = properties[property].type;
              });
            } else {
              console.log(schemaType);
              resOfstatusCode[statusCode] = schemaType;
            }
          } else {
            const $ref = content['application/json']?.schema?.$ref;
            const resolvedSchema = resolveRef($ref, document);
            const { properties } = resolvedSchema;
            Object.keys(properties).forEach((property) => {
              resOfstatusCode[property] = properties[property].type;
            });
          }
          response[statusCode] = resOfstatusCode;
        }
      });
    });
    API_ROUTE_TYPE_DEFINITION[path] = {
      from,
      request: {
        query,
        params,
        body,
      },
      response,
    };
  });
  // console.log(JSON.stringify(routes, null, 2));

  writeFileSync(
    filePath,
    `/* eslint-disable @typescript-eslint/no-empty-object-type */
declare type API_ROUTE_TYPE_DEFINITION = ${JSON.stringify(
      API_ROUTE_TYPE_DEFINITION,
      null,
      2,
    )
      .replace(/:\s+"(string|number)"/g, ': $1')
      .replace(/"([^"]+)":\s+\{\}/g, '"$1"?: {}')};`,
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Set global prefix
  app.enableCors({
    origin: 'https://refactored-meme-wpv7797rvxxc746-5173.app.github.dev', // Replace with your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Allow credentials such as cookies
    allowedHeaders: 'Content-Type, Authorization', // Specify headers that are allowed
  }); // Enable CORS

  generateRoutesTypeFile(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
