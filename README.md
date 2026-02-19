# EcoGlow Soap Solutions

E-commerce website for eco-friendly cleaning and personal care products. Features product categories including Homecare (Dishwash, Multipurpose), Silkcare (Handwash, Bodywash), Fabricare (Fabric Softener), and Proclean (Toilet Cleaner, Disinfectant, Bleach).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** MongoDB (Mongoose)
- **Auth:** bcryptjs + jose (JWT)

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB instance (local or Atlas)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Seed the Database

```bash
npm run seed
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/
    page.tsx              # Home page
    about/page.tsx        # About page
    contact/page.tsx      # Contact page
    products/page.tsx     # Products listing
    products/[slug]/      # Product detail
    category/[slug]/      # Category page
```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
