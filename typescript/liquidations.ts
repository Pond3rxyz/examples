import { z } from 'zod';
import axios from 'axios';

// Define the liquidation event schema
const LiquidationEvent = z.object({
  liquidatedUser: z.string(),
  liquidator: z.string(),
  debtToken: z.object({
    symbol: z.string(),
    amount: z.union([z.string(), z.number()]),
    usdValue: z.union([z.string(), z.number()]).nullable(),
  }),
  collateralToken: z.object({
    symbol: z.string(),
    amount: z.union([z.string(), z.number()]),
    usdValue: z.union([z.string(), z.number()]).nullable(),
  }),
  timestamp: z.union([z.string(), z.number()]),
  txHash: z.string(),
});

const LiquidationsResponse = z.array(LiquidationEvent);

type Liquidation = z.infer<typeof LiquidationEvent>;

async function getAaveLiquidations(): Promise<Liquidation[]> {
  try {
    const response = await axios.post(
      'https://api.pond3r.xyz/v1/messages',
      {
        prompt: `Get the last 10 liquidations on Aave V3 on Base. Return as JSON array with each liquidation having:
        - liquidatedUser (address)
        - liquidator (address)
        - debtToken: { symbol, amount, usdValue }
        - collateralToken: { symbol, amount, usdValue }
        - timestamp (unix)
        - txHash
        
        Response only the JSON array, nothing else.
        `
      },
      {
        headers: {
          'x-api-key': 'pond3r-api-key',
          'Content-Type': 'application/json',
        },
      }
    );

    // Validate and parse the response
    const cleanResponse = response.data.result.replace("```json", "").replace("```", "");

    console.log(cleanResponse);
    const validatedData = LiquidationsResponse.parse(JSON.parse(cleanResponse));
    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
    }
    throw error;
  }
}

// Example usage
const main = async () => {
  const liquidations = await getAaveLiquidations();
  liquidations.forEach(liquidation => {
    console.log(`
      Liquidation:
      User: ${liquidation.liquidatedUser}
      Debt Token: ${liquidation.debtToken.amount} ${liquidation.debtToken.symbol} ($${liquidation.debtToken.usdValue})
      Collateral Token: ${liquidation.collateralToken.amount} ${liquidation.collateralToken.symbol} ($${liquidation.collateralToken.usdValue})
      Timestamp: ${new Date(Number(liquidation.timestamp) * 1000).toISOString()}
    `);
  });
};

main();