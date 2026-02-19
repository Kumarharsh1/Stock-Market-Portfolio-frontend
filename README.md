# Stock Market Portfolio Frontend

This is the frontend for my stock market portfolio dashboard.  
It is built using Next.js and shows all stock data in a clean table format.

## Live Demo
https://stock-market-portfolio-frontendvhbv.vercel.app

## What you will see
- **4 summary cards** at the top  
  (Total Investment, Current Value, Gain/Loss, Return %)
- **Clickable sectors** to expand and view stocks
- **A big table** with 30 stocks and all required details
- Data updates automatically every 15 seconds

## The 11 Columns

| Column | What it shows |
|------|---------------|
| Particulars | Stock name and symbol |
| Purchase Price | Buying price |
| Qty | Number of shares |
| Investment | Price × Quantity |
| Portfolio % | Percentage of total investment |
| Exchange | NSE / BSE |
| CMP | Current Market Price |
| Present Value | CMP × Quantity |
| Gain/Loss | Profit or loss |
| P/E Ratio | From Google Finance |
| Latest Earnings | From Google Finance |

## Tech Used
- Next.js 14
- TypeScript
- Tailwind CSS
- Axios
- Hosted on :contentReference[oaicite:0]{index=0}

## Run Locally

```bash
git clone https://github.com/Kumarharsh1/Stock-Market-Portfolio-frontend.git
cd Stock-Market-Portfolio-frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
npm run dev
Open in browser:
http://localhost:3000

Environment Variable
NEXT_PUBLIC_API_URL=https://stock-market-portfolio-backend-km7b.onrender.com
This tells the frontend where the backend API is running.

Real-Time Updates
The data refreshes every 15 seconds using a simple timer.

useEffect(() => {
  fetchData();
  const interval = setInterval(fetchData, 15000);
  return () => clearInterval(interval);
}, []);
Expand / Collapse Feature
Click the plus (+) icon next to a sector to see its stocks.
Click minus (-) to collapse it.
This is handled using a simple useState hook.

Problems I Faced
Rupee symbol showing as ? → fixed using Intl.NumberFormat

Vercel 404 error → root directory was not set

Data not loading → environment variable missing

Git push failed → accidentally committed node_modules

Author
Kumar Harsh
Phone: 9279157296
GitHub: https://github.com/Kumarharsh1

Built for Octa Byte AI case study.


---

This version:
- Renders **perfectly on GitHub**
- Looks **professional but human**
- No broken markdown
- No extra noise

If you want:
- **Shorter version**
- **Remove phone number**
- **More professional tone**
