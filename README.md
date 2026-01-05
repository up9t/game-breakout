# Breakout game

![breakout](https://user-images.githubusercontent.com/110075636/231368425-49e03537-8797-4d95-a85f-533148311660.png)

I tried to make a classic game called breakout using:

- Typescript + Vite + Preact
- ECS (using bitEcs)
- WebGL2 `this is the most challenging`

## Features

- GPU Rendering
- Frame Rate Decoupling
- Fast Performance (thanks to Entity Component System)
- Flexible and easy to add and customize level (using JSON declaration)

## Run

```bash
# You could use: npm, pnpm, yarn, bun. Here I'm using bun
bun i
bun run dev -- --host
```

Go to http://localhost:5173

## Run (with Docker)

```bash
docker run --rm -p 8080:80 ghcr.io/ilyasa1211/game-breakout:latest
```

Go to http://localhost:8080


## How to add levels

1. modify the file `src/levels/level.metadata.json`

```json
{
  "levels": [
    // ... other level metadata
    {
      // this will be displayed on the main menu
      "level": 88,
      // this path is the file will be used for example level-88.json
      "path": "88"
    }
  ]
}
```

2. copy from existing level

```bash
cd src/levels

cp level-2.json level-88.json
```

3. edit the content
```json
{
  "$schema": "../schemas/level.schema.json",
  "blocks": [
    // this is the toughness for each block
    1,
    2,
    1,
    2,
    ...
  ]
}
```