import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export async function generateRoutesTypeFile(app: INestApplication) {
  const resolveRef = (ref: string, document: any) => {
    if (!ref) return null;
    const refPath = ref.replace(/^#\//, '').split('/');
    let schema = document;
    refPath.forEach((part) => {
      schema = schema[part];
    });
    return schema;
  };

  const generateType = (schema: any) => {
    if (!schema) return 'any';
    if (schema.$ref) {
      return generateType(resolveRef(schema.$ref, document));
    } else if (schema.type === 'array') {
      return `Array<${generateType(schema.items)}>`;
    } else if (schema.type === 'object') {
      const properties = Object.keys(schema.properties)
        .map((key) => `${key}:${generateType(schema.properties[key])}`)
        .join(',');
      return `{${properties}}`;
    } else {
      return schema.type || 'any';
    }
  };

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

  writeFileSync(
    filePath,
    `/* eslint-disable @typescript-eslint/no-empty-object-type */
declare type API_ROUTE_TYPE_DEFINITION = {${routes
      .map((route) => {
        const path = Object.keys(route)[0];
        const methods = route[path];
        const query = [];
        const params = [];
        const body = [];
        const response = [];
        const from = [];
        Object.keys(methods).forEach((method) => {
          const { operationId, parameters, responses } = methods[method];
          const f = operationId.split('_');
          from.push(`"${f[0]}":"${f[1]}"`);

          // for Request
          parameters.forEach((param) => {
            const { name, in: location, schema } = param;
            if (location === 'query') {
              query.push(`"${name}":${schema.type}`);
            } else if (location === 'path') {
              params.push(`"${name}":${schema.type}`);
            } else if (location === 'body') {
              body.push(`"${name}":${schema.type}`);
            }
          });

          // for Response
          const statusCodeKeys = Object.keys(responses);
          statusCodeKeys.forEach((statusCode) => {
            const { content } = responses[statusCode];
            if (content) {
              response.push(
                `${statusCode}:${generateType(
                  content['application/json']?.schema,
                )}`,
              );
            }
          });
        });
        return `'${path}':{from:{${from.join(',')}},request:{query:{${query.join(',')}},params:{${params.join(',')}},body:{${body.join(',')}},},response:{${response.join(',')}},}`;
      })
      .join(',')}};`.replace(
      /"([^"]+)":\{\}|(\w+):\{\}/g,
      (match, p1, p2) => `"${p1 || p2}"?:{}`,
    ),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api'); // Set global prefix
  app.enableCors({
    origin: 'https://fantastic-umbrella-pq6rgvjgqj6cjqj-5173.app.github.dev', // Replace with your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Allow credentials such as cookies
    allowedHeaders: 'Content-Type, Authorization', // Specify headers that are allowed
  }); // Enable CORS

  if (process.env.NODE_ENV !== 'production') {
    generateRoutesTypeFile(app);
  }

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
