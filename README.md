# KidsProtect

## Install dependencies

```bash
bun install
```

## Develop (frontend + backend + desktop)

```bash
bun dev
```

## Build for release

```bash
# frontend
cd frontend && bun run build
# backend
cd backend && bun run build
# desktop (Electron)
cd desktop && bun run dist  # or from desktop: bun run build-all
```

Artifacts land in `desktop/release/` (dmg on mac, nsis on Windows when built on that platform).

## Run with admin privileges

System rule changes (hosts/pf/netsh) need elevation.

- **macOS**: build backend (`cd backend && bun run build`), then start it as root:
  ```bash
  ./scripts/mac/start-backend-root.sh
  ```
  Or launch the packaged app via Terminal:
  ```bash
  sudo -E env "PATH=$PATH" /Applications/KidsProtect.app/Contents/MacOS/KidsProtect
  ```
- **Windows**: build backend (`cd backend && bun run build`), then run elevated:
  ```powershell
  powershell -ExecutionPolicy Bypass -File scripts/windows/start-backend-admin.ps1
  ```
  Or right-click the packaged app → Run as administrator.

## Install persistent backend services

These install a privileged backend that starts at boot and listens on localhost for the Electron app.

- **macOS (launchd daemon)**:
  - Installer: the `.pkg` target installs and starts the daemon automatically (admin prompt required).
  - Manual: 
    ```bash
    cd backend && bun run build
    sudo ./scripts/mac/install-daemon.sh
    # To remove:
    sudo ./scripts/mac/uninstall-daemon.sh
    ```
- **Windows (service)**:
  - Installer: the NSIS installer creates and starts the `KidsProtectBackend` service (UAC prompt).
  - Manual:
    ```powershell
    cd backend; bun run build
    powershell -ExecutionPolicy Bypass -File scripts/windows/install-service.ps1
    # To remove:
    powershell -ExecutionPolicy Bypass -File scripts/windows/uninstall-service.ps1
    ```

These scripts assume Node is installed on the machine (used to run the backend). The Electron app should talk to the backend on `http://localhost:8787`.
