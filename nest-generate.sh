#!/bin/bash

# Check if a name is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <name>"
  exit 1
fi

NAME=$1

# Generate module, controller, and service
pnpm nest g mo $NAME --no-spec
pnpm nest g co $NAME --no-spec
pnpm nest g s $NAME --no-spec

# Generate DTO classes
pnpm nest g class $NAME/create-$NAME.dto --no-spec
pnpm nest g class $NAME/delete-$NAME.dto --no-spec
pnpm nest g class $NAME/search-$NAME.dto --no-spec

# Move DTO classes out of nested folders
mkdir -p src/$NAME/dto
mv src/$NAME/create-$NAME.dto/create-$NAME.dto.ts src/$NAME/dto/create-$NAME.dto.ts
mv src/$NAME/delete-$NAME.dto/delete-$NAME.dto.ts src/$NAME/dto/delete-$NAME.dto.ts
mv src/$NAME/search-$NAME.dto/search-$NAME.dto.ts src/$NAME/dto/search-$NAME.dto.ts

# Remove the empty nested folders
rmdir src/$NAME/create-$NAME.dto
rmdir src/$NAME/delete-$NAME.dto
rmdir src/$NAME/search-$NAME.dto

# Generate schema class
pnpm nest g class $NAME/$NAME.schema --no-spec

# Move schema class out of nested folder
mkdir -p src/$NAME/schema
mv src/$NAME/$NAME.schema/$NAME.schema.ts src/$NAME/schema/$NAME.schema.ts

# Remove the empty nested folder
rmdir src/$NAME/$NAME.schema

echo "Generation and reorganization complete."