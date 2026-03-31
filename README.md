# TailBlazer - Lost Animal Reporting System

A fully client-side React application for reporting and finding lost pets. Built with React, TypeScript, and third-party APIs.

## Features

- **Report Lost Pets**: Submit reports with animal name, type, photo, description, contact info, and last seen location
- **Interactive Map**: View all lost pets on a Leaflet map with clickable pins
- **List View**: Browse all reports with filtering by animal type and status
- **Mark as Found**: Use a password to mark your pet as found when recovered
- **No Backend**: Uses JSONBin.io for storage and ImgBB for image hosting

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Copy `.env.example` to `.env` and fill in your API keys:
   ```bash
   cp .env.example .env
   ```

   Required API keys:
   - `VITE_JSONBIN_BIN_ID`: Create a PUBLIC bin at [JSONBin.io](https://jsonbin.io) with initial content `{"reports":[]}` and paste the bin ID
   - `VITE_IMGBB_API_KEY`: Get an API key from [ImgBB](https://api.imgbb.com/)

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## AI Usage Disclosure

This project was developed with the assistance of GitHub Copilot. The AI was used to:
- Generate React component boilerplate
- Fix TypeScript type issues
- Generate CSS Designs

