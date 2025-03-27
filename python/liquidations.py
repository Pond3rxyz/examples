from typing import List
from pydantic import BaseModel
import requests
from datetime import datetime
import json


class Token(BaseModel):
    symbol: str
    amount: str or float
    usdValue: str or float or None

class LiquidationEvent(BaseModel):
    liquidatedUser: str
    liquidator: str
    debtToken: Token
    collateralToken: Token
    timestamp: int or str
    txHash: str

def get_aave_liquidations() -> List[LiquidationEvent]:
    request_data = {
        "prompt": """Get the last 10 liquidations on Aave V3 on Base. Return as JSON array with each liquidation having:
        - liquidatedUser (address)
        - liquidator (address)
        - debtToken: { symbol, amount, usdValue }
        - collateralToken: { symbol, amount, usdValue }
        - timestamp (unix)
        - txHash
        
        Response only the JSON array, nothing else.
        """
    }

    response = requests.post(
        "https://api.pond3r.xyz/v1/messages",
        json=request_data,
        headers={
            "x-api-key": "pond3r-api-key",
            "Content-Type": "application/json"
        },
        timeout=60
    )
    response.raise_for_status()

    clean_response =  response.json()["result"].replace("```json", "").replace("```", "")

    print(clean_response)
    
    return [LiquidationEvent.model_validate(item) for item in json.loads(clean_response)]

def main():
    try:
        liquidations = get_aave_liquidations()
        for liquidation in liquidations:
            print(f"""
                    Liquidation:
                    User: {liquidation.liquidatedUser}
                    Debt Token: {liquidation.debtToken.amount} {liquidation.debtToken.symbol} (${float(liquidation.debtToken.usdValue):.2f})
                    Collateral Token: {liquidation.collateralToken.amount} {liquidation.collateralToken.symbol} (${float(liquidation.collateralToken.usdValue):.2f})
                    Timestamp: {datetime.fromtimestamp(liquidation.timestamp).isoformat()}
                    Transaction: {liquidation.txHash}
            """)
            
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main()