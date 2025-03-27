# Pond3r API Examples

This repository contains examples of how to call the Pond3r API to get structured data to use in your agents or applications.

## Repository Structure

- `/python` - Contains the Python implementation
- `/typescript` - Contains the TypeScript implementation

## Features

- Fetches recent liquidation events from Aave V3 on Base
- Displays detailed information about each liquidation:
  - Liquidated user address
  - Liquidator address
  - Debt token details (symbol, amount, USD value)
  - Collateral token details (symbol, amount, USD value)
  - Timestamp
  - Transaction hash

## Python Implementation

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

### Setup and Usage
```bash
cd python
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

Update the API key in `liquidations.py` and run:
```bash
python liquidations.py
```

## TypeScript Implementation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup and Usage
```bash
cd typescript
npm install
```

Update the API key in `liquidations.ts` and run:
```bash
npm run dev  # For development with auto-reload
# OR
npm start    # For one-time execution
# OR
npm run build
node dist/liquidations.js
```

## Configuration

Both implementations require a Pond3r API key. Replace the placeholder API key in the respective files:

- Python: `liquidations.py`
- TypeScript: `liquidations.ts`

## License

MIT 