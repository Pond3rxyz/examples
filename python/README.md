# Aave Liquidations Monitor

This Python script monitors and displays recent liquidation events from Aave V3 on the Base network using the Pond3r API.

## Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

## Installation

1. Clone this repository or download the files
2. Create and activate a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. Install the required packages:
```bash
pip install -r requirements.txt
```

4. Update the API key in `liquidations.py`:
Replace `"YOUR_API_KEY"` with your actual Pond3r API key.

## Usage

Run the script using:
```bash
python liquidations.py
```

The script will fetch and display the 10 most recent liquidation events from Aave V3 on Base, including:
- Liquidated user address
- Liquidator address
- Debt token details (symbol, amount, USD value)
- Collateral token details (symbol, amount, USD value)
- Timestamp
- Transaction hash

## Error Handling

The script includes basic error handling and will display any errors that occur during execution. 