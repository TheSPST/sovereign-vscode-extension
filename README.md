# Sovereign Fast Compiler & SPST Codec for VS Code & Cursor

[![License: Sovereign Commercial](https://img.shields.io/badge/License-Sovereign%20Commercial%20v1.0-blue.svg)](LICENSE)
[![Visual Studio Code](https://img.shields.io/badge/VS%20Code-%3E%3D%201.75.0-007ACC.svg)](https://marketplace.visualstudio.com)
[![Cursor IDE](https://img.shields.io/badge/Cursor-Compatible-blueviolet.svg)](https://cursor.com)

> **Zero-toolchain bare-metal cloud compiler and spatial-temporal file compression engine for Visual Studio Code & Cursor IDE.** Right-click any file to compile or compress into ultra-dense `.spst` containers.

---

## ⚡ Key Capabilities

### 1. 🚀 Zero-Toolchain Cloud Compiler (< 200 ms)
Compile systems languages (**C, C++, Rust, Go, Zig, Python, TypeScript**) directly from your editor without installing gigabytes of local LLVM, Clang, GCC, or Rustup toolchains.
* Compiles in secure, hardened Sovereign Cloud sandboxes.
* Automatically downloads the stripped, production-ready executable (`.exe` or Unix binary) next to your source file with execute permissions (`chmod +x`).
* Choose your optimization tier: `O2`, `O3`, `ReleaseFast`, `ReleaseSmall`.

### 2. 🗜️ 1-Click SPST File Compression (80%–95% Reduction)
Right-click any large CSV, JSON dataset, server log, or database dump in the File Explorer to compress it on-the-fly into a `.spst` container.
* Slashes file storage footprint by **80% to 95%**.
* In-editor progress notification and real-time percentage storage reduction toast.
* Includes resilient local air-gap fallback for offline coding.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      DEVELOPER WORKSTATION (VS CODE / CURSOR)               │
│                                                                             │
│   ┌──────────────────────────────────────────────────────────────┐          │
│   │ 📝 Active File (e.g. main.rs, engine.cpp, large_dataset.csv) │          │
│   └──────────────────────────────┬───────────────────────────────┘          │
│                                  │                                          │
│        Right Click -> "Sovereign: Compile & Harden Active File"             │
│        Right Click -> "Sovereign: Compress Active File (SPST Codec)"        │
│                                  │                                          │
│                                  ▼                                          │
│   ┌──────────────────────────────────────────────────────────────┐          │
│   │ ⚡ SOVEREIGN CLOUD FAST COMPILER & SPST CODEC EXTENSION       │          │
│   └──────────────┬───────────────────────────────┬───────────────┘          │
│                  │ (Remote Bare-Metal Compile)   │ (SPST Compression)       │
│                  ▼                               ▼                          │
│     Native Executable Output (.exe)     High-Density .spst Archive          │
│     (Zero toolchain installed)          (80%–95% disk storage reduction)    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 💻 How to Use

### Compile Active Source File
1. Open any C, C++, Rust, Go, or Zig file.
2. Right-click in the editor or file explorer and select:  
   **"Sovereign: Compile & Harden Active File"**.
3. Your compiled binary will appear instantly in the same directory!

### Compress File to `.spst`
1. Right-click any file in the VS Code File Explorer sidebar.
2. Select **"Sovereign: Compress Active File (SPST Codec)"**.
3. A `.spst` vault will be generated with full compression savings displayed.

---

## ⚙️ Extension Settings

| Setting | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `sovereign.apiKey` | `string` | `""` | Your Sovereign Cloud / AWS Marketplace API Key *(prompted on first compile)* |
| `sovereign.apiUrl` | `string` | `https://a3pme2hx4v.us-east-1.awsapprunner.com` | Sovereign Cloud API Gateway URL |
| `sovereign.optimizationLevel` | `enum` | `"O3"` | Compiler optimization flag: `O2`, `O3`, `ReleaseFast`, `ReleaseSmall` |

---

## 🛡️ Security & Intellectual Property

* **Zero Trade Secret Leakage**: Purely a thin VS Code/Cursor editor driver. Zero proprietary C++ compiler internals or mathematical codec heuristics are distributed in the extension.
* **Encrypted Transmission**: All compilation and compression streams are encrypted via TLS 1.3.
* **Air-Gap Capable**: Includes local in-editor compression fallback when coding offline or in air-gapped environments.

---

## 📄 License

Protected under the **Sovereign Fair-Use Commercial & Trademark License v1.0**. See [LICENSE](LICENSE) for terms.
For commercial enterprise licensing: connectwith@sovereignbyte.tech
