# 🌱 GreenProof Leaf Ledger

**Prove Impact Without Exposure** - A privacy-preserving environmental impact tracking system built with Fully Homomorphic Encryption (FHE) technology.

GreenProof Leaf Ledger enables organizations and individuals to record and verify their environmental impact data while maintaining complete privacy. Using FHEVM (Fully Homomorphic Encryption Virtual Machine), sensitive environmental metrics are encrypted on-chain, allowing for verification and auditing without exposing the actual data.

## 🎥 Demo

Watch our application in action:

![Demo Video](./demo.mp4)

*[Click here to view the demo video](./demo.mp4)*

## ✨ Features

- **🔐 Privacy-First**: Environmental data is encrypted using FHE before being stored on-chain
- **🌍 Multi-Category Tracking**: Support for CO₂ reduction, energy savings, water conservation, and waste reduction
- **🔍 Verifiable Records**: Blockchain-verified environmental impact tracking with secure audit capabilities
- **🎯 User-Friendly Interface**: Modern React-based frontend with intuitive data entry and visualization
- **🔗 Web3 Integration**: Seamless MetaMask integration for wallet connectivity
- **♿ Accessible Design**: WCAG-compliant interface with comprehensive accessibility features

## 🚀 Live Demo

Experience GreenProof Leaf Ledger: [Live Demo](https://your-demo-url.vercel.app)

## 🏗️ Architecture

### Smart Contracts
- **FHECounter.sol**: Core contract handling encrypted environmental data storage and operations
- Built on FHEVM protocol by Zama for privacy-preserving computations

### Frontend Application
- **Next.js 15**: Modern React framework with TypeScript
- **TailwindCSS**: Utility-first CSS framework for responsive design
- **Lucide React**: Beautiful, customizable icons
- **FHEVM SDK**: Integration with Zama's FHE technology

## 📁 Project Structure

```
greenproof-leaf-ledger/
├── contracts/                 # Smart contract source files
│   └── FHECounter.sol        # Main FHE counter contract
├── deploy/                   # Deployment scripts
├── tasks/                    # Hardhat custom tasks
├── test/                     # Contract test files
├── frontend/                 # React frontend application
│   ├── app/                  # Next.js app directory
│   ├── components/           # React components
│   │   ├── Header.tsx        # Navigation header
│   │   ├── Hero.tsx          # Landing page hero section
│   │   ├── RecordData.tsx    # Data entry form
│   │   ├── VerifyData.tsx    # Data verification dashboard
│   │   └── HowItWorks.tsx    # Feature explanation
│   ├── hooks/                # Custom React hooks
│   ├── fhevm/                # FHEVM integration utilities
│   └── types/                # TypeScript type definitions
├── hardhat.config.ts         # Hardhat configuration
└── package.json              # Dependencies and scripts
```

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js**: Version 20 or higher
- **npm**: Package manager
- **MetaMask**: Browser wallet extension

### 1. Clone the Repository

```bash
git clone https://github.com/ErnestCopperfield/greenproof-leaf-ledger.git
cd greenproof-leaf-ledger
```

### 2. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Environment Setup

```bash
# Set up Hardhat environment variables
npx hardhat vars set MNEMONIC
npx hardhat vars set INFURA_API_KEY
npx hardhat vars set ETHERSCAN_API_KEY  # Optional
```

### 4. Compile Contracts

```bash
npm run compile
```

### 5. Run Tests

```bash
npm run test
```

## 🚀 Development

### Local Development

1. **Start local FHEVM node:**
   ```bash
   npx hardhat node
   ```

2. **Deploy contracts to local network:**
   ```bash
   npx hardhat deploy --network localhost
   ```

3. **Start the frontend development server:**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Sepolia Testnet Deployment

1. **Deploy to Sepolia:**
   ```bash
   npx hardhat deploy --network sepolia
   ```

2. **Verify contract:**
   ```bash
   npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
   ```

3. **Test on Sepolia:**
   ```bash
   npx hardhat test --network sepolia
   ```

## 📊 Usage

### Recording Environmental Data

1. **Connect Wallet**: Click "Connect Wallet" and approve MetaMask connection
2. **Select Data Type**: Choose from CO₂ reduction, energy savings, water conservation, or waste reduction
3. **Enter Value**: Input the numerical value for your environmental impact
4. **Set Date**: Select the verification date using the date picker
5. **Add Notes**: Optionally add verification notes or context
6. **Encrypt & Record**: Submit the form to encrypt and store data on-chain

### Verifying Data

1. **Access Dashboard**: Navigate to the verification dashboard
2. **View Encrypted Handle**: See the encrypted data handle stored on-chain
3. **Decrypt Data**: Use your private key to decrypt and view the actual values
4. **Audit Trail**: Review transaction history and verification timestamps

## 🔧 Available Scripts

### Backend Scripts

| Script             | Description                    |
| ------------------ | ------------------------------ |
| `npm run compile`  | Compile smart contracts        |
| `npm run test`     | Run contract tests             |
| `npm run coverage` | Generate test coverage report  |
| `npm run lint`     | Run linting checks             |
| `npm run clean`    | Clean build artifacts          |
| `npm run node`     | Start local Hardhat node      |

### Frontend Scripts

| Script           | Description                     |
| ---------------- | ------------------------------- |
| `npm run dev`    | Start development server        |
| `npm run build`  | Build for production            |
| `npm run start`  | Start production server         |
| `npm run lint`   | Run ESLint checks               |
| `npm run test`   | Run frontend tests              |

## 🔒 Security Features

- **Input Validation**: Comprehensive client-side and smart contract validation
- **XSS Protection**: Input sanitization to prevent cross-site scripting
- **Access Control**: Wallet-based authentication and authorization
- **Error Handling**: Graceful error handling with user-friendly messages
- **Memory Safety**: Proper cleanup to prevent memory leaks

## ♿ Accessibility

GreenProof Leaf Ledger is built with accessibility in mind:

- **ARIA Labels**: Comprehensive screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus indicators and management
- **Color Contrast**: WCAG AA compliant color schemes
- **Responsive Design**: Mobile-friendly interface

## 🧪 Testing

The project includes comprehensive test suites:

- **Smart Contract Tests**: Hardhat-based contract testing
- **Frontend Tests**: Vitest and React Testing Library
- **Type Safety**: Full TypeScript coverage
- **Linting**: ESLint and Prettier for code quality

## 📚 Documentation

- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [Next.js Documentation](https://nextjs.org/docs)
- [Hardhat Documentation](https://hardhat.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the BSD-3-Clause-Clear License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/ErnestCopperfield/greenproof-leaf-ledger/issues)
- **FHEVM Documentation**: [FHEVM Docs](https://docs.zama.ai)
- **Community**: [Zama Discord](https://discord.gg/zama)

## 🙏 Acknowledgments

- **Zama**: For the groundbreaking FHEVM technology
- **OpenZeppelin**: For secure smart contract patterns
- **Vercel**: For seamless deployment and hosting
- **The Web3 Community**: For continuous innovation and support

---

**Built with 🌱 for a sustainable future**
