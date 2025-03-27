# Liquidations Tracker for Aave V3 on Base

This tool tracks liquidation events on Aave V3 on the Base network using the Pond3r API.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository and navigate to the typescript directory:

```bash
cd typescript
```

2. Install dependencies:

```bash
npm install
```

or if you use yarn:

```bash
yarn install
```

## Configuration

Before running the script, you need to:

1. Replace the placeholder API key in the `liquidations.ts` file:

```typescript
headers: {
  'x-api-key': 'your-pond3r-api-key', // Replace with your actual Pond3r API key
  'Content-Type': 'application/json',
},
```

## Running the Script

You can run the script in several ways:

### Development Mode

For development with auto-reload on file changes:

```bash
npm run dev
```

or:

```bash
yarn dev
```

### One-time Execution

To run the script once:

```bash
npm start
```

or:

```bash
yarn start
```

### Build and Run

To compile TypeScript to JavaScript and run the compiled code:

```bash
npm run build
node dist/liquidations.js
```

or:

```bash
yarn build
node dist/liquidations.js
```

## Output

The script will output recent liquidation events from Aave V3 on Base, showing:

- Liquidated user address
- Liquidator address
- Debt token details (symbol, amount, USD value)
- Collateral token details (symbol, amount, USD value)
- Timestamp of the liquidation
- Transaction hash

## Dependencies

- axios: For making HTTP requests to the Pond3r API
- zod: For runtime type validation of API responses 